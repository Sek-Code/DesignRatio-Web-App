import CardScreen from "@/components/ui/card/cardScreen";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore";

export default function EditDetailProduct(){
    const navigate = useNavigate();
    const { products, loadProducts } = useProductStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            await loadProducts();
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-20">⏳ Loading products...</div>;
    }

    return(
        <div>
            <CardScreen
                product={products}
                onCardClick={(product) => navigate(`/admin/edit-product/${product._id}`)}
            />
        </div>
    );
}
