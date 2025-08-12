import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InventoryList from "./pages/InventoryList.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<InventoryList />} />
      </Routes>
    </BrowserRouter>
  );
}
