"use client";


import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6 bg-white shadow-lg rounded max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-gray-700">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded text-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded text-gray-700"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link
            href="/pages/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
