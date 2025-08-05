"use client";
import toast from "react-hot-toast";
import z from "zod";
import { useState } from "react";
import { RegistrationSchema } from "@/app/lib/auth/validators";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      RegistrationSchema.parse(form);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Invalid credentials");
        return;
      }

      toast.success("registration successful!");
      await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      router.push("/pages/wishlist");
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Zod validation error:", error);
        toast.error("Invalid input");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 max-w-md w-full bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded text-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded text-gray-700"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded text-gray-700"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-medium cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
}
