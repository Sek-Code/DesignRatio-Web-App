import AddressBox from "./AddressBox";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export default function Checkout() {
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // แปลง cart items เป็น checkout format
    const checkoutItems = cartItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      size: `Size: ${item.size}`,
      price: item.product.sizes?.[item.size]?.price || item.product.price,
      qty: item.quantity,
      product: item.product,
      selectedSize: item.size,
    }));
    setItems(checkoutItems);
  }, [cartItems]);

  const updateItemQty = (id, delta) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      updateQty(id, currentItem.quantity + delta);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }
    // TODO: ส่ง order ไป backend
    console.log("Checking out with items:", items);
    alert("Order placed!");
    clearCart();
  };

  return (
    <div className="w-full px-10 py-10 lg:px-37.5">
      <h1 className="lg:py-12 mb-6 lg:text-6xl text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items List */}
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.size}</p>
                      <p className="text-sm font-semibold">{item.price} baht</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateItemQty(item.id, -1)}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateItemQty(item.id, 1)}
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{getTotalPrice()} baht</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>TBD</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{getTotalPrice()} baht</span>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#411D03] text-white"
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddressBox />
    </div>
  );
}
