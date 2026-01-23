import { useEffect, useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { useOrderStore } from "@/store/orderStore";

const paymentLabel = {
  pending: "ยังไม่จ่าย",
  paid: "จ่ายแล้ว",
  failed: "จ่ายไม่สำเร็จ",
};

export default function OrderManagementPage() {
  const { orders, loadOrders, updatePaymentStatus, deleteOrder, loading, error } =
    useOrderStore();

  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomerName = (order) => {
    const u = order?.user_id;
    const full = [u?.userName, u?.userLast].filter(Boolean).join(" ").trim();
    return full || u?.email || "-";
  };

  const handleChangePayment = async (orderId, nextStatus) => {
    setSavingId(orderId);
    try {
      await updatePaymentStatus(orderId, nextStatus);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (order) => {
    const ok = window.confirm(
      `ลบออเดอร์ ${order?.order_no || ""} ใช่ไหม? (ลบแล้วกู้คืนไม่ได้)`
    );
    if (!ok) return;

    setDeletingId(order?._id);
    try {
      await deleteOrder(order._id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full p-6 min-h-screen px-10 py-10 lg:px-37.5">
      <h1 className="lg:text-4xl text-(--color-brown) mb-6">Order Management</h1>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-left text-brown bg-(--color-light-cream)">
          <thead className="bg-cream">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Delivery</th>
              <th className="p-4 font-semibold">Payment</th>
              <th className="p-4 font-semibold">Order Detail</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const paymentStatus = order?.status_order?.payment_status || "pending";
              const isSaving = savingId === order._id;
              const isDeleting = deletingId === order._id;

              return (
                <tr key={order._id} className="border-b border-cream hover:bg-cream/50">
                  <td className="p-4 font-mono">{order.order_no}</td>
                  <td className="p-4">{getCustomerName(order)}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">฿{order.grandTotal.toLocaleString()}</td>

                  <td className="p-4">
                    <OrderStatusBadge status={order.status_order?.delivery_status} />
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <select
                        className="border border-cream rounded px-2 py-1 bg-white"
                        value={paymentStatus}
                        disabled={isSaving || isDeleting}
                        onChange={(e) => handleChangePayment(order._id, e.target.value)}
                      >
                        <option value="pending">{paymentLabel.pending}</option>
                        <option value="paid">{paymentLabel.paid}</option>
                        <option value="failed">{paymentLabel.failed}</option>
                      </select>
                      {isSaving && <span className="text-xs text-gray-500">saving...</span>}
                    </div>
                  </td>

                  <td className="p-4">
                    {order.order_items
                      .map((item) => `${item.name} size ${item.size} x${item.quantity}`)
                      .join(", ")}
                  </td>

                  <td className="p-4">
                    <button
                      className="text-red-700 hover:underline disabled:opacity-60"
                      disabled={isDeleting || loading}
                      onClick={() => handleDelete(order)}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={8}>
                  {loading ? "Loading..." : "No orders"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
