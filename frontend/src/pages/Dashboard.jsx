import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { inventoryService } from "../services/inventory";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        
        const invStats = await api.get("/products/summary"); 
       
        const low = await inventoryService.getInventoryItems({ stockStatus: "low-stock" });

        const tx = await api.get("/transactions/summary");
       

        setStats(invStats);
        setLowStock(low.slice(0, 5)); 
        setTransactions(tx.slice(0, 5));
      } catch (err) {
        console.error("Dashboard load failed", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Dashboard</h1>

      {/* Stats card */}
      <div style={grid}>
        <div style={card}>
          <h2 style={title}>Inventory Stats</h2>
          <p>Total Products: {stats?.total ?? 0}</p>
          <p>In Stock: {stats?.inStock ?? 0}</p>
          <p>Low Stock: {stats?.low ?? 0}</p>
          <p>Out of Stock: {stats?.out ?? 0}</p>
        </div>

        <div style={card}>
          <h2 style={title}>Low Stock</h2>
          {lowStock.length === 0 ? (
            <p>All good</p>
          ) : (
            <ul>
              {lowStock.map((p) => (
                <li key={p.id}>
                  {p.name} — {p.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={card}>
          <h2 style={title}>Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p>No transactions</p>
          ) : (
            <ul>
              {transactions.map((t) => (
                <li key={t.id}>
                  {new Date(t.date).toLocaleDateString()} — {t.itemsCount} items — ${t.totalAmount}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 20,
};
const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: 16,
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
};
const title = { fontSize: 18, marginBottom: 10 };
