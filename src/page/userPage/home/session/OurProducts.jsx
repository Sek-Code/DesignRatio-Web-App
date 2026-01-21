import { Button } from "@/components/ui/button"
import { useProducts } from "@/components/ui/card/apiCard"
import CardScreen from "@/components/ui/card/cardScreen"
import { Link } from "react-router-dom"


export default function OurProduct() {
    const products = useProducts()
    const productSection = products.slice(0, 6)
    //console.log(productSection)

    return (
        <div className=" w-full flex-col justify-center px-10 py-10 lg:px-37.5">
            <h1 className="lg:text-6xl lg:mb-5 mt-10 py-5 text-(--color-matcha) text-center">Our Products</h1>
            <div className="w-full">
                <CardScreen  product={productSection} className="lg:flex flex-col justify-center" />
            </div>
            <Link
                to="/products"
                className="hover:text-(--color-matcha) transition-colors flex justify-center mb-20 mt-10">
                <Button className="cursor-pointer px-10 py-2 rounded-4xl lg:text-xl lg:py-6 lg:px-15 lg:rounded-[30px] hover:bg-(--color-matcha)">
                    See more
                </Button>
            </Link>
        </div>
    )
}