import { Button } from "@/components/ui/button";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";

export default function ProductPagePage() {
    return (
        <div className="w-full px-10 py-10 mb-10 relative z-10 lg:px-37.5">
            <div className="w-full flex justify-between items-center mb-6">
                <h1>Products</h1>
                <Link to="/admin/edit-products/add-product">
                    <Button variant="default" className="cursor-pointer">Add Product</Button>
                </Link>
            </div>
            <ProductTable />
        </div>
    );
}

