"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContext";
import { logoutAction } from "../auth/action";

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { mobileSidebarOpen, setMobileSidebarOpen } = useSidebar();

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Nec License", href: "/nec-license" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },

    ];

    const isActive = (href) => pathname === href;

    // Detect if we are on a course content page (e.g., /course-slug/subchapter-slug)
    const isCoursePage = pathname?.match(/^\/[^\/]+\/[^\/]+$/);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
            <nav
                className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16"
                aria-label="Primary Navigation"
            >
                <div className="flex items-center gap-3">
                    {/* Logo as a clickable link */}
                    <Link href="/">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 overflow-hidden">
                            <img
                                src="/ezexplanation_logo.png"
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Link>

                    {/* Text link */}
                    <Link
                        href="/"
                        className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 transition-colors ml-2"
                    >
                        TutorialSite
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    {/* Mobile Sidebar Toggle (only on course pages) */}
                    {isCoursePage && (
                        <button
                            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded={mobileSidebarOpen}
                            aria-label="Toggle course sidebar"
                        >
                            <span className="sr-only">Toggle course sidebar</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8" role="list">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 group ${isActive(item.href)
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-600"
                                        }`}
                                >
                                    {item.name}
                                    <span
                                        className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100 ${isActive(item.href) ? "scale-x-100" : ""
                                            }`}
                                    />
                                </Link>
                            </li>
                        ))}
                        <li>
                            {isLoggedIn && <button
                                onClick={async () => await logoutAction()}
                                style={{ cursor: 'pointer', color: 'red' }}
                            >
                                Logout
                            </button>}
                        </li>
                    </ul>

                    {/* Mobile Menu Button (for main navigation) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                    >
                        <span className="sr-only">Open main menu</span>
                        {!isOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
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
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu (navigation links) */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <ul
                    className="px-4 pt-2 pb-3 space-y-2 bg-white/90 backdrop-blur-sm border-t border-gray-200 rounded-b-md"
                    role="list"
                >
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive(item.href)
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;