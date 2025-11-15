import React from "react";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const list = products.filter(p => ids.includes(p.id));

  if (!list.length) return <div>No items in wishlist</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}