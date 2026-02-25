'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function ErrorPage({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/10 p-4 rounded-full">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-white mb-2">
                    Something went wrong
                </h1>

                <p className="text-slate-400 text-sm mb-6">
                    An unexpected error occurred. Please try again.
                </p>

                {/* Dev Error Message */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 break-words">
                        {error?.message}
                    </div>
                )}

                {/* Retry Button */}
                <button
                    onClick={() => reset()}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white font-medium rounded-lg shadow-lg hover:shadow-red-500/30 active:scale-95"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        </div>
    )
}