import axios from "axios";
import {useEffect, useState} from "react";
import {Navbar} from "@/components/Navbar.tsx";

export const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/cart", {
                withCredentials: true,
            });
            setCartItems(response.data);
        } catch (error) {
            console.error("Błąd podczas pobierania koszyka:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (id: number) => {
        try {
            await axios.post(`http://localhost:8080/api/cart/remove/${id}`, {}, {
                withCredentials: true,
            });
            fetchCart();
        } catch (error) {
            console.error("Błąd podczas usuwania produktu:", error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.post("http://localhost:8080/api/cart/clear", {}, {
                withCredentials: true,
            });
            fetchCart();
        } catch (error) {
            console.error("Błąd podczas czyszczenia koszyka:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) return <div>Ładowanie koszyka...</div>;

    return (
        <>
            <Navbar/>
            <div className="max-w-2xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Twój Koszyk</h2>
                {cartItems.length === 0 ? (
                    <p>Koszyk jest pusty.</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="p-4 border rounded flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">{item.product.name}</p>
                                    <p>Ilość: {item.quantity}</p>
                                    <p>Cena łączna: {item.total} zł</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Usuń
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={clearCart}
                            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
                        >
                            Wyczyść koszyk
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
