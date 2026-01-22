import MonthAnalysis from "./MonthAnalysis"
import GraphAnalysis from "./GraphAnalysis"
export default function RevenuePage() {
    return (
        <div className="w-full px-10 py-10 lg:px-37.5">
        <MonthAnalysis/>
        <GraphAnalysis/>
        </div>
    )
}