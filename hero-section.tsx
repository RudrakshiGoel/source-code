
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "@/components/ui/image";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to <GradientText>SkillSage</GradientText>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground">
            Your personalized AI tutor that adapts to your learning style and pace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Start Learning
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
              onClick={() => navigate('/learn')}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="hidden lg:block">
          <AspectRatio ratio={16 / 9} className="rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
              alt="Student learning with laptop" 
              fill 
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
