import Link from "next/link";

export default function CourseList({ courses }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
                <Link
                    key={course.id}
                    href={`/${course.slug}`}
                    className="group h-40 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white text-center"
                >
                    <span className="text-lg font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {course.name}
                    </span>
                </Link>
            ))}
        </div>
    );
}