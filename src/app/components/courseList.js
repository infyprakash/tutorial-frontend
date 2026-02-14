import Link from "next/link";

export default function CourseList({ courses }) {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
                <div key={course.id}>
                    <Link
                        href={`/${course.id}`}
                        className="h-32 flex items-center justify-center text-lg/7 text-center font-bold shadow w-full uppercase hover:brightness-90 transition-all"
                    >
                        {course.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}