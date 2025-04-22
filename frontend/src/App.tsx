import "./App.css";
import {RegisterPage} from "@/Pages/RegisterPage.tsx";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@/Pages/LoginPage.tsx";
import {HomePage} from "@/Pages/HomePage.tsx";
import {CartPage} from "@/Pages/CartPage.tsx";

function App() {
    return (<div className="font-sans">
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
        </div>
    );
}

export default App;
