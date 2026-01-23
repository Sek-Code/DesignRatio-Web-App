import { useReadyProducts } from "@/components/ui/card/apiCard";
import CardScreen from "@/components/ui/card/cardScreen";


export default function OurProduct() {
    const products = useReadyProducts()

    return (
        <div className=" w-full flex-col justify-center px-10 py-10 lg:px-37.5">
            <h1 className="lg:py-12 mb-6 lg:text-6xl text-center">Products</h1>
            <div className="w-full mb-11 flex justify-start">
                <CardScreen  product={products}/>
            </div>
        </div>
    )
}