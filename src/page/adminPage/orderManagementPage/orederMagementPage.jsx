import { orders } from "../../../mock-data/ordersData";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderManagementPage() {

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
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-cream hover:bg-cream/50">
                <td className="p-4 font-mono">{order.order_code}</td>
                <td className="p-4">{order.user_id}</td>
                <td className="p-4">฿{order.summary.grandTotal.toLocaleString()}</td>
                <td className="p-4">
                <OrderStatusBadge status={order.delivery.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
