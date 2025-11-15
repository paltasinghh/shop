import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage.js";

const WishlistContext = createContext(null);
const KEY = "wishlist";

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => loadJSON(KEY, []));

  useEffect(() => {
    saveJSON(KEY, ids);
  }, [ids]);

  const toggle = (id) => {
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const value = { ids, toggle };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
}