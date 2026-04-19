"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register" | "admin";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode");
    if (requestedMode === "admin") setMode("admin");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (!email || !password) {
      setMessage("Please provide email and password.");
      setLoading(false);
      return;
    }

    if (mode === "register") {
      if (!name) {
        setMessage("Please provide your name.");
        setLoading(false);
        return;
      }
      const complexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      if (password !== confirm) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
      }
      if (password.length < 8) {
        setMessage("Password must be at least 8 characters.");
        setLoading(false);
        return;
      }
      if (!complexity.test(password)) {
        setMessage("Password must include uppercase, lowercase, and a number.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error ?? "Unable to register.");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("Invalid credentials.");
      setLoading(false);
      return;
    }
    router.push(mode === "admin" ? "/admin" : "/account");
  };

  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-4 py-12 md:px-8" data-theme="light">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-gold/20 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold">The BagCase</p>
          <h1 className="mt-3 font-serif text-4xl text-navy">Welcome back</h1>
          <p className="mt-3 text-sm text-navy/70">
            Sign in to track your orders, manage your wishlist, and chat with our concierge team.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["login", "register", "admin"] as Mode[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  mode === tab ? "bg-navy text-cream" : "border border-gold/30 text-navy"
                }`}
              >
                {tab === "login" && "User Login"}
                {tab === "register" && "Create Account"}
                {tab === "admin" && "Admin Login"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-8 space-y-4"
              onSubmit={handleSubmit}
            >
              {mode === "register" && (
                <input
                  name="name"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm"
                  required
                />
              )}
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm"
                required
              />
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {mode === "register" && (
                <input
                  name="confirm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full rounded-xl border border-gold/30 px-4 py-3 text-sm"
                  required
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full border border-gold bg-navy py-3 font-semibold text-cream transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Please wait..." : mode === "register" ? "Create account" : "Sign in"}
              </button>

              {message && <p className="text-sm text-red-600">{message}</p>}
            </motion.form>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-gold/20 bg-navy p-8 text-cream shadow-[0_30px_80px_rgba(15,23,42,0.15)]"
        >
          <h2 className="font-serif text-3xl">Continue with</h2>
          <p className="mt-3 text-sm text-cream/70">
            Use your Google account for one-tap access or explore exclusive admin analytics.
          </p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/account" })}
              className="w-full rounded-full border border-cream/20 bg-cream/10 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-gold hover:text-navy"
            >
              Google Sign-in
            </button>
            <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5 text-sm text-cream/80">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin Notice</p>
              <p className="mt-3">
                Admin access is restricted. Use the admin tab and credentials assigned by the BagCase team.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
