import Link from "next/link";
import { fetchData } from "../../fetchApi";
import EditCourseContentArea from "../../ui/editCourseContent";

export async function generateStaticParams() {
    const courses = await fetchData("courses/");

    let params = [];

    for (const course of courses) {
        try {
            const chapters = await fetchData(`chapters/course/${course.id}`);
            chapters.forEach(chapter => {
                chapter.subchapters.forEach(sub => {
                    params.push({
                        course_id: course.id.toString(),
                        subchapter_id: sub.id.toString()
                    });
                });
            });
        } catch (error) {
            console.log(error);
        }

    }
    return params;
}


export default async function CourseContent({ params }) {
    const { course_id, subchapter_id } = await params;
    const courseContent = await fetchData(`course-content/subchapter/${subchapter_id}`);
    const chapters = await fetchData(`chapters/course/${course_id}`);
    const isAdmin = false;

    return (
        <div className="grid grid-rows-2 md:grid-cols-4">
            <div className="row-span-1 md:col-span-1">
                {chapters && chapters.map((chapter, index) => (
                    <div key={index}>
                        <p className="font-bold">{chapter.name}</p>
                        <ul>
                            {chapter.subchapters.map((topic, id) => (
                                <li key={`${id}-${topic.name}`}><Link href={`/${course_id}/${topic.id}`}>{topic.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}</div>
            <div className="row-span-1 md:col-span-3">
                {isAdmin ? <EditCourseContentArea courseContent={courseContent} subchapter_id={subchapter_id} /> : <CourseContentArea courseContent={courseContent} />}
            </div>
        </div>);
}

function CourseContentArea(props) {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: props.courseContent.content }} />
        </div>
    )
}