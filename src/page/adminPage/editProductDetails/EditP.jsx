import { useState } from "react";
import { useParams } from "react-router-dom";
import { teaProducts } from "@/mock-data/teaData";

export default function EditP() {
    const { id } = useParams();

    const product = teaProducts.find(
        (p) => p.id === Number(id)
    );

    const [form, setForm] = useState(() => {
        if (!product) return null;

        return {
            name: product.name,
            M_gram: product.sizes.M.gram,
            M_price: product.sizes.M.price,
            L_gram: product.sizes.L.gram,
            L_price: product.sizes.L.price,
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log("SAVE DATA 👉", form);
        alert("Saved! (ดู console)");
    };

    return (
        <div className="max-w-5xl mx-auto py-12">
            <h1 className="font-semibold mb-8 mt-2">Edit Product</h1>

            <div className="relative w-32 mx-auto">
                <img
                    src={product.img}
                    alt={product.name}
                    className="mt-10 w-30 h-30 rounded-full border object-cover"
                />
                <button
                    type="button"
                    className="absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800 hover:text-white"
                >
                    📷
                </button>
            </div>

            {/* form */}
            <form className="mt-20 space-y-8">

                {/* name */}
                <div>
                    <label className="text-sm font-semibold">Product Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
                    />
                </div>

                {/* size M */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold">Size M (gram)</label>
                        <input
                            name="M_gram"
                            value={form.M_gram}
                            onChange={handleChange}
                            type="number"
                            className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Price M</label>
                        <input
                            name="M_price"
                            value={form.M_price}
                            onChange={handleChange}
                            type="number"
                            className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
                        />
                    </div>
                </div>

                {/* size L */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold">Size L (gram)</label>
                        <input
                            name="L_gram"
                            value={form.L_gram}
                            onChange={handleChange}
                            type="number"
                            className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Price L</label>
                        <input
                            name="L_price"
                            value={form.L_price}
                            onChange={handleChange}
                            type="number"
                            className="w-full mt-2 p-2 rounded-3xl bg-[#F2EDE4]"
                        />
                    </div>
                </div>

                {/* buttons */}
                <div className="flex gap-4 justify-center pt-6">
                    <button
                        type="button"
                        className="px-16 py-1.5 bg-[#d8d8d8] rounded-4xl hover:bg-amber-800 hover:text-white"
                    >
                        EDIT
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-16 py-1.5 bg-[#d8d8d8] rounded-4xl hover:bg-amber-800 hover:text-white"
                    >
                        SAVE
                    </button>
                </div>
            </form>
        </div>
    );
}
