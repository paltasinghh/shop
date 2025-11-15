import React from "react";
export default function SidebarFilter({ filters, setFilters }) {
  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <aside className="w-64 shrink-0 bg-white border rounded-lg p-4 h-fit">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Search</label>
          <input value={filters.q} onChange={e => update("q", e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="Product name" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select value={filters.category} onChange={e => update("category", e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
            <option value="">All</option>
            <option>Electronics</option>
            <option>Wearables</option>
            <option>Accessories</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Price range</label>
          <div className="mt-1 flex gap-2">
            <input type="number" value={filters.min} onChange={e => update("min", e.target.value)} className="w-1/2 border rounded px-3 py-2" placeholder="Min" />
            <input type="number" value={filters.max} onChange={e => update("max", e.target.value)} className="w-1/2 border rounded px-3 py-2" placeholder="Max" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Rating</label>
          <select value={filters.rating} onChange={e => update("rating", e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
            <option value="">All</option>
            <option value="4">4+ stars</option>
            <option value="4.5">4.5+ stars</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Sort by</label>
          <select value={filters.sort} onChange={e => update("sort", e.target.value)} className="mt-1 w-full border rounded px-3 py-2">
            <option value="">Default</option>
            <option value="price_asc">Price low → high</option>
            <option value="price_desc">Price high → low</option>
            <option value="newest">Newest</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
    </aside>
  );
}