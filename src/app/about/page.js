export default function AboutPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Hero / Introduction */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                    {/* Optional: you could place your logo here or a decorative element */}
                    <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">EZ</span>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                    About Us
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We're on a mission to make computer science education simple, accessible, and enjoyable for everyone.
                </p>
            </div>

            {/* About Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Who We Are
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    EasyExplanation is more than just a learning platform — we're a team of passionate educators, developers, and lifelong learners who are dedicated to making knowledge easy, clear, and practical. We understand that learning new topics, especially in tech and programming, can feel overwhelming. That’s why we’ve created a space where complex ideas are broken down into simple, step-by-step explanations anyone can understand. Founded with the vision to simplify education, our platform serves as a go-to resource for students, professionals, and curious minds looking to build strong foundational skills and stay ahead in a fast-changing digital world. From beginners exploring coding for the first time to advanced learners refining their skills, EasyExplanation offers something for everyone.
                </p>
            </section>

            {/* Mission Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Explore the vast world of computer science with our comprehensive tutorials and resources. Whether you're a beginner taking your first steps into coding or an experienced programmer seeking advanced knowledge, our curated content covers a wide range of computer science-related subjects. Dive into programming languages, algorithms, data structures, artificial intelligence, machine learning, web development, and more. Stay curious, keep coding, and empower yourself with the skills to thrive in the dynamic field of computer science. Happy learning!
                </p>
            </section>

            {/* What We Offer (optional, can reuse the same paragraph) */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    What We Offer
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Explore the vast world of computer science with our comprehensive tutorials and resources. Whether you're a beginner taking your first steps into coding or an experienced programmer seeking advanced knowledge, our curated content covers a wide range of computer science-related subjects. Dive into programming languages, algorithms, data structures, artificial intelligence, machine learning, web development, and more. Stay curious, keep coding, and empower yourself with the skills to thrive in the dynamic field of computer science. Happy learning!
                </p>
            </section>

            {/* Optional: Team / Contact hint */}
            <div className="mt-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Have questions? Reach out at{' '}
                    <a href="https://www.facebook.com/easyexplanation26" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        ezexplanation facebook page
                    </a>
                </p>
            </div>
        </main>
    );
}