import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { MenuCard } from './menu-card';

interface SizePrices {
  small?: number | null;
  medium?: number | null;
  large?: number | null;
}

interface MenuItem {
  name: string;
  price?: string;
  sizePrices?: SizePrices;
  image: string;
}

interface MenuSwiperProps {
  items: MenuItem[];
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export const MenuSwiper: React.FC<MenuSwiperProps> = ({
  items,
  cardWidth = 280,
  cardHeight = 320,
  className = ''
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const cardsCache = useRef<HTMLElement[]>([]);
  const isAnimating = useRef(false);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: items.length }, (_, i) => i)
  );

  // Memoize style calculations
  const containerStyle = useMemo(() => ({
    width: cardWidth + 32,
    height: cardHeight + 32,
    touchAction: 'none' as const,
    transformStyle: 'preserve-3d' as const,
    '--card-perspective': '700px',
    '--card-z-offset': '8px', // Reduced for better performance
    '--card-y-offset': '4px', // Reduced for better performance
    '--card-max-z-index': items.length.toString(),
    '--card-swap-duration': '250ms', // Faster animation
  }), [cardWidth, cardHeight, items.length]);

  const getDurationFromCSS = useCallback((): number => {
    return 250; // Fixed duration for better performance
  }, []);

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    if (cardsCache.current.length === 0) {
      cardsCache.current = [...cardStackRef.current.querySelectorAll('.menu-card')] as HTMLElement[];
    }
    return cardsCache.current;
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    const cards = getCards();
    return cards[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    const cards = getCards();
    // Use transform instead of CSS custom properties for better performance
    cards.forEach((card, i) => {
      if (card) {
        card.style.setProperty('--i', (i + 1).toString());
        card.style.setProperty('--swipe-x', '0px');
        card.style.setProperty('--swipe-rotate', '0deg');
        card.style.opacity = '1';
        // Force hardware acceleration
        card.style.willChange = 'transform, opacity';
      }
    });
  }, [getCards]);

  const applySwipeStyles = useCallback((deltaX: number) => {
    const card = getActiveCard();
    if (!card) return;
    
    // Use requestAnimationFrame for smooth updates
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      card.style.setProperty('--swipe-x', `${deltaX}px`);
      card.style.setProperty('--swipe-rotate', `${deltaX * 0.1}deg`); // Reduced rotation for smoother animation
      const opacity = Math.max(0.3, 1 - Math.min(Math.abs(deltaX) / 150, 0.7)); // Improved opacity calculation
      card.style.opacity = opacity.toString();
    });
  }, [getActiveCard]);

  const handleStart = useCallback((clientX: number) => {
    if (isSwiping.current || isAnimating.current) return;
    isSwiping.current = true;
    startX.current = clientX;
    currentX.current = clientX;
    const card = getActiveCard();
    if (card) {
      card.style.transition = 'none';
      card.style.willChange = 'transform, opacity';
    }
  }, [getActiveCard]);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current || isAnimating.current) return;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 60; // Slightly higher threshold for better UX
    const duration = getDurationFromCSS();
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`;

      if (Math.abs(deltaX) > threshold) {
        isAnimating.current = true;
        const direction = Math.sign(deltaX);
        card.style.setProperty('--swipe-x', `${direction * 350}px`);
        card.style.setProperty('--swipe-rotate', `${direction * 15}deg`);
        card.style.opacity = '0';

        setTimeout(() => {
          setCardOrder(prev => {
            if (prev.length === 0) return [];
            return [...prev.slice(1), prev[0]];
          });
          isAnimating.current = false;
          // Clear cache when order changes
          cardsCache.current = [];
        }, duration);
      } else {
        // Smooth return to original position
        requestAnimationFrame(() => {
          applySwipeStyles(0);
        });
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles]);

  const handleMove = useCallback((clientX: number) => {
    if (!isSwiping.current || isAnimating.current) return;
    
    currentX.current = clientX;
    const deltaX = currentX.current - startX.current;
    
    // Throttle movement for better performance
    if (Math.abs(deltaX) > 3) { // Only update if movement is significant
      applySwipeStyles(deltaX);
    }

    // Auto-trigger swipe if movement is large enough
    if (Math.abs(deltaX) > 80) {
      handleEnd();
    }
  }, [applySwipeStyles, handleEnd]);

  useEffect(() => {
    const cardStackElement = cardStackRef.current;
    if (!cardStackElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    };
    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
    };
    const handlePointerUp = (e: PointerEvent) => {
      e.preventDefault();
      handleEnd();
    };

    // Use passive listeners where possible
    cardStackElement.addEventListener('pointerdown', handlePointerDown);
    cardStackElement.addEventListener('pointermove', handlePointerMove);
    cardStackElement.addEventListener('pointerup', handlePointerUp);
    cardStackElement.addEventListener('pointercancel', handlePointerUp);

    return () => {
      cardStackElement.removeEventListener('pointerdown', handlePointerDown);
      cardStackElement.removeEventListener('pointermove', handlePointerMove);
      cardStackElement.removeEventListener('pointerup', handlePointerUp);
      cardStackElement.removeEventListener('pointercancel', handlePointerUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    // Clear cache when items change
    cardsCache.current = [];
    updatePositions();
  }, [cardOrder, updatePositions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-white/70">
        Bu kategoride henüz ürün bulunmuyor
      </div>
    );
  }

  return (
    <section
      className={`relative grid place-content-center select-none ${className}`}
      ref={cardStackRef}
      style={containerStyle}
    >
      {cardOrder.map((originalIndex, displayIndex) => {
        const item = items[originalIndex];
        if (!item) return null;
        
        return (
          <article
            key={`${item.name}-${originalIndex}`}
            className="menu-card absolute cursor-grab active:cursor-grabbing
                       place-self-center will-change-transform"
            style={{
              '--i': (displayIndex + 1).toString(),
              zIndex: items.length - displayIndex,
              transform: `perspective(var(--card-perspective))
                         translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                         translateY(calc(var(--card-y-offset) * var(--i)))
                         translateX(var(--swipe-x, 0px))
                         rotateY(var(--swipe-rotate, 0deg))`,
              backfaceVisibility: 'hidden', // Improve rendering performance
            } as React.CSSProperties}
          >
            <MenuCard
              name={item.name}
              price={item.price}
              sizePrices={item.sizePrices}
              image={item.image}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          </article>
        );
      })}
    </section>
  );
}; 