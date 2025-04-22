import "./App.css";
import {RegisterPage} from "@/components/Pages/RegisterPage.tsx";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@/components/Pages/LoginPage.tsx";
import {HomePage} from "@/components/Pages/HomePage.tsx";
import {CartPage} from "@/components/Pages/CartPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/logowanie" element={<LoginPage/>}/>
            <Route path="/rejestracja" element={<RegisterPage/>}/>
            <Route path="/koszyk" element={<CartPage/>}/>
            {/*
            <Route path="/zamowienia" element={<OrdersPage/>}/>
            <Route path="/produkty" element={<ProductsPage/>}/>
            <Route path="/produkty/:id" element={<ProductDetailsPage/>}/>
            <Route path="/admin" element={<AdminPanelPage/>}/>
            */}
        </Routes>
    );
}

export default App;
