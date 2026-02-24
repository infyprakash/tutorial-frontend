import Link from "next/link";

export default async function TableOfContent({ data, program_slug }) {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Book title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                {data.name}
            </h1>
            <p className="text-gray-500 text-sm mb-8 border-b border-gray-200 pb-4">
                Table of Contents
            </p>

            {/* Chapters */}
            <div className="space-y-6">
                {data.chapters.map((chapter, chapterIndex) => (
                    <section key={chapterIndex} className="chapter">
                        {/* Chapter heading with number */}
                        <h2 className="flex items-center text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-100">
                            <span className="text-gray-400 w-12 text-sm font-mono">
                                {chapterIndex + 1}.
                            </span>
                            <span>{chapter.name}</span>
                        </h2>

                        {/* Subchapters list */}
                        <ul className="space-y-1">
                            {chapter.subchapters.map((subchapter, subIndex) => (
                                <li key={subchapter.slug}>
                                    <Link
                                        href={`/nec-license/${program_slug}/${subchapter.slug}`}
                                        className="flex items-center py-1 px-2 -mx-2 rounded hover:bg-gray-50 transition-colors group"
                                    >
                                        {/* Subchapter number */}
                                        <span className="text-gray-400 w-12 text-right text-sm font-mono mr-3">
                                            {chapterIndex + 1}.{subIndex + 1}
                                        </span>

                                        {/* Title with truncation */}
                                        <span className="text-gray-700 group-hover:text-blue-600 truncate flex-1">
                                            {subchapter.name}
                                        </span>

                                        {/* Dotted leader and arrow */}
                                        <span className="flex-1 border-b border-dotted border-gray-300 mx-2"></span>
                                        <span className="text-gray-400 group-hover:text-blue-600 ml-2">
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}