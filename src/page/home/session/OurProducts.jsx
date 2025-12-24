import { Button } from "@/components/ui/button"
import CardScreen from "@/components/ui/card/CardScreen"
import { Link } from "react-router-dom"


export default function OurProduct() {
    return (
        <div className="justify-center items-center flex flex-col">
            <h1 className ="h1-style py-12 text-[#9e9957]">Our Products</h1>
            <div className="flex flex-wrap justify-center mx-120">
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
                <CardScreen></CardScreen>
            </div>
            <Link
                to="/products"
                className="hover:text-[(--matcha-color)] transition-colors">
                <Button variant="default"  >
                    See more
                </Button>
            </Link>
        </div>
    )
}