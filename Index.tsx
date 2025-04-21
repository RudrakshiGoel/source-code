
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-950 dark:to-gray-900">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default Index;
