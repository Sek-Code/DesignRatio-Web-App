import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { uploadProductImage } from "@/api/productApi";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, editProduct, loadProducts, loading } = useProductStore();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    productName: "",
    productSize: "",
    productPrice: "",
    imageUrl: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!products.length) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  useEffect(() => {
    const product = products.find((p) => p._id === id);

    if (product) {
      const firstVariant = Array.isArray(product.variants) ? product.variants[0] : null;

      setFormData({
        productName: product.name || "",
        productSize: firstVariant?.size || "",
        productPrice:
          firstVariant?.price !== undefined && firstVariant?.price !== null
            ? String(firstVariant.price)
            : "",
        imageUrl: product.image || "",
      });
    }
  }, [products, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(false);
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setIsUploadingImage(true);

    try {
      const uploaded = await uploadProductImage(file);
      setFormData((prev) => ({
        ...prev,
        imageUrl: uploaded?.url || "",
      }));
    } catch (err) {
      setError(err?.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
      // allow re-selecting same file
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      setError("Product name is required");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Note: backend supports partial PATCH; here we update image + basic fields
      const payload = {
        name: formData.productName.trim(),
        size: formData.productSize.trim(),
        price:
          formData.productPrice !== "" && !Number.isNaN(Number(formData.productPrice))
            ? Number(formData.productPrice)
            : undefined,
        imageUrl: formData.imageUrl?.trim() || "",
      };

      // remove undefined keys
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      await editProduct(id, payload);

      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/edit-products");
      }, 1200);
    } catch (err) {
      setError(err?.message || "Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    const product = products.find((p) => p._id === id);
    if (product) {
      const firstVariant = Array.isArray(product.variants) ? product.variants[0] : null;

      setFormData({
        productName: product.name || "",
        productSize: firstVariant?.size || "",
        productPrice:
          firstVariant?.price !== undefined && firstVariant?.price !== null
            ? String(firstVariant.price)
            : "",
        imageUrl: product.image || "",
      });
    }

    setError(null);
    setSuccess(false);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <div>Loading product data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <button
        onClick={() => navigate(`/admin/edit-products`)}
        className="flex items-center gap-2 hover:text-amber-800 transition mb-6"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="relative w-32 mx-auto">
        <div className="mt-10 w-32 h-32 rounded-full border-4 border-amber-800 bg-gray-100 flex items-center justify-center overflow-hidden">
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt={formData.productName || "Product"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelected}
          className="hidden"
        />

        <button
          type="button"
          onClick={handlePickImage}
          disabled={isUploadingImage}
          className="absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800 hover:text-white disabled:opacity-50"
          aria-label="Change product image"
          title="Change product image"
        >
          <Pencil size={16} />
        </button>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>
      )}

      {success && (
        <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-lg text-center">
          Product updated successfully! Redirecting...
        </div>
      )}

      <form className="mt-20 space-y-6" onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="text-sm font-medium">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Size:</label>
            <input
              type="text"
              name="productSize"
              value={formData.productSize}
              onChange={handleInputChange}
              placeholder="Enter size"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price:</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <button
            type="submit"
            disabled={isSaving || isUploadingImage}
            className="button-style px-16 py-1.5 bg-amber-800 text-white rounded-3xl hover:bg-amber-900 transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
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
