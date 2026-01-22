import { Button } from "@/components/ui/button";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";

export default function ProductPage() {
    return (
        <div className="w-full px-[7%] py-12">
            <div className="w-full flex justify-between items-center">
            <h1>Products</h1>
            <Link to="/admin/products/add-product">
            <Button variant="default">Add Product</Button>
            </Link>
            </div>
            <ProductTable/>
        </div>
    )
}
