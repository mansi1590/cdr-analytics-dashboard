import { useState } from "react";
import API from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("mansi@test.com");
  const [password, setPassword] = useState("Test@123");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/Auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setError("");
      window.location.reload();
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Telecom Analytics Login
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Sign in to access the dashboard
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}