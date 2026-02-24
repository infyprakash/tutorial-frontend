import { fetchNecData } from "@/app/fetchApi";
import NecSidebar from "@/app/components/nec/sidebar";
import McqContent from "@/app/components/nec/mcqContent";


export default async function ContentPage({ params }) {
    const { program_slug, subchapter_slug } = await params;
    const program_response = await fetchNecData(`program/${program_slug}`);
    const program = await program_response.json();

    const response = await fetchNecData(`subchapter/${subchapter_slug}`);
    const content = await response.json();

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <NecSidebar program={program} program_slug={program_slug} />
            <McqContent content={content} />
        </div>
    );
}