
"use client";
import { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";

async function postData(params) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}tutorial/${params.url}`,
            {
                method: "PUT",
                headers: {
                    token: process.env.NEXT_PUBLIC_API_TOKEN,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(params.formData),
            }
        );
        if (!response.ok) {
            throw new Error("Error creating new content");
        }
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchData(url) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}tutorial/${url}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            token: process.env.NEXT_PUBLIC_API_TOKEN,
        },
        // next: { revalidate: 60 }
    });
    return res;
}

export default function EditCourseContentArea({ courseContent, subchapter_slug }) {
    const [formData, setFormData] = useState({
        content: "",
        subchapter_id: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const fetchSubChapter = async () => {
            try {
                const res = await fetchData(`subchapters/slug/${subchapter_slug}`);
                const data = await res.json();
                setFormData((prevData) => ({
                    ...prevData,
                    subchapter_id: data.id,
                }));
            } catch (error) {
                setMessage({ type: "error", text: "Failed to load subchapter." });
            }
        };

        if (subchapter_slug) {
            fetchSubChapter();
        }
    }, [subchapter_slug]);

    useEffect(() => {
        if (courseContent?.content) {
            setFormData((prevData) => ({
                ...prevData,
                content: courseContent.content,
                subchapter_id: courseContent.subchapter_id ?? prevData.subchapter_id,
            }));
        }
    }, [courseContent]);

    const handleChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            content: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await postData({
                url: `course-content/subchapter/${subchapter_slug}`,
                formData,
            });
            setMessage({ type: "success", text: "Content updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: error.message || "Update failed." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Edit Course Content
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* WYSIWYG Editor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <Editor
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full min-h-[300px] p-3 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Status Message */}
                {message.text && (
                    <div
                        className={`p-3 rounded-md text-sm ${message.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full sm:w-auto px-6 py-2.5 text-white font-medium rounded-lg transition-colors duration-200 ${isLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Saving...
                        </span>
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </form>
        </div>
    );
}