
import React from 'react';
import { ImageSwiper  } from "@/components/ui/image-swiper";

function DemoOne() {
  const imageUrls = "https://img.freepik.com/premium-photo/3d-cartoon_975306-1.jpg?w=2000,https://img.freepik.com/premium-photo/3d-cartoon-boy-avatar_113255-5540.jpg,https://th.bing.com/th/id/OIP.OmBLyKbo8iixJ2SeS12xxwHaE7?w=626&h=417&rs=1&pid=ImgDetMain,https://thumbs.dreamstime.com/b/animated-academic-cheerful-cartoon-scholar-301088562.jpg,https://img.freepik.com/premium-psd/3d-cute-young-business-man-character-generative-ai_43614-1027.jpg,https://img.freepik.com/premium-photo/arafed-cartoon-man-suit-tie-standing-with-his-hands-his-hips_988987-15581.jpg";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ImageSwiper images={imageUrls} />
    </div>
  );
}

export { DemoOne };
