
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { toast } from "sonner";

interface UserData {
  id: string;
  name: string;
  email: string;
  profileComplete: boolean;
  profilePicture: string | null;
  department?: string;
  rollNumber?: string;
  semester?: string;
  phoneNumber?: string;
  address?: string;
  joinDate?: string;
  [key: string]: any;
}

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Form states
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const currentUserData = localStorage.getItem("currentUser");
    
    if (!currentUserData) {
      toast.error("Please sign in to complete your profile");
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(currentUserData);
    setUser(userData);
    
    // Pre-fill form if data exists
    if (userData.department) setDepartment(userData.department);
    if (userData.rollNumber) setRollNumber(userData.rollNumber);
    if (userData.semester) setSemester(userData.semester);
    if (userData.phoneNumber) setPhoneNumber(userData.phoneNumber);
    if (userData.address) setAddress(userData.address);
    if (userData.profilePicture) setProfileImage(userData.profilePicture);
    
    setLoading(false);
  }, [navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 for local storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Basic validation
    if (!department || !rollNumber || !semester) {
      toast.error("Please complete all required fields");
      return;
    }
    
    // Update user data
    const updatedUser = {
      ...user,
      department,
      rollNumber,
      semester,
      phoneNumber,
      address,
      profilePicture: profileImage,
      profileComplete: true,
      joinDate: user.joinDate || new Date().toLocaleDateString()
    };
    
    // Update in local storage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast.success("Profile updated successfully!");
    
    // Redirect to course enrollment if no courses yet
    if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
      navigate("/course-enrollment");
    } else {
      navigate("/dashboard");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/10 to-blue-500/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            Please provide your information to complete your student profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={user?.name} />
                ) : (
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex items-center space-x-2">
                <Label 
                  htmlFor="picture" 
                  className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload Picture
                </Label>
                <Input 
                  id="picture" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            
            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={user?.name || ""} disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                <Input 
                  id="department" 
                  placeholder="e.g. Computer Science" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roll">Roll Number <span className="text-red-500">*</span></Label>
                <Input 
                  id="roll" 
                  placeholder="e.g. CS-2023-042" 
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">Semester <span className="text-red-500">*</span></Label>
                <Input 
                  id="semester" 
                  placeholder="e.g. 3rd Semester" 
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="e.g. +1 (555) 123-4567" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  placeholder="e.g. 123 Education Street, City" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
