"use client";

import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer({
    logo = null,
    logoHref = "/",
    columns = [],
    socialLinks = [],
    showNewsletter = false,
    newsletterAction = "#",
    copyright = "",
    className = "",
}) {
    const currentYear = new Date().getFullYear();
    const defaultCopyright = `© ${currentYear} Your Company. All rights reserved.`;

    return (
        <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo */}
                    {logo && (
                        <Link href={logoHref} className="inline-block">
                            {typeof logo === "string" ? (
                                <img
                                    src="/ezexplanation_logo.png"
                                    alt="EasyExplanation"
                                    className="h-12 w-auto"
                                />
                            ) : (
                                logo
                            )}
                        </Link>
                    )}

                    {/* Navigation Links */}
                    {columns.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                            {columns.map((col, idx) => (
                                <div key={idx} className="flex flex-wrap justify-center gap-4">
                                    {col.links.map((link, linkIdx) => (
                                        <Link
                                            key={linkIdx}
                                            href={link.href}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Social Links */}
                    {socialLinks.length > 0 && (
                        <div className="flex space-x-6">
                            {socialLinks.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.platform}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Copyright */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {copyright || defaultCopyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}