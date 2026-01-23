import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { uploadProductImage } from "@/api/productApi";

const toRefName = ({ name, type, size, gram }) => {
  const safeName = String(name || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^A-Za-z0-9]/g, "");

  const typePart = String(type || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  const typeTitle = typePart ? typePart[0].toUpperCase() + typePart.slice(1) : "";

  const variantPart =
    typePart === "ready"
      ? String(size || "").trim().toUpperCase()
      : String(gram ?? "").trim();

  return `${safeName}_${typeTitle}_${variantPart || "DEF"}`;
};

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    productType: "ready",
    productName: "",
    productSize: "",
    productGram: "",
    productPrice: "",
    productStock: "0",
    imageUrl: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset dependents when switching type
    if (name === "productType") {
      setFormData((prev) => ({
        ...prev,
        productType: value,
        productSize: "",
        productGram: "",
      }));
    }

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
      const apiMsg = err?.response?.data?.message;
      setError(apiMsg || err?.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const name = formData.productName.trim();
    const type = formData.productType;

    if (!name) {
      setError("Product name is required");
      return;
    }

    if (!type) {
      setError("Product type is required");
      return;
    }

    const price = Number(formData.productPrice);
    if (formData.productPrice === "" || Number.isNaN(price) || price < 0) {
      setError("Valid price is required");
      return;
    }

    const stock = Number(formData.productStock);
    if (formData.productStock === "" || Number.isNaN(stock) || stock < 0) {
      setError("Valid stock is required");
      return;
    }

    const size = type === "ready" ? formData.productSize.trim() : "";
    const gram = type !== "ready" ? Number(formData.productGram) : undefined;

    if (type === "ready" && !size) {
      setError("Size is required for ready products");
      return;
    }

    if (type !== "ready") {
      if (formData.productGram === "" || Number.isNaN(gram) || gram <= 0) {
        setError("Gram is required for ingredient/teabase");
        return;
      }
    }

    const referencename = toRefName({ name, type, size, gram });

    const payload = {
      name,
      type,
      price,
      stock_count: stock,
      size: type === "ready" ? size : undefined,
      gram: type !== "ready" ? gram : undefined,
      imageUrl: formData.imageUrl?.trim() || "",
      referencename,
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    setIsSaving(true);
    setError(null);

    try {
      await addProduct(payload);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/edit-products");
      }, 1200);
    } catch (err) {
      const apiMsg = err?.response?.data?.message;
      setError(apiMsg || err?.message || "Failed to create product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setFormData({
      productType: "ready",
      productName: "",
      productSize: "",
      productGram: "",
      productPrice: "",
      productStock: "0",
      imageUrl: "",
    });

    setError(null);
    setSuccess(false);
  };

  return (
    <div className="w-full mx-auto py-12 lg:px-37.5">
      <button
        onClick={() => navigate(`/admin/edit-products`)}
        className="cursor-pointer flex items-center gap-2 hover:text-(--color-brown) transition mb-6 mx-20"
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
          Product created successfully! Redirecting...
        </div>
      )}

      <form className="mt-20 mx-20 space-y-6" onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Product Type:</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
            >
              <option value="ready">Ready</option>
              <option value="ingredient">Ingredient</option>
              <option value="teabase">Tea Base</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Stock:</label>
            <input
              type="number"
              name="productStock"
              value={formData.productStock}
              onChange={handleInputChange}
              min={0}
              placeholder="Enter stock"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="lg:text-xl font-medium">Product Name:</label>
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

        {formData.productType === "ready" ? (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label className="text-sm font-medium">Size:</label>
              <input
                type="text"
                name="productSize"
                value={formData.productSize}
                onChange={handleInputChange}
                placeholder="Enter size (S/M/L)"
                className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
                required
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label className="text-sm font-medium">Gram:</label>
              <input
                type="number"
                name="productGram"
                value={formData.productGram}
                onChange={handleInputChange}
                min={1}
                placeholder="Enter gram (e.g. 50, 100)"
                className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
                required
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="lg:text-xl font-medium">Price:</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInputChange}
              min={0}
              placeholder="Enter price"
              className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4] border border-transparent focus:outline-none focus:border-amber-800"
              required
            />
          </div>
        </div>

        <div className="w-full flex gap-4 justify-center pt-4">
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
