"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stethoscope, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@prositebuilder.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Store simple demo session
    if (typeof window !== "undefined") {
      localStorage.setItem("prosite_user", JSON.stringify({ email, name: "Dr. Practitioner" }));
    }
    setTimeout(() => {
      // If user already created a website before, send them to the admin panel
      const existingWebsiteId = typeof window !== "undefined" ? localStorage.getItem("prosite_website_id") : null;
      if (existingWebsiteId) {
        router.push(`/dashboard/websites/${existingWebsiteId}`);
      } else {
        router.push("/dashboard/create");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-teal-600/20">
              P
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              ProSite<span className="text-teal-600">Builder</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="text-xs text-slate-500">
            Manage your websites, bookings, and clinic details
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-4 text-xs text-teal-900 space-y-1">
            <div className="font-bold flex items-center space-x-1.5 text-teal-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo Account Credentials</span>
            </div>
            <p className="text-[11px] text-teal-700">
              Email: <strong>demo@prositebuilder.com</strong> / Pass: <strong>password123</strong>
            </p>
          </div>

          <div className="text-center text-xs text-slate-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-teal-600 font-bold hover:underline">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
