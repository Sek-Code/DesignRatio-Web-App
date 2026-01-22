import { useState } from "react";
import { useParams } from "react-router-dom";
import { readyProducts } from "@/mock-data/readyProducts";

export default function EditP() {
    const { id } = useParams();

    const product = readyProducts.find(
        (p) => String(p._id) === String(id)
    );
        if (!product) {
            return <div className="text-center py-20">❌ ไม่พบสินค้า</div>;
        }
        console.log("PARAM ID 👉", id);
console.log("READY PRODUCTS 👉", readyProducts.map(p => p._id));



        const m = product.variants.find(v => v.size === "M");
        const l = product.variants.find(v => v.size === "L");


    const [form, setForm] = useState(() => ({
        name: product.name,
        M_gram: m?.gram ?? "",
        M_price: m?.price ?? "",
        L_gram: l?.gram ?? "",
        L_price: l?.price ?? "",
    }));


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const updated = {
            ...product,
            name: form.name,
            variants: product.variants.map(v => {
                if (v.size === "M") {
                    return { ...v, gram: Number(form.M_gram), price: Number(form.M_price) };
                }
                if (v.size === "L") {
                    return { ...v, gram: Number(form.L_gram), price: Number(form.L_price) };
                }
                return v;
            })
        };

        console.log("SAVE DATA 👉", updated);
    };


    return (
        <div className="max-w-5xl mx-auto py-12">
            <h1 className="font-semibold mb-4 mt-2">Edit Product</h1>

            <div className="relative w-50 mx-auto">
                <img
                    src={product.image}
                    alt={product.name}
                    className="mt-5 w-50 h-50 rounded-full border object-cover"
                />
                <button
                    type="button"
                    className="absolute bottom-1 right-1 bg-white border p-1 rounded-full shadow hover:bg-amber-800 hover:text-white"
                >
                    📷
                </button>
            </div>

            {/* form */}
            <form className="mt-5 space-y-8">

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
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-16 py-1.5 bg-[#d8d8d8] rounded-4xl hover:bg-amber-800 hover:text-white"
                    >
                        DELETE
                    </button>
                </div>
            </form>
        </div>
    );
}
