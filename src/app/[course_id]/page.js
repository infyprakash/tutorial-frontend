import Link from "next/link";
import { fetchData } from "../fetchApi";

export default async function CourseDetail({ params }) {
    const { course_id } = await params;
    const chapters = await fetchData(`chapters/course/${course_id}`);
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-2">
                <h2 className="text-center text-2xl font-bold">Table of Content</h2>
                {chapters && chapters.map((chapter, index) => (
                    <div key={index}>
                        <p className="font-bold">{chapter.name}</p>
                        <ul>
                            {chapter.subchapters.map((topic, id) => (
                                <li key={`${id}-${topic.name}`}><Link href={`/${course_id}/${topic.id}`}>{topic.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="md:col-span-1"></div>
        </div >
    )
}