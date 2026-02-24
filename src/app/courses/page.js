import { fetchData } from "../fetchApi";
import CourseList from "../components/courseList";

export default async function CoursePage() {
    const response = await fetchData("courses/");
    const courses = await response.json();

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                    <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">📚</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    Our Courses
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Explore our comprehensive library of computer science tutorials. From beginner to advanced, we've got you covered.
                </p>
            </div>

            {/* Search / Filter Bar (static UI – functionality can be added later) */}
            <div className="max-w-xl mx-auto mb-12">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full px-5 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:text-white"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        🔍
                    </span>
                </div>
                {/* Optional filter chips */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["All", "Programming", "AI/ML", "Web Dev", "Data Science"].map((filter) => (
                        <button
                            key={filter}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course List (existing component) */}
            <CourseList courses={courses} />

            {/* Optional footer note */}
            <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
                <p>New courses added regularly. Stay tuned!</p>
            </div>
        </main>
    );
}