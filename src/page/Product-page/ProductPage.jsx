
import { useProducts } from "@/components/ui/card/apiCard";
import CardScreen from "@/components/ui/card/CardScreen";


export default function OurProduct() {
    const products = useProducts()
    
    
    
    return (
        <div className=" w-full px-[15%] flex-col items-center">
            <h1 className="h1-style py-12  ">Products</h1>
            <div className="w-full  mb-11 flex">
                <CardScreen  product={products}/>
                
            </div>
           
        </div>
    )
}