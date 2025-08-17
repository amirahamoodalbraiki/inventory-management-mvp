import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InventoryList from "./pages/InventoryList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Transactions from "./pages/Transactions.jsx"; // 
import AdjustStock from "./pages/AdjustStock.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Navbar from "./components/Navbar";


function Layout() {
  const location = useLocation();
  const hideNavbarOn = ["/"]; // pages where you don't want Navbar

  return (
    <div>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inventory" element={<InventoryList />} />
        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/products/:id/edit" element={<AddProduct />} />
        <Route path="/products/:id/adjust" element={<AdjustStock />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
