import "./App.css";
import { RegisterPage } from "@/components/Pages/RegisterPage.tsx";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/components/Pages/LoginPage.tsx";
import { HomePage } from "@/components/Pages/HomePage.tsx";

function App() {
  return (
    <Routes>
      {/* Strona główna */}
      <Route path="/" element={<HomePage />} />
      {/* Strona logowania */}
      <Route path="/logowanie" element={<LoginPage />} />
      {/* Strona rejestracji */}
      <Route path="/rejestracja" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
