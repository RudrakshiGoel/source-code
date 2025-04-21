import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, FileText, FileVideo, ListCheck, Layers } from "lucide-react";
import StudentDashboardHeader from "@/components/student-dashboard-header";

const courseResourcesById: Record<string, Array<{ id: string; type: string; title: string; description: string; link: string }>> = {
  'course-1': [
    { id: 'r1', type: 'eBook', title: 'Intro to Python Guide', description: 'PDF guide for beginners', link: 'https://docs.python.org/3/tutorial/' },
    { id: 'r2', type: 'Exercise', title: 'Practice Problems', description: '10 programming tasks with solutions', link: 'https://www.w3schools.com/python/python_exercises.asp' },
  ],
  'course-2': [
    { id: 'r3', type: 'Video', title: 'DSA Crash Course', description: 'Series of 5 short videos', link: 'https://www.youtube.com/playlist?list=PL2_aWCzGMAwLLTJfQPENRohQ7fn6Ej3aC' },
    { id: 'r4', type: 'eBook', title: 'Algorithm Patterns', description: 'Pattern-based problem solving', link: 'https://github.com/vaibhav-kota/DSA-patterns' }
  ],
  'course-3': [
    { id: 'r5', type: 'Tutorial', title: 'HTML/CSS Basics', description: 'Getting started guide', link: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
    { id: 'r6', type: 'Reference', title: 'JS Quick Reference', description: 'Most-used JS features', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference' },
  ],
  'course-4': [
    { id: 'r7', type: 'Video', title: 'SQL in 60 Minutes', description: 'Fast start with SQL', link: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
    { id: 'r8', type: 'eBook', title: 'Relational Databases', description: 'Basic principles PDF', link: 'https://web.stanford.edu/class/cs145/lectures/relational.pdf' },
  ],
  'course-5': [
    { id: 'r9', type: 'Video', title: 'AI Primer', description: 'Demystifying AI series', link: 'https://www.youtube.com/watch?v=JMUxmLyrhSk' },
    { id: 'r10', type: 'Exercise', title: 'AI Project Ideas', description: 'Mini projects for practice', link: 'https://github.com/ritchieng/ai-deadlines' },
  ],
  'course-6': [
    { id: 'r11', type: 'Tutorial', title: 'Build Your First App', description: 'Step-by-step project', link: 'https://reactnative.dev/docs/tutorial' },
    { id: 'r12', type: 'Reference', title: 'Mobile UI Patterns', description: 'Modern UI inspirations', link: 'https://mobbin.com/browse/ios/apps' }
  ]
};

const difficultyById: Record<string, string> = {
  'course-1': "Beginner",
  'course-2': "Intermediate",
  'course-3': "Beginner",
  'course-4': "Intermediate",
  'course-5': "Beginner",
  'course-6': "Advanced",
};

const streamsForCourses: Record<string, string> = {
  'course-1': 'Computer Science',
  'course-2': 'Computer Science',
  'course-3': 'Computer Science',
  'course-4': 'Computer Science',
  'course-5': 'Computer Science',
  'course-6': 'Computer Science',
  'business-1': 'Business',
  'business-2': 'Business',
  'business-3': 'Business',
};

const getIcon = (type: string) => {
  switch (type) {
    case 'eBook': return <FileText className="text-primary" />;
    case 'Video': return <FileVideo className="text-primary" />;
    case 'Exercise': return <ListCheck className="text-primary" />;
    case 'Reference': return <Layers className="text-primary" />;
    case 'Tutorial': return <Book className="text-primary" />;
    default: return <Book className="text-primary" />;
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const cu = localStorage.getItem("currentUser");
    if (cu) {
      setUser(JSON.parse(cu));
    }

    let foundCourse = null;
    if (cu) {
      const u = JSON.parse(cu);
      foundCourse = u.enrolledCourses?.find((c: any) => c.id === courseId) || null;
    }

    if (!foundCourse) {
      const allStatic = [
        {
          id: "course-1",
          name: "Introduction to Programming",
          description: "Learn the fundamentals of programming using Python",
          instructor: "Dr. Jane Smith",
          credits: 3,
          startDate: "September 1, 2023",
          duration: "12 weeks",
          stream: "Computer Science",
        },
        {
          id: "course-2",
          name: "Data Structures and Algorithms",
          description: "Master essential data structures and algorithms concepts",
          instructor: "Prof. Michael Chen",
          credits: 4,
          startDate: "September 5, 2023",
          duration: "16 weeks",
          stream: "Computer Science",
        },
        {
          id: "course-3",
          name: "Web Development Fundamentals",
          description: "Build responsive websites using HTML, CSS and JavaScript",
          instructor: "Sarah Johnson",
          credits: 3,
          startDate: "September 3, 2023",
          duration: "14 weeks",
          stream: "Computer Science",
        },
        {
          id: "course-4",
          name: "Database Management Systems",
          description: "Learn about SQL and database design principles",
          instructor: "Dr. Robert Williams",
          credits: 4,
          startDate: "September 10, 2023",
          duration: "15 weeks",
          stream: "Computer Science",
        },
        {
          id: "course-5",
          name: "Artificial Intelligence Basics",
          description: "Introduction to AI concepts and applications",
          instructor: "Prof. Emma Davis",
          credits: 3,
          startDate: "September 7, 2023",
          duration: "12 weeks",
          stream: "Computer Science",
        },
        {
          id: "course-6",
          name: "Mobile App Development",
          description: "Build native mobile applications for iOS and Android",
          instructor: "Alex Turner",
          credits: 4,
          startDate: "September 15, 2023",
          duration: "16 weeks",
          stream: "Computer Science",
        },
        {
          id: "business-1",
          name: "Principles of Management",
          description: "Fundamentals of business management and leadership",
          instructor: "Dr. Linda Monroe",
          credits: 3,
          startDate: "September 3, 2023",
          duration: "14 weeks",
          stream: "Business",
        },
        {
          id: "business-2",
          name: "Introduction to Marketing",
          description: "Learn the basics of marketing and market research",
          instructor: "Prof. John Lee",
          credits: 3,
          startDate: "September 10, 2023",
          duration: "12 weeks",
          stream: "Business",
        },
        {
          id: "business-3",
          name: "Financial Accounting",
          description: "Understand financial statements and basic accounting methods",
          instructor: "Ms. Daisy Clarke",
          credits: 4,
          startDate: "September 15, 2023",
          duration: "15 weeks",
          stream: "Business",
        }
      ];
      foundCourse = allStatic.find(c => c.id === courseId) || null;
    }

    setCourse(foundCourse);
  }, [courseId]);

  const userStream = user?.stream;
  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">Course not found.</div>
    );
  }
  if (userStream && streamsForCourses[course.id] && userStream.toLowerCase() !== streamsForCourses[course.id].toLowerCase()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-semibold mb-2">Access Denied</div>
        <div className="text-muted-foreground mb-4">This course is not available for your stream.</div>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const handleOpenResource = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/5 to-blue-500/5">
      <StudentDashboardHeader user={user} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{course.name}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-base pt-2">
                <span><strong>Instructor:</strong> {course.instructor}</span>
                <span><strong>Difficulty:</strong> {difficultyById[course.id]}</span>
              </div>
              <div className="flex flex-wrap gap-6">
                <div><strong>Credits:</strong> {course.credits}</div>
                <div><strong>Start Date:</strong> {course.startDate}</div>
                <div><strong>Duration:</strong> {course.duration}</div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Resources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {courseResourcesById[course.id]?.map(resource => (
                    <Card key={resource.id} className="bg-white/40 border border-accent rounded-lg hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2 flex flex-row gap-2 items-center">
                        {getIcon(resource.type)}
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-1 text-sm text-muted-foreground">{resource.description}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-1"
                          onClick={() => handleOpenResource(resource.link)}
                        >
                          Open Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {!courseResourcesById[course.id] && (
                    <div>No resources available yet.</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
