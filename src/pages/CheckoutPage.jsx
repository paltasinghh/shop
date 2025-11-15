import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import Button from "../components/common/Button.jsx";

export default function CheckoutPage() {
  const { items, totalCost, clear } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const order = { items, total: totalCost, shipping: data, date: new Date().toISOString() };
    addOrder(order);
    clear();
    navigate("/orders?success=1");
  };

  if (!items.length) return <div>No items in cart</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="bg-white border rounded p-4 lg:col-span-2 space-y-3">
        <div className="text-lg font-semibold">Shipping Address</div>
        <input name="fullName" required placeholder="Full Name" className="w-full border rounded px-3 py-2" />
        <input name="email" required type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input name="address" required placeholder="Address" className="w-full border rounded px-3 py-2" />
        <div className="grid grid-cols-2 gap-3">
          <input name="city" required placeholder="City" className="border rounded px-3 py-2" />
          <input name="zip" required placeholder="ZIP" className="border rounded px-3 py-2" />
        </div>
        <Button type="submit">Place Order</Button>
      </form>
      <div className="bg-white border rounded p-4 h-fit">
        <div className="text-lg font-semibold">Order Review</div>
        <ul className="mt-2 space-y-2">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex justify-between">
              <span>{product.name} × {quantity}</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-semibold">Total: ${totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
}