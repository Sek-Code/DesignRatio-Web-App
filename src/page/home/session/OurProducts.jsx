import { Button } from "@/components/ui/button"
import { useProducts } from "@/components/ui/card/apiCard"
import CardScreen from "@/components/ui/card/CardScreen"
import { Link } from "react-router-dom"


export default function OurProduct() {
    const products = useProducts()
    const productSection = products.slice(0, 6)
    //console.log(productSection)
    
    return (
        <div className=" w-full px-[15%] flex-col items-center">
            <h1 className="h1-style py-12 text-[#9e9957] text-center">Our Products</h1>
            <div className="w-full  mb-11 flex">
                <CardScreen  product={productSection}/>
                
            </div>
            <Link
                to="/products"
                className="hover:text-[(--matcha-color)] transition-colors flex justify-center mb-16">
                <Button variant="default"  >
                    See more
                </Button>
            </Link>
        </div>
    )
}