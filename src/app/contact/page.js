export default function ContactPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero / Introduction */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                    <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">📞</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    Contact Us
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Have a question, feedback, or just want to say hello? We'd love to hear from you.
                </p>
            </div>

            {/* Contact Information Cards */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Get in Touch
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Address Card */}
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl">📍</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Jwagal, Lalitpur<br />
                            Nepal
                        </p>
                    </div>

                    {/* Phone Card */}
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl">📞</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            <a href="tel:+9779840143772" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                +977-9840143772
                            </a>
                        </p>
                    </div>

                    {/* Email Card */}
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl">✉️</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            <a href="mailto:info@infographytech.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                info@infographytech.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Facebook Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Connect With Us
                </h2>
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                        <span className="text-4xl">📘</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                        Follow us on Facebook for the latest updates, tutorials, and community discussions. Join our growing family of learners!
                    </p>
                    <a
                        href="https://www.facebook.com/InfographyTechnologies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg border border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 no-underline"
                        style={{ color: 'white !important' }} /* Ensures text stays white */
                    >
                        <span>Visit our Facebook page</span>
                        <span>→</span>
                    </a>
                </div>
            </section>

            {/* Optional: Map hint */}
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>📍 Visit us: Jwagal, Lalitpur, Nepal</p>
            </div>
        </main>
    );
}