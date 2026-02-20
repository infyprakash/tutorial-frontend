import CourseList from "./components/courseList";
import { fetchData } from "./fetchApi";
import Hero from "./ui/hero";

export const metadata = {
  title: "Programming & Technology Courses | TutorialHub",
  description:
    "Learn programming, AI, data science, and modern software development through structured, high-quality tutorials.",
};

export default async function Home() {
  const response = await fetchData("courses/");
  const courses = await response.json();

  if (!response.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="bg-white/80 backdrop-blur-sm border border-red-200 shadow-lg rounded-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Error! Loading courses...
          </h1>
          <p className="text-gray-600">
            Please refresh the page or try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <Hero />
      </div>

      {/* Course Section */}
      <section
        id="courses"
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
              Start Learning Today
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900">
              Popular Courses
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-2xl">
              Explore curated tutorials designed for students, developers, and professionals.
              Dive into the latest technologies and advance your skills.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href="#all-courses"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              View all courses
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Glass Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 relative z-10">
          <CourseList courses={courses} />
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </section>
    </main>
  );
}