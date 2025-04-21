import React, { useState } from "react";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sprawdzanie, czy hasła się zgadzają
    if (password !== confirmPassword) {
      alert("Hasła się nie zgadzają");
      return;
    }

    // Tutaj możesz dodać logikę rejestracji, np. wysłać zapytanie do API
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Rejestracja</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700"
          >
            Hasło
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-neutral-700"
          >
            Potwierdź Hasło
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition-colors"
        >
          Zarejestruj się
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Masz już konto?{" "}
          <a href="/logowanie" className="text-blue-600 hover:underline">
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
};
