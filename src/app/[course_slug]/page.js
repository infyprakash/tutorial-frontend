import Link from "next/link";
import { fetchData } from "../fetchApi";

export default async function CourseDetail({ params }) {
    const { course_slug } = await params;
    const response = await fetchData(`chapters/course/${course_slug}`);
    const chapters = await response.json();

    if (!response.ok) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-stone-50">
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
        // Use flex to center the card both horizontally and vertically
        <main className="min-h-screen flex items-center justify-center bg-stone-50 px-4 sm:px-6 lg:px-8">
            {/* Centered card with warm paper background and refined shadow */}
            <div className="w-full max-w-3xl bg-[#faf7f2] rounded-xl shadow-lg border border-gray-200/80 p-8 md:p-12 transition-shadow hover:shadow-xl">
                {/* Book‑style header with decorative underline */}
                <header className="mb-12 text-center border-b border-amber-200/70 pb-6">
                    <h1 className="text-4xl md:text-5xl font-serif text-stone-800 tracking-tight">
                        Contents
                    </h1>
                    <p className="mt-2 text-stone-400 text-sm uppercase tracking-widest">
                        {chapters?.length || 0} {chapters?.length === 1 ? 'chapter' : 'chapters'}
                    </p>
                </header>

                {/* Chapters list – styled like a book’s table of contents */}
                <div className="space-y-8">
                    {chapters.map((chapter, idx) => (
                        <section key={idx} className="space-y-2">
                            {/* Chapter heading with small amber bullet (echoes sidebar) */}
                            <h2 className="font-serif text-lg font-medium text-stone-800 mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
                                <span className="uppercase tracking-wide text-xs text-amber-800">
                                    {chapter.name}
                                </span>
                            </h2>

                            {/* Subchapters indented, each link styled like sidebar topics */}
                            <ul className="space-y-1 ml-4">
                                {chapter.subchapters.map((topic, tid) => (
                                    <li key={`${tid}-${topic.name}`}>
                                        <Link
                                            href={`/${course_slug}/${topic.slug}`}
                                            // Hover effect: background, border, and bullet slide
                                            className="group flex items-start gap-2 px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-amber-50/80 rounded-md transition-all duration-200 text-sm border-l-2 border-transparent hover:border-amber-400"
                                        >
                                            <span className="text-amber-600/70 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-transform duration-200">
                                                ▹
                                            </span>
                                            <span className="flex-1">{topic.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>

                {/* Decorative colophon with subtle italic text */}
                <div className="mt-16 text-center text-stone-400 text-xs font-serif italic border-t border-amber-200/70 pt-6">
                    <p>Begin your journey on the next page</p>
                </div>
            </div>
        </main>
    );
}