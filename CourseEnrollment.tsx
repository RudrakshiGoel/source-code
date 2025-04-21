import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookUser } from "lucide-react";
import { toast } from "sonner";
import StudentDashboardHeader from "@/components/student-dashboard-header";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  name: string;
  email: string;
  profileComplete: boolean;
  enrolledCourses: Course[];
  profilePicture: string | null;
  attendance?: Record<string, number>;
  standard?: string; // changed from stream -> standard (grade)
}

interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  startDate: string;
  duration: string;
  progress: number;
  enrolled?: boolean;
  standard: string; // changed: for which standard is the course? (e.g. "6", "7", ...)
}

// Example courses by standard 6-10
const availableCourses: Course[] = [
  {
    id: "c-6-english",
    name: "English Literature",
    description: "Explore classic and modern English literature for Std. 6",
    instructor: "Ms. Sunita Rao",
    credits: 2,
    startDate: "June 10, 2024",
    duration: "10 weeks",
    progress: 0,
    standard: "6",
  },
  {
    id: "c-6-math",
    name: "Mathematics Basics",
    description: "Foundational concepts in maths for Standard 6",
    instructor: "Mr. Rahul Gupta",
    credits: 2,
    startDate: "June 12, 2024",
    duration: "10 weeks",
    progress: 0,
    standard: "6",
  },
  {
    id: "c-7-science",
    name: "General Science",
    description: "Learn science fundamentals (Std. 7)",
    instructor: "Dr. Neha Shah",
    credits: 2,
    startDate: "June 15, 2024",
    duration: "12 weeks",
    progress: 0,
    standard: "7",
  },
  {
    id: "c-7-social",
    name: "Social Studies",
    description: "History, Civics & Geography for Standard 7",
    instructor: "Mrs. Alka Joshi",
    credits: 2,
    startDate: "June 20, 2024",
    duration: "12 weeks",
    progress: 0,
    standard: "7",
  },
  {
    id: "c-8-math",
    name: "Algebra & Geometry",
    description: "Dive into algebra and geometry topics for Std. 8",
    instructor: "Mr. Vikas Malhotra",
    credits: 3,
    startDate: "June 22, 2024",
    duration: "12 weeks",
    progress: 0,
    standard: "8",
  },
  {
    id: "c-9-biology",
    name: "Biology Basics",
    description: "Introduction to biology for Std. 9",
    instructor: "Dr. Asha Kumari",
    credits: 2,
    startDate: "July 1, 2024",
    duration: "14 weeks",
    progress: 0,
    standard: "9",
  },
  {
    id: "c-10-physics",
    name: "Physics Primer",
    description: "Basics of physics, suitable for Standard 10",
    instructor: "Dr. Sameer Sinha",
    credits: 3,
    startDate: "July 10, 2024",
    duration: "15 weeks",
    progress: 0,
    standard: "10",
  },
];

const CourseEnrollment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [standardInput, setStandardInput] = useState("");
  const [showStandardPrompt, setShowStandardPrompt] = useState(false);

  useEffect(() => {
    // Load user data
    const currentUserData = localStorage.getItem("currentUser");

    if (!currentUserData) {
      toast.error("Please sign in to enroll in courses");
      navigate("/auth");
      return;
    }

    const userData: User = JSON.parse(currentUserData);

    // Prompt for standard if it's not already present
    if (!userData.standard) {
      setShowStandardPrompt(true);
      setUser(userData);
      setLoading(false);
      return;
    }

    setUser(userData);

    if (!userData.profileComplete) {
      navigate("/complete-profile");
      return;
    }

    // Filter courses by standard
    const filteredCourses = availableCourses.filter(c => c.standard === userData.standard);
    const userEnrolledCourseIds = userData.enrolledCourses?.map((c: Course) => c.id) || [];

    const updatedCourses = filteredCourses.map(course => ({
      ...course,
      enrolled: userEnrolledCourseIds.includes(course.id)
    }));

    setCourses(updatedCourses);
    setLoading(false);
  }, [navigate]);

  // Save standard when the user submits it
  const handleSetStandard = () => {
    if (!user) return;
    if (!standardInput.trim()) {
      toast.error("Please enter your standard (e.g., 6, 7, 8, 9, 10).");
      return;
    }
    const updatedUser = { ...user, standard: standardInput.trim() };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Update users array as well
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setShowStandardPrompt(false);

    // Now reload courses for the selected standard
    const filteredCourses = availableCourses.filter(c => c.standard === standardInput.trim());
    const userEnrolledCourseIds = updatedUser.enrolledCourses?.map((c: Course) => c.id) || [];
    const updatedCourses = filteredCourses.map(course => ({
      ...course,
      enrolled: userEnrolledCourseIds.includes(course.id)
    }));
    setCourses(updatedCourses);
  };

  const handleEnroll = (courseId: string) => {
    if (!user) return;

    const courseToEnroll = courses.find(c => c.id === courseId);
    if (!courseToEnroll) return;

    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, enrolled: true } 
        : course
    );
    setCourses(updatedCourses);

    const userEnrolledCourses = user.enrolledCourses || [];
    const alreadyEnrolled = userEnrolledCourses.some((c: Course) => c.id === courseId);

    if (!alreadyEnrolled) {
      const updatedUser = {
        ...user,
        enrolledCourses: [
          ...userEnrolledCourses,
          {
            ...courseToEnroll,
            progress: 0
          }
        ],
        attendance: {
          ...(user.attendance || {}),
          [courseToEnroll.name]: 100
        }
      };

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setUser(updatedUser);
      toast.success(`Successfully enrolled in ${courseToEnroll.name}`);
    }
  };

  const handleUnenroll = (courseId: string) => {
    if (!user) return;

    const courseToUnenroll = courses.find(c => c.id === courseId);
    if (!courseToUnenroll) return;

    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, enrolled: false } 
        : course
    );
    setCourses(updatedCourses);

    const updatedEnrolledCourses = (user.enrolledCourses || []).filter(
      (c: Course) => c.id !== courseId
    );

    const { [courseToUnenroll.name]: removedCourse, ...remainingAttendance } = 
      (user.attendance || {});

    const updatedUser = {
      ...user,
      enrolledCourses: updatedEnrolledCourses,
      attendance: remainingAttendance
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);
    toast.success(`Successfully unenrolled from ${courseToUnenroll.name}`);
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Standard prompt UI
  if (showStandardPrompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600/5 to-blue-500/5">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Choose Your Standard</CardTitle>
            <CardDescription>
              Please enter your standard (e.g., 6, 7, 8, 9, 10) to view available courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              value={standardInput}
              onChange={(e) => setStandardInput(e.target.value)}
              placeholder="Enter standard"
              className="mb-4"
            />
            <Button onClick={handleSetStandard} className="w-full">Save Standard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/5 to-blue-500/5">
      <StudentDashboardHeader user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Course Enrollment</h1>
            <p className="text-muted-foreground">
              Browse and enroll in available courses for <span className="font-semibold">{user?.standard && `Standard ${user.standard}`}</span>
            </p>
          </div>
          <Button onClick={handleGoToDashboard} className="mt-4 md:mt-0">
            Go to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>
                  {course.instructor} • {course.credits} credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{course.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{course.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {course.enrolled ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleUnenroll(course.id)}
                  >
                    Unenroll
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleEnroll(course.id)}
                  >
                    <BookUser className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
          {courses.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No courses available for your standard.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;
