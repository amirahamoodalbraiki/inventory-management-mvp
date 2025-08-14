import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InventoryList from "./pages/InventoryList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
//import AdjustStock from "./pages/AdjustStock.jsx";
//import Transactions from "./pages/Transactions.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<InventoryList />} />
        <Route path="/products/new" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}