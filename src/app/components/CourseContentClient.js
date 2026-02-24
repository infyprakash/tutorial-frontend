"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";
import EditCourseContentArea from "../ui/editCourseContent";
import AdsenseAd from "./AdsenseAd";

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

    const activeItemRef = useRef(null);

    // Flatten all subchapters for prev/next
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

    const prevSub =
        currentIndex > 0 ? allSubchapters[currentIndex - 1] : null;
    const nextSub =
        currentIndex < allSubchapters.length - 1
            ? allSubchapters[currentIndex + 1]
            : null;

    // Lock body scroll on mobile sidebar open
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

    // Sidebar classes (mobile + desktop)
    const mobileSidebarClasses = `
        fixed inset-y-0 left-0 z-40 w-4/5 max-w-sm bg-white 
        shadow-xl border-r border-gray-200 pl-4 pr-6 py-6 
        overflow-y-auto transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        top-16 h-[calc(100vh-4rem)]
    `;

    const desktopSidebarClasses = `
        md:col-span-3 bg-white rounded-l-xl border-r border-gray-200 
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
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`${mobileSidebarClasses} md:hidden`}>
                <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 md:hidden"
                    aria-label="Close sidebar"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                    Contents
                </h2>

                {chapters.map((chapter, chapterIdx) => (
                    <div key={chapterIdx} className="mb-6 last:mb-0">
                        <h3 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-100">
                            {chapter.name}
                        </h3>

                        <ul className="space-y-1">
                            {chapter.subchapters.map((topic, topicIdx) => {
                                const isActive = topic.slug === subchapter_slug;

                                return (
                                    <li
                                        key={topic.slug}
                                        ref={isActive ? activeItemRef : null}
                                    >
                                        <Link
                                            href={`/${course_slug}/${topic.slug}`}
                                            onClick={() => setMobileSidebarOpen(false)}
                                            className={`
                                                flex items-center py-1.5 px-2 rounded-md
                                                transition-all duration-200 group
                                                ${isActive
                                                    ? "bg-blue-50 border-l-2 border-blue-600 pl-3"
                                                    : "hover:bg-gray-50 border-l-2 border-transparent"
                                                }
                                            `}
                                        >
                                            {/* Section number */}
                                            <span
                                                className={`
                                                    w-8 text-right text-sm font-mono mr-2
                                                    ${isActive
                                                        ? "text-blue-700"
                                                        : "text-gray-400 group-hover:text-gray-600"
                                                    }
                                                `}
                                            >
                                                {chapterIdx + 1}.{topicIdx + 1}
                                            </span>

                                            {/* Title */}
                                            <span
                                                className={`
                                                    flex-1 text-sm truncate
                                                    ${isActive
                                                        ? "text-blue-700 font-medium"
                                                        : "text-gray-700 group-hover:text-blue-600"
                                                    }
                                                `}
                                            >
                                                {topic.name}
                                            </span>

                                            {/* Arrow on hover (desktop only) */}
                                            <span
                                                className={`
                                                    ml-2 text-gray-400 group-hover:text-blue-600
                                                    opacity-0 group-hover:opacity-100 transition-opacity
                                                    hidden sm:inline
                                                `}
                                            >
                                                →
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* Desktop Sidebar */}
            <aside className={`hidden md:block ${desktopSidebarClasses}`}>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                    Contents
                </h2>

                {chapters.map((chapter, chapterIdx) => (
                    <div key={chapterIdx} className="mb-6 last:mb-0">
                        <h3 className="text-sm font-bold text-gray-800 mb-2 pb-1 border-b border-gray-100">
                            {chapter.name}
                        </h3>

                        <ul className="space-y-1">
                            {chapter.subchapters.map((topic, topicIdx) => {
                                const isActive = topic.slug === subchapter_slug;

                                return (
                                    <li
                                        key={topic.slug}
                                        ref={isActive ? activeItemRef : null}
                                    >
                                        <Link
                                            href={`/${course_slug}/${topic.slug}`}
                                            className={`
                                                flex items-center py-1.5 px-2 rounded-md
                                                transition-all duration-200 group
                                                ${isActive
                                                    ? "bg-blue-50 border-l-2 border-blue-600 pl-3"
                                                    : "hover:bg-gray-50 border-l-2 border-transparent"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    w-8 text-right text-sm font-mono mr-2
                                                    ${isActive
                                                        ? "text-blue-700"
                                                        : "text-gray-400 group-hover:text-gray-600"
                                                    }
                                                `}
                                            >
                                                {chapterIdx + 1}.{topicIdx + 1}
                                            </span>
                                            <span
                                                className={`
                                                    flex-1 text-sm truncate
                                                    ${isActive
                                                        ? "text-blue-700 font-medium"
                                                        : "text-gray-700 group-hover:text-blue-600"
                                                    }
                                                `}
                                            >
                                                {topic.name}
                                            </span>
                                            <span
                                                className={`
                                                    ml-2 text-gray-400 group-hover:text-blue-600
                                                    opacity-0 group-hover:opacity-100 transition-opacity
                                                `}
                                            >
                                                →
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* Main Content Area */}
            <section
                className={`
                    ${fullWidth ? "md:col-span-12" : "md:col-span-9"}
                    bg-white rounded-r-xl shadow-sm border border-gray-200 border-l-0 p-6 md:p-10
                    relative transition-shadow
                `}
            >
                {/* Sidebar toggle */}
                <button
                    onClick={() => setFullWidth(!fullWidth)}
                    className="absolute top-4 right-4 text-sm text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-full px-4 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm hover:bg-gray-50"
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
                    <article className="prose prose-lg max-w-3xl mx-auto text-gray-800 leading-relaxed px-4 sm:px-6">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: courseContent.content,
                            }}
                        />
                        {/* ads here  */}
                        <div className="my-12">
                            <AdsenseAd />
                        </div>
                    </article>
                )}

                {/* Previous / Next Navigation */}
                <div className="mt-12 flex justify-between border-t border-gray-200 pt-6">
                    {prevSub ? (
                        <Link
                            href={`/${course_slug}/${prevSub.slug}`}
                            className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors text-sm font-medium group"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">
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
                            className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors text-sm font-medium group"
                        >
                            <span className="truncate max-w-[150px] md:max-w-xs">
                                {nextSub.name}
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform">
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