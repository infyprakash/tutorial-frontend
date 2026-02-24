"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl animate-fadeInSlow" />
                <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-purple-200/20 blur-3xl animate-fadeInSlow delay-200" />
            </div>

            {/* Floating shapes for added visual interest */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-20 left-1/4 w-32 h-32 bg-blue-300/20 rounded-full blur-xl"
            />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="absolute bottom-20 right-1/4 w-40 h-40 bg-purple-300/20 rounded-full blur-xl"
            />

            <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 flex flex-col items-center text-center">
                {/* Main headline with animated gradient */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
                >
                    <span className="block text-gray-900 dark:text-white">
                        Learn to code
                    </span>
                    <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        simply & interactively
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl"
                >
                    Clear, step‑by‑step tutorials that make complex topics easy.
                    Join thousands of learners mastering computer science.
                </motion.p>

                {/* Optional subtle tagline (no CTA) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-12 text-sm text-gray-400 dark:text-gray-500"
                >
                    ✦ no sign‑up required ✦
                </motion.div>
            </div>
        </section>
    );
}