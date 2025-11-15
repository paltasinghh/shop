import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage.js";

const CartContext = createContext(null);
const CART_KEY = "cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON(CART_KEY, []));

  useEffect(() => {
    saveJSON(CART_KEY, items);
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.product.id !== id));
  };

  const increase = (id) => {
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decrease = (id) => {
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i));
  };

  const clear = () => setItems([]);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalCost = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items]);

  const value = { items, addItem, removeItem, increase, decrease, clear, totalCount, totalCost };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}