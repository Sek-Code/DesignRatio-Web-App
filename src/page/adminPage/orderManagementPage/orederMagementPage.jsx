
import { useEffect } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { useOrderStore } from "@/store/orderStore";


export default function OrderManagementPage() {

const { orders,  loadOrders } = useOrderStore();

useEffect(() => {
const timer = setTimeout(() => {
    loadOrders();
  }, 200); // delay 200ms
  return () => clearTimeout(timer);
}, []);

console.log(orders)
  return (
    <div className="w-full p-6 bg-lightCream min-h-screen">
      <h1 className="text-3xl font-display text-brown mb-6">Order Management</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-left text-brown">
          <thead className="bg-cream">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Order Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => (
              <tr key={orders._id} className="border-b border-cream hover:bg-cream/50">
                <td className="p-4 font-mono">{orders.order_no}</td>
                <td className="p-4">{new Date(orders.createdAt).toLocaleDateString()}</td>
                <td className="p-4">฿{orders.grandTotal.toLocaleString()}</td>
                <td className="p-4">
                <OrderStatusBadge status={orders.status_order.delivery_status} />
                </td>
                <td className="p-4"> {orders.order_items.map(item => `${item.name} size ${item.size} x${item.quantity}`).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
