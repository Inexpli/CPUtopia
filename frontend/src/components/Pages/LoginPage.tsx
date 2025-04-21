import React, { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tutaj możesz dodać logikę logowania, np. wysłać zapytanie do API
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Logowanie</h2>
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
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition-colors"
        >
          Zaloguj się
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Nie masz konta?{" "}
          <a href="/rejestracja" className="text-blue-600 hover:underline">
            Zarejestruj się
          </a>
        </p>
      </div>
    </div>
  );
};
