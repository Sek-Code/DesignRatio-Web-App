import { useEffect } from "react";
import { TrashIcon, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";

export default function ProductTable() {
  const navigate = useNavigate();
  const { products, loading, loadProducts, removeProduct } = useProductStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await removeProduct(id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="py-3 rounded-lg">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="text-[#9e9957]">
          <tr className="text-center font-bold">
            <th className="p-2">Product Name</th>
            <th className="p-2">Size</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => {
              // Get M and L variants
              const m = product.variants?.find(v => v.size === "M");
              const l = product.variants?.find(v => v.size === "L");

              return (
                <tr key={product._id} className="bg-[#f3ece3] text-center h-full">
                  <td className="h-14 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <span className="inline-block text-left w-40 break-all">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="text-left">
                    {m && l ? `M, L` : m ? `M` : l ? `L` : `-`}
                  </td>
                  <td className="pr-3">
                    {m && l ? `฿${m.price} / ฿${l.price}` : m ? `฿${m.price}` : l ? `฿${l.price}` : `-`}
                  </td>
                  <td>
                    <div className="gap-1 flex justify-center items-center h-full">
                      <button
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        className="hover:text-orange-600 transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="hover:text-red-600 transition"
                        title="Delete"
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-500">
                product not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
