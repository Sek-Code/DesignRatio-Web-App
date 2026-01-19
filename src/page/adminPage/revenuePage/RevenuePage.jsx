import MonthAnalysis from "./MonthAnalysis"
import GraphAnalysis from "./GraphAnalysis"
export default function RevenuePage() {
    return (
        <div className="w-full px-[3%] py-12">
        <MonthAnalysis/>
        <GraphAnalysis/>
        </div>
    )
}