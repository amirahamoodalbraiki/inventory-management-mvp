import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InventoryList from "./pages/InventoryList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Transactions from "./pages/Transactions.jsx";
import AdjustStock from "./pages/AdjustStock.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const hideNavbarOn = ["/"]; // Login only
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-14 min-h-screen bg-white" : "min-h-screen bg-white"}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<AddProduct />} />
          <Route path="/products/:id/adjust" element={<AdjustStock />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </main>
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
