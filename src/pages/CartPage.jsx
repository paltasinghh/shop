import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
  const { items, increase, decrease, removeItem, totalCost } = useCart();

  if (!items.length) return (
    <div className="text-center space-y-4">
      <div>Your cart is empty</div>
      <Link to="/" className="inline-block bg-primary text-white px-4 py-2 rounded">Browse products</Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4 bg-white border rounded p-4">
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
              <div className="mt-2 flex items-center gap-2">
                <button className="px-2 py-1 border rounded" onClick={() => decrease(product.id)}>-</button>
                <span>{quantity}</span>
                <button className="px-2 py-1 border rounded" onClick={() => increase(product.id)}>+</button>
              </div>
            </div>
            <button className="px-3 py-2 border rounded" onClick={() => removeItem(product.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="bg-white border rounded p-4 h-fit">
        <div className="text-lg font-semibold">Order Summary</div>
        <div className="mt-2 text-gray-700">Total: ${totalCost.toFixed(2)}</div>
        <Link to="/checkout" className="mt-4 block text-center bg-primary text-white px-4 py-2 rounded">Proceed to Checkout</Link>
      </div>
    </div>
  );
}