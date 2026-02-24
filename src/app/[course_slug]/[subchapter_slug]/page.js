import Link from "next/link";
import EditCourseContentArea from "../../ui/editCourseContent";
import CourseContentClient from "../../components/CourseContentClient";
import { fetchData } from "../../fetchApi";
import { getSession } from "../../auth/utils";


// export async function generateStaticParams() {
//     const res_courses = await fetchData("courses/");
//     const courses = await res_courses.json();

//     if (!res_courses.ok) {
//         return [];
//     }

//     const params = [];

//     for (const course of courses) {
//         try {
//             const chapters = await fetchData(`chapters/course/${course.slug}`);
//             const chaptersJson = await chapters.json();
//             chaptersJson.forEach((chapter) => {
//                 chapter.subchapters.forEach((sub) => {
//                     params.push({
//                         course_slug: course.slug,
//                         subchapter_slug: sub.slug,
//                     });
//                 });
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     return params;
// }

export async function generateMetadata({ params }) {
    const { course_slug, subchapter_slug } = await params;
    const response = await fetchData(`courses/detail/${course_slug}`);
    const course = await response.json();

    const response_sub = await fetchData(`subchapters/slug/${subchapter_slug}`);
    const subchapter = await response_sub.json();

    return {
        title: `${subchapter.name} Notes | IOE Nepal Syllabus`,
        description: course.description,
        keywords: [
            subchapter.name,
            "IOE Nepal syllabus",
            "Engineering notes",
            `${subchapter.name} tutorial`,
        ],
        openGraph: {
            title: `${subchapter.name} | IOE Notes`,
            description: course.description,
            url: `${process.env.NEXT_PUBLIC_HOST}${course_slug}`,
            siteName: "ezexplanation",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: subchapter.name,
            description: course.description,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_HOST}${course_slug}/${subchapter_slug}`,
        },
    };
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

    const response_sub = await fetchData(`subchapters/slug/${subchapter_slug}`);
    const subchapter = await response_sub.json();

    const response2 = await fetchData(`courses/detail/${course_slug}`);
    const course = await response2.json();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: subchapter.name,
        description: course.description,
        provider: {
            "@type": "Organization",
            name: "ezexplanation",
            sameAs: `${process.env.NEXT_PUBLIC_HOST}`,
        },
    };



    session?.token ? isAdmin = true : isAdmin = false;
    if (!isAdmin) {
        if (!response_courseContent.ok || !response_chapters.ok) {
            return <h1 className="text-center text-red-500 mt-10">Error Loading Course Content</h1>;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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