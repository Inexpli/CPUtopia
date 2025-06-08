import "./App.css"
import { RegisterPage } from "@/pages/RegisterPage.tsx"
import { Route, Routes } from "react-router-dom"
import { LoginPage } from "@/pages/LoginPage.tsx"
import { HomePage } from "@/pages/HomePage.tsx"
import { UserProvider } from "@/contexts/UserContext"
import { MyProfile } from "./pages/MyProfile"
import { Admin } from "./pages/Admin"
import { PcParts } from "./pages/PcParts"

function App() {
  return (
    <UserProvider>
      <div className="font-sans">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/logowanie"
            element={<LoginPage />}
          />
          <Route
            path="/rejestracja"
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
          {/*
                    <Route path="/zamowienia" element={<OrdersPage/>}/>
                    <Route path="/produkty" element={<ProductsPage/>}/>
                    <Route path="/produkty/:id" element={<ProductDetailsPage/>}/>
                    <Route path="/admin" element={<AdminPanelPage/>}/>
                    */}
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App
