import AddressBox from "./AddressBox";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cartData } from "@/mock-data/cartData";
import { teaProducts } from "@/mock-data/teaData.js";
import { teaBaseProducts } from "@/mock-data/teaBaseProducts.js";
import { ingredientProducts } from "@/mock-data/ingredientProducts.js";

const teaProductsMap = new Map(teaProducts.map(p => [p.id, p]));
const teaBaseProductsMap = new Map(teaBaseProducts.map(p => [p._id, p]));
const ingredientProductsMap = new Map(ingredientProducts.map(p => [p._id, p]));

const initialItems = cartData.items.map(item => {
  if (item.product_type === "ready") {
    const product = teaProductsMap.get(item.product_id);
    const size = item.variant_id.split('_')[2];
    return {
      item_id: item.item_id,
      name: product ? product.name : "Unknown Product",
      size: `Size: ${size}`,
      price: item.unit_price,
      qty: item.quantity,
    };
  } else if (item.product_type === "custom") {
    const teaBase = teaBaseProductsMap.get(item.product_id);
    const size = item.variant_id.split('_')[2];
    const ingredients = item.selected_ingredient_ids.map(id => ingredientProductsMap.get(id)?.name).join(', ');
    return {
      item_id: item.item_id,
      name: "Custom Blend",
      size: `${teaBase ? teaBase.name : 'Unknown Base'} (${size}) with ${ingredients}`,
      price: item.unit_price,
      qty: item.quantity,
    };
  }
  return null;
}).filter(Boolean);


export default function Checkout() {
  const [items, setItems] = useState(initialItems);

  const updateQty = (item_id, delta) => {
    setItems((prev) =>
      prev.map((it) =>
        it.item_id === item_id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );
  };
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 50;

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-8">
      <h1 className="text-4xl font-semibold text-[#4a2a0a] mb-6">Checkout</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.item_id} className="rounded-2xl shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-16 h-16 bg-white rounded-xl" />
              <div className="flex-1">
                <p className="font-semibold text-[#4a2a0a]">{item.name}</p>
                <p className="text-sm text-[#7a5a3a]">{item.size}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" onClick={() => updateQty(item.item_id, -1)}>-</Button>
                <span>{item.qty}</span>
                <Button size="icon" onClick={() => updateQty(item.item_id, 1)}>+</Button>
              </div>
              <p className="w-20 text-right text-[#4a2a0a]">{item.price} บาท</p>
              <Button variant="ghost">🗑</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddressBox />

        <Card className="rounded-2xl shadow-md bg-[#4a2a0a] text-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <span>Shopping Cart</span>
              <span>{items.length} items</span>
            </div>
            <div className="flex justify-between"><span>Subtotal</span><span>{subtotal} บาท</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{delivery} บาท</span></div>
            <hr className="border-white/30" />
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{subtotal + delivery} บาท</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-8">
        <Button className="rounded-full px-10">Next</Button>
      </div>
    </div>
  );
}
