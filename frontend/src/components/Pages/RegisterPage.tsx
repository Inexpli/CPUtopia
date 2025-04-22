import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Navbar} from "@/components/Navbar.tsx";

export const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Hasła się nie zgadzają");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/user/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                alert("Rejestracja udana!");
                navigate("/logowanie");
            } else {
                const errorData = await response.json();
                alert("Błąd: " + errorData.message || "Nie udało się zarejestrować.");
            }
        } catch (error) {
            console.error("Błąd rejestracji:", error);
            alert("Wystąpił błąd sieci.");
        }
    };

    return (<>
            <Navbar/>

            <div className="w-full max-w-sm mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">Rejestracja</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="w-full p-2 border rounded-md mt-1" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Hasło</label>
                        <input type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="w-full p-2 border rounded-md mt-1" required/>
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Potwierdź Hasło</label>
                        <input type="password" id="confirm-password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="w-full p-2 border rounded-md mt-1" required/>
                    </div>
                    <button type="submit"
                            className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700">Zarejestruj
                        się
                    </button>
                </form>
            </div>
        </>

    );
};