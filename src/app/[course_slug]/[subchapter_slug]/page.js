import Link from "next/link";
import EditCourseContentArea from "../../ui/editCourseContent";
import CourseContentClient from "../../components/CourseContentClient";
import { fetchData } from "../../fetchApi";
import { getSession } from "../../auth/utils";

export async function generateStaticParams() {
    const res_courses = await fetchData("courses/");
    const courses = await res_courses.json();

    if (!res_courses.ok) {
        return [];
    }

    const params = [];

    for (const course of courses) {
        try {
            const chapters = await fetchData(`chapters/course/${course.slug}`);
            const chaptersJson = await chapters.json();
            chaptersJson.forEach((chapter) => {
                chapter.subchapters.forEach((sub) => {
                    params.push({
                        course_slug: course.slug,
                        subchapter_slug: sub.slug,
                    });
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    return params;
}

export default async function CourseContent({ params }) {
    const { course_slug, subchapter_slug } = await params;
    const session = await getSession();
    let isAdmin = false;

    const response_courseContent = await fetchData(
        `course-content/subchapter/${subchapter_slug}`
    );
    const courseContent = await response_courseContent.json();

    const response_chapters = await fetchData(`chapters/course/${course_slug}`);
    const chapters = await response_chapters.json();




    session?.token ? isAdmin = true : isAdmin = false;
    if (!isAdmin) {
        if (!response_courseContent.ok || !response_chapters.ok) {
            return <h1 className="text-center text-red-500 mt-10">Error Loading Course Content</h1>;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Reduced outer padding: px-2 on mobile, px-4 on medium+ screens */}
            <div className="max-w-7xl mx-auto px-2 md:px-4">
                <CourseContentClient
                    chapters={chapters}
                    courseContent={courseContent}
                    course_slug={course_slug}
                    subchapter_slug={subchapter_slug}
                    isAdmin={isAdmin}
                />
            </div>
        </div>
    );
}