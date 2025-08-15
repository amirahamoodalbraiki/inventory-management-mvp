// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InventoryList from "./pages/InventoryList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Transactions from "./pages/Transactions.jsx"; // 
import AdjustStock from "./pages/AdjustStock.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/:id/adjust" element={<AdjustStock />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}