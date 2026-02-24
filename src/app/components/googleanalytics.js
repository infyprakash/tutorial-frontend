"use client";

import { useEffect } from "react";

export default function GoogleAnalytics() {
    const measurementId = process.env.NEXT_PUBLIC_GTAG;

    useEffect(() => {
        if (!measurementId) return;

        // Initialize dataLayer if not already
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;

        // Dynamically load GA script
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        document.head.appendChild(script);

        // Configure GA after script load
        script.onload = () => {
            window.gtag("js", new Date());
            window.gtag("config", measurementId, {
                page_path: window.location.pathname,
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [measurementId]);

    return null;
}