import { fetchNecData } from "../fetchApi";
import ProgramList from "../components/nec/programlist";
import AdsenseAd from "../components/AdsenseAd";

export default async function NecLicense() {
    const response = await fetchNecData("program");
    const programs = await response.json();
    console.log(programs);
    return (
        <div>
            <div className="mb-8">
                <AdsenseAd />
            </div>
            <ProgramList programs={programs} />
        </div>
    )
}