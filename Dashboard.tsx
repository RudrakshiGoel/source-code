import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogIn, Book, BookUser } from "lucide-react";
import { toast } from "sonner";
import StudentDashboardHeader from "@/components/student-dashboard-header";

interface User {
  id: string;
  name: string;
  email: string;
  profileComplete: boolean;
  enrolledCourses: Course[];
  profilePicture: string | null;
  department?: string;
  rollNumber?: string;
  semester?: string;
  joinDate?: string;
  attendance?: Record<string, number>;
  standard?: string;
}

interface Course {
  id: string;
  name: string;
  progress: number;
  instructor: string;
  nextClass?: string;
  startDate: string;
  credits: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUserData = localStorage.getItem("currentUser");
    
    if (!currentUserData) {
      toast.error("Please sign in to access your dashboard");
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(currentUserData);

    setUser(userData);
    setLoading(false);
    
    if (!userData.profileComplete) {
      navigate("/complete-profile");
    }
    
    if (userData.profileComplete && (!userData.enrolledCourses || userData.enrolledCourses.length === 0)) {
      navigate("/course-enrollment");
    }
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const overallAttendance = user?.attendance 
    ? Object.values(user.attendance).reduce((sum, value) => sum + value, 0) / Object.values(user.attendance).length
    : 0;

  const enrolledCourses = user?.standard
    ? (user.enrolledCourses || []).filter(course => course.standard?.toString() === user.standard?.toString())
    : (user?.enrolledCourses || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/5 to-blue-500/5">
      <StudentDashboardHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center p-4">
                <Avatar className="h-24 w-24 mb-4">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user?.name} />
                  ) : (
                    <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
                      {user?.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Standard</span>
                  <span className="font-medium">{user?.standard || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Roll Number</span>
                  <span className="font-medium">{user?.rollNumber || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Semester</span>
                  <span className="font-medium">{user?.semester || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Join Date</span>
                  <span className="font-medium">{user?.joinDate || 'Not set'}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => navigate("/complete-profile")}>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>
                  Your enrolled courses and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrolledCourses && enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/course/${course.id}`)}
                          >
                            View Course
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookUser className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No courses enrolled</h3>
                    <p className="text-muted-foreground">
                      You haven't enrolled in any courses yet.
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/course-enrollment")}>
                      Browse Courses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>
                  Your attendance across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overall Attendance</span>
                    <span className="font-medium">{Math.round(overallAttendance)}%</span>
                  </div>
                  <Progress 
                    value={overallAttendance} 
                    className={`h-2 ${overallAttendance < 75 ? 'bg-red-100' : 'bg-green-100'}`}
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead className="text-right">Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user?.attendance ? (
                      Object.entries(user.attendance).map(([course, percentage]) => (
                        <TableRow key={course}>
                          <TableCell>{course}</TableCell>
                          <TableCell className="text-right">
                            <span className={percentage < 75 ? 'text-red-500' : 'text-green-600'}>
                              {percentage}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No attendance data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
