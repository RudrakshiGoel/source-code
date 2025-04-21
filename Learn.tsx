
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import StudentDashboardHeader from "@/components/student-dashboard-header";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
}

const resources = [
  {
    id: "res-1",
    title: "Programming Fundamentals eBook",
    description: "A comprehensive guide to programming basics",
    type: "eBook",
    link: "#"
  },
  {
    id: "res-2",
    title: "Data Structures Video Series",
    description: "Visual explanations of common data structures",
    type: "Video",
    link: "#"
  },
  {
    id: "res-3",
    title: "Algorithm Practice Problems",
    description: "Coding exercises to improve your algorithm skills",
    type: "Exercise",
    link: "#"
  },
  {
    id: "res-4",
    title: "Web Development Handbook",
    description: "Best practices for modern web development",
    type: "eBook",
    link: "#"
  },
  {
    id: "res-5",
    title: "Database Design Tutorial",
    description: "Step-by-step guide to designing efficient databases",
    type: "Tutorial",
    link: "#"
  },
  {
    id: "res-6",
    title: "Mobile App Development Checklist",
    description: "Essential considerations for mobile app projects",
    type: "Reference",
    link: "#"
  }
];

const Learn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      setUser(JSON.parse(currentUserData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/5 to-blue-500/5">
      <StudentDashboardHeader user={user} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-xl text-muted-foreground">
            Expand your knowledge with our curated collection of learning materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {resource.type}
                  </span>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={resource.link}>
                    <Book className="mr-2 h-4 w-4" />
                    Access Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {!user && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Sign in to access more personalized learning resources
            </p>
            <Button onClick={() => navigate("/auth")}>
              Sign In to Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
