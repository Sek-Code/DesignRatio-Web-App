import Analysiscard from "./AnalysisCard"
import { monthlySalesAnalysis  } from "@/mock-data/revenueMockData.js"

export default function MonthAnalysis() {
    const data = monthlySalesAnalysis
    return (
        <div >
            <div className="w-full flex  flex-wrap justify-around items-center gap-5">    
                {data.map((item)=><Analysiscard key={item.name} data={item}/>)}
            </div>
        </div>
    )
}