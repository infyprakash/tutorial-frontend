"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";
import EditCourseContentArea from "../ui/editCourseContent";

export default function CourseContentClient({
    chapters,
    courseContent,
    course_slug,
    subchapter_slug,
    isAdmin,
}) {
    const [fullWidth, setFullWidth] = useState(false);
    const pathname = usePathname();
    const { mobileSidebarOpen, setMobileSidebarOpen } = useSidebar();

    // Flatten all subchapters to easily find prev/next
    const allSubchapters = useMemo(() => {
        return chapters.flatMap((ch) =>
            ch.subchapters.map((sub) => ({
                ...sub,
                chapterName: ch.name,
            }))
        );
    }, [chapters]);

    const currentIndex = allSubchapters.findIndex(
        (sub) => sub.slug === subchapter_slug
    );
    const prevSub = currentIndex > 0 ? allSubchapters[currentIndex - 1] : null;
    const nextSub =
        currentIndex < allSubchapters.length - 1
            ? allSubchapters[currentIndex + 1]
            : null;

    // Lock body scroll when mobile sidebar is open
    useEffect(() => {
        if (mobileSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileSidebarOpen]);

    // Sidebar classes for mobile overlay
    const mobileSidebarClasses = `
        fixed inset-y-0 left-0 z-40 w-4/5 max-w-sm bg-[#faf7f2] 
        shadow-xl border-r border-gray-200/80 pl-4 pr-6 py-6 
        overflow-y-auto transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        top-16 h-[calc(100vh-4rem)]
    `;

    // Sidebar classes for desktop (original grid behaviour)
    const desktopSidebarClasses = `
        md:col-span-3 bg-[#faf7f2] rounded-l-xl border-r border-gray-200/80 
        pl-4 pr-6 py-6 overflow-y-auto sticky top-4 max-h-[calc(100vh-2rem)] 
        transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300 
        scrollbar-track-transparent
        ${fullWidth ? "md:hidden" : "md:block"}
    `;

    return (
        <div className="grid md:grid-cols-12 gap-0">
            {/* Mobile backdrop */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar – mobile overlay + desktop grid */}
            <aside className={`${mobileSidebarClasses} md:hidden`}>
                {/* Optional close button inside sidebar */}
                <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 md:hidden"
                    aria-label="Close sidebar"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-sm font-serif font-semibold text-gray-700 uppercase tracking-wider mb-4 pb-2 border-b border-amber-200/70">
                    Contents
                </h2>
                {chapters.map((chapter, idx) => (
                    <div key={idx} className="mb-6 last:mb-0">
                        <h3 className="font-serif text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
                            <span className="uppercase tracking-wide text-xs text-amber-800">
                                {chapter.name}
                            </span>
                        </h3>
                        <ul className="space-y-1">
                            {chapter.subchapters.map((topic) => {
                                const isActive = topic.slug === subchapter_slug;
                                return (
                                    <li key={topic.slug}>
                                        <Link
                                            href={`/${course_slug}/${topic.slug}`}
                                            className={`
                                                group flex items-start gap-2 pl-2 pr-3 py-1.5 rounded-md 
                                                transition-all duration-200 text-sm border-l-2 
                                                ${isActive
                                                    ? "border-amber-600 bg-amber-50/80 text-gray-900"
                                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-amber-50/80 hover:border-amber-400"
                                                }
                                            `}
                                            onClick={() => setMobileSidebarOpen(false)}
                                        >
                                            <span
                                                className={`
                                                    transition-transform duration-200 
                                                    ${isActive
                                                        ? "text-amber-700 translate-x-0.5"
                                                        : "text-amber-600/70 group-hover:text-amber-700 group-hover:translate-x-0.5"
                                                    }
                                                `}
                                            >
                                                ▹
                                            </span>
                                            <span className="flex-1">{topic.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* Desktop sidebar (hidden on mobile) */}
            <aside className={`hidden md:block ${desktopSidebarClasses}`}>
                <h2 className="text-sm font-serif font-semibold text-gray-700 uppercase tracking-wider mb-4 pb-2 border-b border-amber-200/70">
                    Contents
                </h2>
                {chapters.map((chapter, idx) => (
                    <div key={idx} className="mb-6 last:mb-0">
                        <h3 className="font-serif text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
                            <span className="uppercase tracking-wide text-xs text-amber-800">
                                {chapter.name}
                            </span>
                        </h3>
                        <ul className="space-y-1">
                            {chapter.subchapters.map((topic) => {
                                const isActive = topic.slug === subchapter_slug;
                                return (
                                    <li key={topic.slug}>
                                        <Link
                                            href={`/${course_slug}/${topic.slug}`}
                                            className={`
                                                group flex items-start gap-2 pl-2 pr-3 py-1.5 rounded-md 
                                                transition-all duration-200 text-sm border-l-2 
                                                ${isActive
                                                    ? "border-amber-600 bg-amber-50/80 text-gray-900"
                                                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-amber-50/80 hover:border-amber-400"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    transition-transform duration-200 
                                                    ${isActive
                                                        ? "text-amber-700 translate-x-0.5"
                                                        : "text-amber-600/70 group-hover:text-amber-700 group-hover:translate-x-0.5"
                                                    }
                                                `}
                                            >
                                                ▹
                                            </span>
                                            <span className="flex-1">{topic.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* Main content area */}
            <section
                className={`
                    ${fullWidth ? "md:col-span-12" : "md:col-span-9"}
                    bg-[#fefcf7] rounded-r-xl shadow-md border border-gray-200 border-l-0 p-8 md:p-12 
                    relative transition-shadow hover:shadow-lg
                `}
            >
                {/* Sidebar toggle (desktop) */}
                <button
                    onClick={() => setFullWidth(!fullWidth)}
                    className="absolute top-5 right-5 text-sm text-gray-500 hover:text-gray-800 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
                >
                    {fullWidth ? "📖 Show sidebar" : "📚 Hide sidebar"}
                </button>

                {/* Content */}
                {isAdmin ? (
                    <EditCourseContentArea
                        courseContent={courseContent}
                        subchapter_slug={subchapter_slug}
                    />
                ) : (
                    <article
                        className="prose prose-lg prose-stone max-w-3xl mx-auto font-serif text-gray-800 leading-relaxed 
                                   px-6 md:px-8 
                                   [&>p:first-of-type]:first-letter:text-5xl 
                                   [&>p:first-of-type]:first-letter:font-bold 
                                   [&>p:first-of-type]:first-letter:float-left 
                                   [&>p:first-of-type]:first-letter:mr-3 
                                   [&>p:first-of-type]:first-letter:mt-1 
                                   [&>p:first-of-type]:first-letter:text-amber-700"
                    >
                        <div dangerouslySetInnerHTML={{ __html: courseContent.content }} />
                    </article>
                )}

                {/* Previous / Next navigation */}
                <div className="mt-12 flex justify-between border-t border-gray-200 pt-6">
                    {prevSub ? (
                        <Link
                            href={`/${course_slug}/${prevSub.slug}`}
                            className="text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors text-sm font-medium group"
                        >
                            <span
                                className="group-hover:-translate-x-1 transition-transform"
                                aria-hidden="true"
                            >
                                ←
                            </span>
                            <span className="truncate max-w-[150px] md:max-w-xs">
                                {prevSub.name}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextSub ? (
                        <Link
                            href={`/${course_slug}/${nextSub.slug}`}
                            className="text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors text-sm font-medium group"
                        >
                            <span className="truncate max-w-[150px] md:max-w-xs">
                                {nextSub.name}
                            </span>
                            <span
                                className="group-hover:translate-x-1 transition-transform"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </section>
        </div>
    );
}