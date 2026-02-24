import Link from "next/link";

export default function ProgramList({ programs }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {programs.map((program) => (
                <Link
                    key={program.slug}
                    href={`/nec-license/${program.slug}`}
                    className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {program.name}
                    </h3>
                    <p className="text-gray-600">View program details →</p>
                </Link>
            ))}
        </div>
    );
}