import { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { useOrderStore } from "@/store/orderStore";

export default function Checkout() {
  const navigate = useNavigate();
  const {currentUser, loading}  = useUserStore()
  const {addOrder} = useOrderStore()
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("delivery_a");
  const [selectedPayment, setSelectedPayment] = useState("creditcard");

  console.log(currentUser)



  // Transform cartItems - handle both ready and custom products
  const items = cartItems.map((item) => {
    let price = 0;
    
    if (item.product.type === 'custom') {
      // Custom product - has price directly
      price = item.product.price || 0;
    } else {
      // Ready product - find price by variant size
      price = item.product.variants?.find(v => v.size === item.size)?.price || 0;
    }
    
    return {
      id: item.id,
      name: item.product.name,
      price,
      qty: item.quantity,
      size: item.size,
      type: item.product.type,
      ingredients: item.product.ingredientNames, // สำหรับ custom
      product: item.product,
    };
  });

  const updateItemQty = (id, delta) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem && currentItem.quantity + delta > 0) {
      updateQty(id, currentItem.quantity + delta);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const deliveryFee = selectedDelivery === "delivery_a" ? 50 : selectedDelivery === "delivery_b" ? 100 : 180;
  const totalPrice = getTotalPrice() + deliveryFee;

  const handleCheckout = async () => {
    
    if (!currentUser?._id) {
  navigate("/signin");
  return;
}

    
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    const data = {
  user_id: currentUser._id,

  order_items: items.map(item => ({
    product_id: item.product._id || item.id,
    type: item.type,
    name: item.name,
    size: item.size,
    quantity: item.qty,

    bases: item.type === "custom"
      ? [{ name: item.product.teaBase }]
      : [],

    ingredients: item.type === "custom"
      ? item.product.ingredients.map((ing, i) => ({
          component_id: `${i}`,
          name: item.ingredients[i],
          category: ing.split("-")[0],
        }))
      : [],

    ingredients_total_price: item.price
  })),

  delivery_option: {
    delivery_id: selectedDelivery,
    name:
      selectedDelivery === "delivery_a"
        ? "Delivery A"
        : selectedDelivery === "delivery_b"
        ? "Delivery B"
        : "Delivery C",
  },

  payment_option: {
    method:
      selectedPayment === "creditcard"
        ? "Credit Card"
        : "QR Code",
  },

  grandTotal: totalPrice,
};

    
    
    console.log("Checking out with:", { items, address: selectedAddress, delivery: selectedDelivery, payment: selectedPayment });

    try {
  await addOrder(data);
  alert("Order placed!");
  clearCart();
} catch (err) {
  console.error(err);
  alert("Order failed");
}

    
 
  
    
  };

  return (
    <div className="w-full px-4 py-8 lg:px-12 bg-white min-h-screen">
      <h1 className="text-3xl lg:text-5xl font-bold text-center text-[#411D03] mb-8">Checkout</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cart Items + Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="bg-(--color-cream) rounded-lg p-8 text-center text-gray-500">
                Your cart is empty
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 border-2 border-(--color-brown)"
                >
                  <div className="flex items-center gap-4">
                    {/* Product Image Placeholder */}
                    <div className="w-20 h-20 bg-gray-200 rounded shrink-0"></div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#411D03]">{item.name}</h3>
                      {item.type === 'custom' && item.ingredients && (
                        <p className="text-xs text-gray-600">
                          Ingredients: {item.ingredients.join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">{item.price} THB</p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateItemQty(item.id, -1)}
                        className="flex items-center justify-center w-7 h-7 rounded-full border border-[#411D03] text-[#411D03] hover:bg-[#411D03] hover:text-white transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateItemQty(item.id, 1)}
                        className="flex items-center justify-center w-7 h-7 rounded-full border border-[#411D03] text-[#411D03] hover:bg-[#411D03] hover:text-white transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price & Delete */}
                    <div className="text-right flex flex-col items-center shrink-0">
                      <p className="font-semibold text-[#411D03] text-lg">{item.price * item.qty} THB</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#411D03] hover:text-[#5a2b04] transition mt-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Address Section */}
          <div className="bg-white rounded-lg p-6">
            <label className="block font-semibold text-[#411D03] mb-3">Address :</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#411D03]"
            />
          </div>

          {/* Delivery & Payment */}
          <div className="bg-white rounded-lg pl-6 space-y-6">
            {/* Delivery Options */}
            <div>
              <label className="block font-semibold text-[#411D03] mb-3">Delivery :</label>
              <div className="space-y-2">
                {[
                  { id: "delivery_a", label: "Post Thailand + 50 THB", fee: 50 },
                  { id: "delivery_b", label: "KEX + 100 THB", fee: 100 },
                  { id: "delivery_c", label: "Flash + 180 THB", fee: 180 },
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={selectedDelivery === option.id}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-[#411D03]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-semibold text-[#411D03] mb-3">Payment method :</label>
              <div className="space-y-2">
                {[
                  { id: "creditcard", label: "Credit card" },
                  { id: "qrcode", label: "QR code" },
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPayment === option.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-[#411D03]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#411D03] text-white rounded-lg p-6 space-y-4 sticky top-20">
            <h2 className="font-bold text-lg">Shopping Cart</h2>
            <p className="text-sm text-gray-300">{items.length} items</p>

            <div className="border-t border-white/30 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{getTotalPrice()} THB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span>{deliveryFee} THB</span>
              </div>
            </div>

            <div className="border-t border-white/30 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{totalPrice} THB</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-white text-[#411D03] font-bold py-3 rounded-lg hover:bg-gray-100 transition mt-4"
            >
              {loading ? "Placing order..." :"Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
