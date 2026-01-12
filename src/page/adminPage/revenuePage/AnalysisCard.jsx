import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function AnalysisCard(data) {
    const item = data.data
    let Arrow = null
    if (item.trend === "up"){
        Arrow = ArrowUp;
    } else {
        Arrow = ArrowDown;
    }
    return (
    <Card className="w-130 ">
        <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardAction>
                <Badge variant="outline"><Arrow /><p>{item.percentChange} %</p></Badge>
            </CardAction>
        </CardHeader>
        <CardContent>
            <h2>{item.current} {item.Classifier}</h2>
        </CardContent>
        <CardFooter>
            <p>This month vs last</p>
        </CardFooter>
    </Card>
    )
}