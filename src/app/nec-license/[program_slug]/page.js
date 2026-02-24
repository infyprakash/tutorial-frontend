import { fetchNecData } from "@/app/fetchApi";
import TableOfContent from "@/app/components/nec/tableofContent";
import AdsenseAd from "@/app/components/AdsenseAd";

export async function generateMetadata({ params }) {
    const { program_slug } = await params;
    const response = await fetchNecData(`program/${program_slug}`);
    const course = await response.json();

    return {
        title: `${course.name} Notes | IOE Nepal Syllabus`,
        description: course.description,
        keywords: [
            course.name,
            "IOE Nepal syllabus",
            "Engineering notes",
            `${course.name} tutorial`,
        ],
        openGraph: {
            title: `${course.name} | IOE Notes`,
            description: course.description,
            url: `${process.env.NEXT_PUBLIC_HOST}nec-license/${program_slug}`,
            siteName: "ezexplanation",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: course.name,
            description: course.description,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_HOST}nec-license/${program_slug}`,
        },
    };
}

export default async function ProgramDetail({ params }) {
    const { program_slug } = await params;
    const response = await fetchNecData(`program/${program_slug}`);
    const data = await response.json();

    const response2 = await fetchNecData(`program/${program_slug}`);
    const course = await response2.json();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.name,
        description: course.description,
        provider: {
            "@type": "Organization",
            name: "ezexplanation",
            sameAs: `${process.env.NEXT_PUBLIC_HOST}`,
        },
    };

    return (<div>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mb-8">
            <AdsenseAd />
        </div>
        <TableOfContent data={data} program_slug={program_slug} />
        <div className="mt-12">
            <AdsenseAd />
        </div>
    </div>)
}