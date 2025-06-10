import "./App.css"
import { RegisterPage } from "@/pages/RegisterPage.tsx"
import { Route, Routes } from "react-router-dom"
import { LoginPage } from "@/pages/LoginPage.tsx"
import { HomePage } from "@/pages/HomePage.tsx"
import { UserProvider } from "@/contexts/UserContext"
import { CartProvider } from "@/contexts/CartContext"
import { MyProfile } from "./pages/MyProfile"
import { Admin } from "./pages/Admin"
import { PcParts } from "./pages/PcParts"
import { CartPage } from "./pages/CartPage"
import { ProductDetails } from "./pages/ProductDetails"

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="font-sans">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/profil"
              element={<MyProfile />}
            />
            <Route
              path="/admin"
              element={<Admin />}
            />
            <Route
              path="/pc-parts"
              element={<PcParts />}
            />
            <Route
              path="/basket"
              element={<CartPage />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />
          </Routes>
        </div>
      </CartProvider>
    </UserProvider>
  )
}

export default App
