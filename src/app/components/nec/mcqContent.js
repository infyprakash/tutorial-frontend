"use client";

import { useState } from "react";
import AdsenseAd from "../AdsenseAd";

export default function McqContent({ content }) {
    const [revealedQuestions, setRevealedQuestions] = useState(new Set());

    const toggleAnswer = (index) => {
        setRevealedQuestions((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{content.name}</h1>

            <div className="space-y-8">
                {content.questions.map((q, idx) => {
                    const showAnswer = revealedQuestions.has(idx);
                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {idx + 1}. {q.question}
                            </h2>

                            <ul className="space-y-2 mb-4">
                                {q.answers.map((ans, aidx) => {
                                    const isCorrect = ans.is_correct;
                                    return (
                                        <li
                                            key={aidx}
                                            className={`
                        flex items-start gap-2 p-2 rounded-md
                        ${showAnswer && isCorrect ? "bg-green-50 border border-green-200" : ""}
                      `}
                                        >
                                            <span className="text-gray-600 w-6 flex-shrink-0">
                                                {String.fromCharCode(65 + aidx)}.
                                            </span>
                                            <span className="flex-1 text-gray-700">{ans.answer}</span>
                                            {showAnswer && isCorrect && (
                                                <span className="text-green-600 font-medium ml-2 flex-shrink-0">
                                                    ✓ Correct
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                onClick={() => toggleAnswer(idx)}
                                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {showAnswer ? "Hide Answer" : "Show Answer"}
                            </button>

                            {idx === 1 && (
                                <div className="my-8">
                                    <AdsenseAd />
                                </div>
                            )}

                        </div>

                    );
                })}

                <div className="mt-12">
                    <AdsenseAd />
                </div>
            </div>
        </div>
    );
}