"use client"; // must be client-side

import { useEffect } from "react";

export default function AdSense() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={`${process.env.NEXT_PUBLIC_DATA_AD_CLIENT}`}
            data-ad-slot={`${process.env.NEXT_PUBLIC_AD_SLOT}`}
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    );
}