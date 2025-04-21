
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Learning",
    description: "Our AI understands your learning style and adapts content just for you",
    icon: Brain,
    color: "bg-purple-100",
  },
  {
    title: "Personalized Path",
    description: "Custom learning paths based on your progress and performance",
    icon: Target,
    color: "bg-blue-100",
  },
  {
    title: "Learn at Your Pace",
    description: "No pressure - study and practice at the speed that suits you best",
    icon: Clock,
    color: "bg-green-100",
  },
  {
    title: "Track Progress",
    description: "Monitor your improvement with detailed progress tracking",
    icon: Award,
    color: "bg-orange-100",
  },
];

export function FeaturesSection() {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose SkillSage?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of personalized learning with our innovative AI-driven approach
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, translateY: 20 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`${feature.color} hover:shadow-xl transition-shadow duration-300 h-full`}>
                <CardHeader>
                  <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-white shadow-md">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
