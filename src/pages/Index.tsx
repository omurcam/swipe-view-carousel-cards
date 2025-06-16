
import { DemoOne } from "@/components/demo";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-slate-800">Image Swiper Demo</h1>
          <p className="text-xl text-slate-600 mb-8">
            Swipe or drag the cards to see the smooth transition effects
          </p>
        </div>
        <DemoOne />
      </div>
    </div>
  );
};

export default Index;
