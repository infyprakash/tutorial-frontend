"use client";

import { useEffect } from "react";

export default function AdsenseAd() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={`${process.env.NEXT_PUBLIC_DATA_AD_CLIENT}`}
            data-ad-slot={`${process.env.NEXT_PUBLIC_AD_SLOT}`}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
}