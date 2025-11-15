import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage.js";

const OrdersContext = createContext(null);
const KEY = "orders";

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => loadJSON(KEY, []));

  useEffect(() => {
    saveJSON(KEY, orders);
  }, [orders]);

  const addOrder = (order) => {
    setOrders(prev => [{ ...order, id: String(Date.now()) }, ...prev]);
  };

  const value = { orders, addOrder };
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  return useContext(OrdersContext);
}