"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl animate-fadeInSlow" />
                <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-purple-200/20 blur-3xl animate-fadeInSlow delay-200" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 flex flex-col lg:flex-row items-center gap-12">
                {/* Left Column: Headline + CTA */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 text-center lg:text-left"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Learn to code{" "}
                        <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            interactively
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                        Master web development with hands-on projects and real-time feedback.
                        Join a community of learners building real skills.
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-5"
                    >
                        <Link
                            href="/get-started"
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Start Learning Free
                            <svg
                                className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-8 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-all focus:outline-none focus:ring-4 focus:ring-blue-200"
                        >
                            View Courses
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-8 flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-500"
                    >
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span>10k+ learners</span>
                    </motion.div>
                </motion.div>

                {/* Right Column: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 relative w-full max-w-lg lg:max-w-full h-72 sm:h-96 lg:h-[500px]"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1031&q=80"
                        alt="Coding on laptop"
                        fill
                        className="object-contain rounded-3xl shadow-2xl"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}
