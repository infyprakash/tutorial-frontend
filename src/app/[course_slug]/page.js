import Link from "next/link"
import { fetchData } from "../fetchApi";
import AdsenseAd from "../components/AdsenseAd";

export async function generateMetadata({ params }) {
    const { course_slug } = await params;
    const response = await fetchData(`courses/detail/${course_slug}`);
    const course = await response.json();

    return {
        title: `${course.name} Notes | IOE Nepal Syllabus`,
        description: course.description,
        keywords: [
            course.name,
            "IOE Nepal syllabus",
            "Engineering notes",
            `${course.name} tutorial`,
        ],
        openGraph: {
            title: `${course.name} | IOE Notes`,
            description: course.description,
            url: `${process.env.NEXT_PUBLIC_HOST}${course_slug}`,
            siteName: "ezexplanation",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: course.name,
            description: course.description,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_HOST}${course_slug}`,
        },
    };
}


export default async function CourseDetail({ params }) {
    const { course_slug } = await params;
    const response = await fetchData(`chapters/course/${course_slug}`);
    const chapters = await response.json();

    const response2 = await fetchData(`courses/detail/${course_slug}`);
    const course = await response2.json();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.name,
        description: course.description,
        provider: {
            "@type": "Organization",
            name: "ezexplanation",
            sameAs: `${process.env.NEXT_PUBLIC_HOST}`,
        },
    };

    if (!response.ok) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-stone-50">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div className="text-center max-w-md p-8">
                    <h1 className="text-3xl font-serif text-stone-800 mb-3">
                        Table of Contents
                    </h1>
                    <p className="text-stone-500 font-light">
                        This volume could not be found.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
                {/* Header – clean and minimal */}
                <header className="mb-10 border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                        Contents
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm uppercase tracking-widest">
                        {chapters?.length || 0} {chapters?.length === 1 ? 'chapter' : 'chapters'}
                    </p>
                </header>

                {/* 🔥 Ad Placement */}
                <div className="mb-10">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <AdsenseAd />
                    </div>
                </div>

                {/* Chapters list */}
                <div className="space-y-6">
                    {chapters.map((chapter, chapterIndex) => (
                        <section key={chapterIndex}>
                            {/* Chapter heading with number */}
                            <h2 className="flex items-center text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-100">
                                <span className="text-gray-400 w-12 text-sm font-mono">
                                    {chapterIndex + 1}.
                                </span>
                                <span>{chapter.name}</span>
                            </h2>

                            {/* Subchapters list */}
                            <ul className="space-y-1">
                                {chapter.subchapters.map((topic, topicIndex) => (
                                    <li key={`${chapterIndex}-${topicIndex}`}>
                                        <Link
                                            href={`/${course_slug}/${topic.slug}`}
                                            className="flex items-center py-1 px-2 -mx-2 rounded hover:bg-gray-50 transition-colors group"
                                        >
                                            {/* Empty spacer – keeps alignment with chapter numbers */}
                                            <span className="text-gray-400 w-12 text-right text-sm font-mono mr-3" aria-hidden="true"></span>

                                            {/* Topic title – full name, no truncation */}
                                            <span className="flex-1 text-gray-700 group-hover:text-blue-600">
                                                {topic.name}
                                            </span>

                                            {/* Right arrow – appears on hover */}
                                            <span className="text-gray-400 group-hover:text-blue-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                →
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {/* Optional subtle footer */}
                <div className="mt-16 text-center text-gray-400 text-xs italic border-t border-gray-200 pt-6">
                    <p>Begin your journey</p>
                </div>
            </div>
        </main>
    );
}