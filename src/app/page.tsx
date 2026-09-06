"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Globe,
  Palette,
  Smartphone,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  ChevronDown,
  Star,
  ExternalLink,
  Laptop,
  Check,
  HeartPulse,
  Smile,
  Activity,
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need any coding or technical knowledge to build a website?",
      a: "None at all. MediWeb is engineered specifically for doctors and healthcare specialists. Simply select a pre-built template, fill in your credentials and services, and your website is ready in under 5 minutes.",
    },
    {
      q: "Can I customize colors, fonts, and layout styles?",
      a: "Yes. You have full granular control over primary/secondary brand colors, typography, button styles (Rounded, Pill, Square), header configurations, and clinic imagery. The changes preview immediately in real time.",
    },
    {
      q: "Is the generated website mobile and tablet friendly?",
      a: "100%. Every single template is fully responsive, optimized for smartphones, tablets, and ultra-wide desktop screens with blazing-fast load speeds.",
    },
    {
      q: "Can patients request appointments or contact me directly?",
      a: "Yes. Every website includes an integrated appointment booking form, direct WhatsApp click-to-chat, phone call buttons, and clinic location maps.",
    },
    {
      q: "Can I update my services or clinic hours later?",
      a: "Absolutely. Log into your dashboard at any time, edit services, prices, or bio, click Save, and your live website updates instantly with zero redeployment delay.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-600 selection:text-white">
      {/* ────────────────── TOP NAVIGATION ────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
                Medi<span className="text-teal-600">Web</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Healthcare Web Platform
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-teal-600 transition-colors">
              How It Works
            </a>
            <a href="#templates" className="hover:text-teal-600 transition-colors">
              Templates
            </a>
            <a href="#features" className="hover:text-teal-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="hover:text-teal-600 transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="hover:text-teal-600 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold shadow-md shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Signup / Login
            </Link>
          </div>
        </div>
      </header>

      {/* ────────────────── HERO SECTION ────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-200/40 via-sky-200/30 to-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Built for Doctors, Clinics, Dentists & Therapists</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
            Create Your Professional Website in{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Minutes
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Build a beautiful professional website without coding. Showcase your medical credentials, list your services, receive appointment bookings, and grow your practice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-base shadow-xl shadow-teal-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2.5"
            >
              <span>Create Your Website</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo/ahmed-care"
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-base shadow-sm transition-all hover:border-teal-500 flex items-center justify-center space-x-2"
            >
              <span>View Demo</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-10 flex flex-wrap justify-center items-center gap-8 text-xs font-semibold text-slate-500">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Zero Technical Knowledge Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Real-Time Split-Screen Live Preview</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Mobile, Tablet & Desktop Ready</span>
            </div>
          </div>

          {/* Interactive Preview Mockup Card */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="relative rounded-3xl p-3 bg-slate-900 shadow-2xl border border-slate-800 text-left">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-3 font-mono text-slate-400">mediweb.com/demo/ahmed-care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">LIVE DEMO</span>
                  <Link
                    href="/demo/ahmed-care"
                    target="_blank"
                    className="text-teal-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Open in Fullscreen</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                      Cardiology Specialist • 12+ Years Experience
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Ahmed Care — Dr. Ahmed Khan
                    </h3>
                    <p className="text-slate-600 text-sm">
                      MBBS, MD (Cardiology), FACC. Comprehensive cardiac consultations, ECG screenings, and preventative healthcare.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        General Consultation ($120)
                      </span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        Cardiac Consultation ($200)
                      </span>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        Online Consultation ($95)
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-4 text-center">
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"
                      alt="Dr. Ahmed Khan"
                      className="w-36 h-36 rounded-2xl object-cover mx-auto shadow-lg border-2 border-teal-500"
                    />
                    <div className="mt-3 font-bold text-slate-900 text-sm">Dr. Ahmed Khan</div>
                    <div className="text-xs text-teal-600 font-medium">Senior Consultant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── HOW IT WORKS ────────────────── */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How MediWeb Works
            </h2>
            <p className="text-slate-600 text-base">
              From zero to a fully operational, live clinic website in three seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 relative group hover:border-teal-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-teal-600/20">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select Your Template</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose from our pre-engineered medical layouts: Modern Medical, Professional Doctor, or Premium Clinic.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 relative group hover:border-teal-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-teal-600/20">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Add Details & Services</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter your medical credentials, specialization, consultation fees, clinic address, and upload your profile photo.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 relative group hover:border-teal-500 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-teal-600/20">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Preview & Launch</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Watch the live preview update instantly as you edit colors and typography. Click Create and receive your public link instantly!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── TEMPLATES SHOWCASE ────────────────── */}
      <section id="templates" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Engineered For Healthcare
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 Working Production Templates
            </h2>
            <p className="text-slate-600 text-base">
              Each designed with specific clinical aesthetics and conversion-focused patient appointment pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-tr from-teal-600 to-teal-800 p-6 flex flex-col justify-between text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 w-fit px-2.5 py-1 rounded-full">
                  Template 1
                </span>
                <div>
                  <h4 className="text-2xl font-black">Modern Medical</h4>
                  <p className="text-xs text-teal-100">Soft cards, rounded badges, tech-forward clinic styling.</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600">
                  Ideal for general cardiologists, internal medicine doctors, and multi-specialty practices.
                </p>
                <Link
                  href="/demo/ahmed-care"
                  target="_blank"
                  className="block w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700 text-xs font-bold transition-all"
                >
                  Preview Ahmed Care (Modern Medical) →
                </Link>
              </div>
            </div>

            {/* Template 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-tr from-slate-900 to-sky-900 p-6 flex flex-col justify-between text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 w-fit px-2.5 py-1 rounded-full">
                  Template 2
                </span>
                <div>
                  <h4 className="text-2xl font-black">Professional Doctor</h4>
                  <p className="text-xs text-sky-200">Structured layout, authoritative prestige, deep navy hues.</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600">
                  Perfect for dental surgeons, orthodontists, consultants, and senior specialists.
                </p>
                <Link
                  href="/demo/sara-clinic"
                  target="_blank"
                  className="block w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700 text-xs font-bold transition-all"
                >
                  Preview Dr. Sara Clinic (Professional) →
                </Link>
              </div>
            </div>

            {/* Template 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-tr from-slate-950 via-teal-950 to-emerald-950 p-6 flex flex-col justify-between text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 w-fit px-2.5 py-1 rounded-full">
                  Template 3
                </span>
                <div>
                  <h4 className="text-2xl font-black">Premium Clinic</h4>
                  <p className="text-xs text-emerald-200">Luxury aesthetic, expansive photography, gold/emerald touch.</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600">
                  Tailored for aesthetic clinics, wellness retreats, physical therapy, and boutique practices.
                </p>
                <Link
                  href="/signup"
                  className="block w-full text-center py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all"
                >
                  Use This Template in Builder →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── FEATURES ────────────────── */}
      <section id="features" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Powerful Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Succeed Online
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Zap className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-lg">Instant Live Preview</h4>
              <p className="text-sm text-slate-600">
                Split-screen live editor. Every keystroke, color modification, and photo upload updates the preview instantly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Smartphone className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-lg">Responsive Device Toggle</h4>
              <p className="text-sm text-slate-600">
                Test how your site looks on desktop, tablet, and mobile screens right inside the builder wizard.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Palette className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-lg">Dynamic Design Theming</h4>
              <p className="text-sm text-slate-600">
                Tweak primary & secondary colors, font families, and button radiuses (Rounded, Square, Pill) with live CSS variables.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Clock className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-lg">Instant Live Updates</h4>
              <p className="text-sm text-slate-600">
                Edit services or bio anytime from your dashboard. Saved changes are reflected immediately on the public URL.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <ShieldCheck className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-lg">Multi-Site Isolation</h4>
              <p className="text-sm text-slate-600">
                Create multiple clinics and practitioner websites independently from a single unified dashboard.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <Users className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-lg">WhatsApp & Direct Call</h4>
              <p className="text-sm text-slate-600">
                Engage prospective patients with 1-click WhatsApp messaging and direct appointment reservation forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── TESTIMONIALS ────────────────── */}
      <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Practitioner Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Doctors & Clinics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "I set up Ahmed Care in under 8 minutes. Having a clean link to share with referring hospitals and new cardiac patients has elevated our clinic's reputation significantly."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                  AK
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Dr. Ahmed Khan</div>
                  <div className="text-xs text-slate-500">Consultant Cardiologist</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "The live preview editor is brilliant. I was able to match my clinic's signature blue palette and list all our Invisalign pricing transparently for our patients."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-sm">
                  SA
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Dr. Sara Al-Mansoor</div>
                  <div className="text-xs text-slate-500">Aesthetic Dentist</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "No complicated web agencies or monthly maintenance charges. Whenever we update our therapy packages, I edit the site in 30 seconds from my phone."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                  JM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Dr. Julian Miller</div>
                  <div className="text-xs text-slate-500">Sports Physical Therapist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── FAQ ACCORDION ────────────────── */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/60 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openFaq === idx ? "rotate-180 text-teal-600" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── CTA BANNER ────────────────── */}
      <section className="py-20 bg-gradient-to-tr from-teal-700 via-teal-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Build Your Professional Medical Website?
          </h2>
          <p className="text-teal-100 text-base sm:text-lg max-w-2xl mx-auto">
            Join hundreds of doctors and practitioners who trust MediWeb to establish their digital practice.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-teal-900 font-extrabold text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Get Started Now — It's Free
            </Link>
            <Link
              href="/demo/ahmed-care"
              target="_blank"
              className="px-8 py-4 rounded-full bg-teal-600/40 hover:bg-teal-600/60 border border-teal-400/40 text-white font-semibold text-base transition-all"
            >
              Explore Sample Website
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                P
              </div>
              <span className="text-white font-bold text-lg">MediWeb</span>
            </div>

            <div className="flex space-x-6 text-xs font-medium text-slate-400">
              <a href="#how-it-works" className="hover:text-white">How It Works</a>
              <a href="#templates" className="hover:text-white">Templates</a>
              <a href="#features" className="hover:text-white">Features</a>
              <Link href="/login" className="hover:text-white">Sign In</Link>
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            </div>

            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} MediWeb. Healthcare Web Platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
