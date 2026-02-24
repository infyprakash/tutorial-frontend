"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../contexts/SidebarContext";

export default function NecSidebar({ program, program_slug }) {
    const pathname = usePathname();
    const { mobileSidebarOpen, setMobileSidebarOpen } = useSidebar();

    // Close sidebar after navigation on mobile
    const handleLinkClick = () => {
        setMobileSidebarOpen(false);
    };

    return (
        <>
            {/* Overlay for mobile when sidebar is open */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar container */}
            <aside
                className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out z-50
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block overflow-y-auto
        `}
            >
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 px-2">
                        {program.name}
                    </h2>
                    <nav className="space-y-4">
                        {program.chapters.map((chapter, idx) => (
                            <div key={idx}>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
                                    {chapter.name}
                                </h3>
                                <ul className="space-y-1">
                                    {chapter.subchapters.map((sub) => {
                                        const href = `/nec-license/${program_slug}/${sub.slug}`;
                                        const isActive = pathname === href;
                                        return (
                                            <li key={sub.slug}>
                                                <Link
                                                    href={href}
                                                    onClick={handleLinkClick}
                                                    className={`
                            block px-3 py-2 rounded-md text-sm transition-colors
                            ${isActive
                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                        }
                          `}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
}