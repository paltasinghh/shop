import React from "react";
import { useMemo, useState } from "react";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import SidebarFilter from "../components/SidebarFilter.jsx";

export default function Home() {
  const [filters, setFilters] = useState({ q: "", category: "", min: "", max: "", rating: "", sort: "" });

  const list = useMemo(() => {
    let arr = products.slice();
    if (filters.q) arr = arr.filter(p => p.name.toLowerCase().includes(filters.q.toLowerCase()));
    if (filters.category) arr = arr.filter(p => p.category === filters.category);
    if (filters.min) arr = arr.filter(p => p.price >= Number(filters.min));
    if (filters.max) arr = arr.filter(p => p.price <= Number(filters.max));
    if (filters.rating) arr = arr.filter(p => p.rating >= Number(filters.rating));
    if (filters.sort === "price_asc") arr.sort((a,b) => a.price - b.price);
    if (filters.sort === "price_desc") arr.sort((a,b) => b.price - a.price);
    if (filters.sort === "newest") arr.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filters.sort === "popularity") arr.sort((a,b) => b.popularity - a.popularity);
    return arr;
  }, [filters]);

  return (
    <div className="flex gap-6">
      <SidebarFilter filters={filters} setFilters={setFilters} />
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}