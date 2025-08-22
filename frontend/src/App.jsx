import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InventoryList from "./pages/InventoryList.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Transactions from "./pages/Transactions.jsx";
import AdjustStock from "./pages/AdjustStock.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import AddUser from "./pages/AddUser.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";



function Layout() {
  const location = useLocation();
  const hideNavbarOn = ["/","/login"]; // Login and welcome only
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-14 min-h-screen bg-white" : "min-h-screen bg-white"}>
        <Routes>
        <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<AddProduct />} />
          <Route path="/products/:id/adjust" element={<AdjustStock />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/new" element={<AddUser />} />
          <Route path="/users/:id/edit" element={<AddUser />} />
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
