import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProductStore } from "@/store/productStore";

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct, loading } = useProductStore();

  const [formData, setFormData] = useState({
    productName: "",
    productSize: "",
    productPrice: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validation

    if (!formData.productName.trim()) {
      setError("Product name are required");
      return;
    }

    if (!formData.productSize.trim()) {
      setError("Size is required");
      return;
    }

    if (!formData.productPrice.trim()) {
      setError("Price product is required");
      return;
    }

    try {
      // ← API PATCH ถูกเรียกที่นี่ผ่าน editUser() function
      const { confirmPassword: _, ...data } = formData;

      await addProduct(data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/edit-products");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create product");
    }
  };

  const handleClear = () => {
    setFormData({
      productName: "",
      productSize: "",
      productPrice: "",
    });

    setError(null);
    setSuccess(false);
  };

  return (
    <div className="w-full mx-auto py-12">
      <button
        onClick={() => navigate(`/admin/edit-products`)}
        className="flex items-center gap-2 hover:text-amber-800 transition mb-6 mx-20"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="relative w-32 mx-auto">
        <div className="mt-10 w-32 h-32 rounded-full border-4 border-amber-800 bg-gray-100 flex items-center justify-center overflow-hidden">
          <span className="text-gray-400">No Image</span>
        </div>
        <button
          type="button"
          className="absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800 hover:text-white"
        >
          ���
        </button>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Product created successfully! Redirecting...
        </div>
      )}

      <form className="mt-20 mx-20 space-y-6" onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="text-sm font-medium">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter name product"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="text-sm font-medium">Size:</label>
            <input
              type="text"
              name="productSize"
              value={formData.productSize}
              onChange={handleInputChange}
              placeholder="Enter size product"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="text-sm font-medium">Price:</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInputChange}
              placeholder="Enter price product"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="w-full flex gap-4 justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="button-style px-16 py-1.5 bg-amber-800 text-white rounded-3xl hover:bg-amber-900 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="button-style px-16 py-1.5 bg-gray-400 text-white rounded-3xl hover:bg-gray-500 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
