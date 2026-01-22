import { useEffect } from "react";
import { TrashIcon, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";

export default function ProductTable() {
  const navigate = useNavigate();
  // ดึง functions และ state จาก store (loadUsers เรียก GET, removeUser เรียก DELETE)
  const { products, loading, loadProducts, removeProduct } = useProductStore();

  // API Call #1: ดึงข้อมูลสินค้าทั้งหมด (GET /api/v2/products/)
  // ทำงาน: เมื่อ component mount แรกครั้ง เรียก loadProducts() เพื่อดึงรายชื่อสินค้า
  useEffect(() => {
  const timer = setTimeout(() => {
    loadProducts();
  }, 200); // delay 200ms
  return () => clearTimeout(timer);
}, []);


  // API Call #2: ลบสินค้า (DELETE /api/v2/product/:id)
  // ทำงาน: กดปุ่มลบ → แสดง confirm dialog → เรียก removeProduct(id) เพื่อลบสินค้า
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      // ← API DELETE ถูกเรียกที่นี่ผ่าน removeProduct() function
      await removeProduct(id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="py-3">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="text-[#9e9957]">
          <tr className="text-center font-bold">
            <th className="p-2">Date Added</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Size</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {/* แสดงรายการสมาชิกจากข้อมูล API ที่ดึงมา */}
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="bg-[#f3ece3] text-center h-full">
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className="h-14 flex items-center justify-center">
                  <span className="inline-block text-left w-40 break-all">
                    {product.productName} {product.productLast}
                  </span>
                </td>
                <td className="text-left">{product.email}</td>
                <td className="pr-3">{product.phoneNumber}</td>
                <td>{product.role}</td>
                <td >
                  <div className="gap-1 flex justify-center items-center h-full">
                  {/* ปุ่มแก้ไข - ไปหน้า EditMember (ไม่เรียก API ตรงนี้) */}
                  <button
                    onClick={() => navigate(`/admin/members/${product._id}`)}
                    className="hover:text-orange-600 transition"
                  >
                    <Edit />
                  </button>
                  {/* ปุ่มลบ - เรียก DELETE API */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="hover:text-red-600 transition"
                  >
                    <TrashIcon />
                  </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                Product not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
