import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { loading, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    const user = await register(form);
    console.log(user);

    navigate("/chat");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-800 px-4 py-10 text-gray-100">
      <div className="w-full max-w-md rounded-2xl border border-gray-700/80 bg-gray-900/80 p-8 shadow-2xl shadow-sky-950/40 backdrop-blur-sm">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            Get started
          </p>
          <h1 className="text-3xl font-bold text-white">Create an account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm text-gray-200">
            <span className="mb-2 block">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-gray-200">
            <span className="mb-2 block">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
            />
          </label>

          <label className="block text-sm text-gray-200">
            <span className="mb-2 block">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Choose a password"
              minLength={6}
              required
              className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
            />
          </label>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-red-400 hover:text-red-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
