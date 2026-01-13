import CardScreen from "@/components/ui/card/cardScreen";
import { useNavigate } from "react-router-dom";

export default function EditDetailProduct(){

    const navigate = useNavigate();

    return(
        <div>
            <CardScreen
                onCardClick ={(product) => navigate(`/admin/edit-product/${product.id}`)}/>
        </div>
    );
}