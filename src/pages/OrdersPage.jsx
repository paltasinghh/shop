import React from "react";
import { useLocation } from "react-router-dom";
import { useOrders } from "../context/OrdersContext.jsx";
import Modal from "../components/common/Modal.jsx";
import Button from "../components/common/Button.jsx";

export default function OrdersPage() {
  const { orders } = useOrders();
  const { search } = useLocation();
  const success = new URLSearchParams(search).get("success") === "1";

  return (
    <div className="space-y-4">
      <Modal open={success} title="Order Successful" onClose={() => {}}>
        <div className="space-y-4">
          <div>Your order has been placed successfully.</div>
          <Button to="/">Continue Shopping</Button>
        </div>
      </Modal>
      {!orders.length ? (
        <div>No past orders</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map(o => (
            <div key={o.id} className="bg-white border rounded p-4">
              <div className="text-sm text-gray-600">{new Date(o.date).toLocaleString()}</div>
              <ul className="mt-2 space-y-1">
                {o.items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex justify-between">
                    <span>{product.name} × {quantity}</span>
                    <span>${(product.price * quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-semibold">Total: ${o.total.toFixed(2)}</div>
              <div className="mt-2 text-sm text-gray-700">Ship to: {o.shipping.fullName}, {o.shipping.address}, {o.shipping.city} {o.shipping.zip}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}