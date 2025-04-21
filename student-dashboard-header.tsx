
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, Book, User, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string | null;
}

interface StudentDashboardHeaderProps {
  user: User | null;
}

const StudentDashboardHeader = ({ user }: StudentDashboardHeaderProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Successfully logged out");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <a href="/" className="hidden md:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              SkillSage
            </h1>
          </a>
          <nav className="hidden md:flex gap-6">
            <a 
              href="/dashboard" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </a>
            <a 
              href="/course-enrollment" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Courses
            </a>
            <a 
              href="/learn" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Resources
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-focus"
              >
                <Avatar className="h-8 w-8">
                  {user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium hidden md:inline-block">
                  {user.name}
                </span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a 
                    href="/complete-profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="default" onClick={() => navigate("/auth")}>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentDashboardHeader;
