"use client";

import React, { useState } from "react";
import { WebsiteData } from "@/lib/types";
import { DynamicIcon } from "./IconHelper";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Award,
  Star,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Heart,
  Send,
  User,
} from "lucide-react";

interface WebsiteRendererProps {
  website: WebsiteData;
  isIframe?: boolean;
}

export default function WebsiteRenderer({ website, isIframe = false }: WebsiteRendererProps) {
  const profile = website.profile || {
    doctorName: "Dr. Practitioner",
    title: "Healthcare Specialist",
    specialization: "General Practice",
    qualification: "MBBS, MD",
    experience: "10 Years Experience",
    about: "Dedicated healthcare professional providing comprehensive medical services.",
    phone: "+1 (555) 000-0000",
    email: "clinic@example.com",
    whatsapp: "+15550000000",
    address: "123 Health Ave, Medical District",
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    logoImage: null,
    coverImage: null,
  };

  const design = website.design || {
    primaryColor: "#0d9488",
    secondaryColor: "#0284c7",
    backgroundColor: "#ffffff",
    textColor: "#0f172a",
    fontFamily: "Modern" as const,
    buttonStyle: "Rounded" as const,
    headerStyle: "Modern" as const,
  };

  const services = website.services || [];
  const gallery = website.gallery || [];
  const template = website.template || "modern-medical";

  // State for appointment booking modal/form
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    date: "",
    notes: "",
  });

  // Dynamic button radius
  const getButtonRadiusClass = () => {
    switch (design.buttonStyle) {
      case "Pill":
        return "rounded-full";
      case "Square":
        return "rounded-none";
      case "Rounded":
      default:
        return "rounded-xl";
    }
  };

  // Dynamic Font class
  const getFontFamilyClass = () => {
    switch (design.fontFamily) {
      case "Professional":
        return "font-serif";
      case "Minimal":
        return "font-mono";
      case "Modern":
      default:
        return "font-sans";
    }
  };

  const buttonRadius = getButtonRadiusClass();
  const fontClass = getFontFamilyClass();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingForm({ name: "", phone: "", date: "", notes: "" });
    }, 4000);
  };

  // Build inline dynamic CSS variables
  const containerStyle = {
    "--primary": design.primaryColor || "#0d9488",
    "--secondary": design.secondaryColor || "#0284c7",
    "--bg-custom": design.backgroundColor || "#ffffff",
    "--text-custom": design.textColor || "#0f172a",
  } as React.CSSProperties;

  return (
    <div
      style={containerStyle}
      className={`min-h-screen text-[var(--text-custom)] bg-[var(--bg-custom)] ${fontClass} selection:bg-[var(--primary)] selection:text-white antialiased transition-colors duration-200`}
    >
      {/* ────────────────── HEADER ────────────────── */}
      {design.headerStyle === "Modern" ? (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-slate-100 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {profile.logoImage ? (
                <img
                  src={profile.logoImage}
                  alt={website.name}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div
                  style={{ backgroundColor: design.primaryColor }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md font-bold text-lg"
                >
                  {website.name.charAt(0)}
                </div>
              )}
              <div>
                <span className="text-xl font-bold tracking-tight block text-slate-900 leading-tight">
                  {website.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">{profile.title}</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-[var(--primary)] transition-colors">
                About
              </a>
              <a href="#services" className="hover:text-[var(--primary)] transition-colors">
                Services
              </a>
              <a href="#experience" className="hover:text-[var(--primary)] transition-colors">
                Experience
              </a>
              {gallery.length > 0 && (
                <a href="#gallery" className="hover:text-[var(--primary)] transition-colors">
                  Gallery
                </a>
              )}
              <a href="#contact" className="hover:text-[var(--primary)] transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`hidden sm:inline-flex items-center space-x-2 text-xs font-semibold px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors ${buttonRadius}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
              <a
                href="#book"
                style={{ backgroundColor: design.primaryColor }}
                className={`text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:opacity-95 transition-all inline-flex items-center space-x-2 ${buttonRadius}`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </a>
            </div>
          </div>
        </header>
      ) : design.headerStyle === "Centered" ? (
        <header className="bg-white border-b border-slate-100 py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center space-x-3 mb-2">
              {profile.logoImage && (
                <img src={profile.logoImage} alt={website.name} className="w-10 h-10 rounded-lg object-cover" />
              )}
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{website.name}</h1>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-3">{profile.title} • {profile.qualification}</p>
            <div className="flex justify-center items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-[var(--primary)]">About</a>
              <a href="#services" className="hover:text-[var(--primary)]">Services</a>
              <a href="#contact" className="hover:text-[var(--primary)]">Contact</a>
              <a
                href="#book"
                style={{ backgroundColor: design.primaryColor }}
                className={`text-white px-4 py-1.5 text-xs font-semibold ${buttonRadius}`}
              >
                Appointment
              </a>
            </div>
          </div>
        </header>
      ) : (
        /* Classic Header */
        <header className="bg-slate-900 text-white py-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                style={{ backgroundColor: design.primaryColor }}
                className="w-9 h-9 rounded flex items-center justify-center font-bold text-white"
              >
                {website.name.charAt(0)}
              </div>
              <span className="font-bold text-lg">{website.name}</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#about" className="hover:text-slate-300">About</a>
              <a href="#services" className="hover:text-slate-300">Services</a>
              <a href="#contact" className="hover:text-slate-300">Contact</a>
              <a
                href="#book"
                style={{ backgroundColor: design.primaryColor }}
                className={`text-white px-4 py-2 text-xs font-bold uppercase tracking-wider ${buttonRadius}`}
              >
                Consult Now
              </a>
            </div>
          </div>
        </header>
      )}

      {/* ────────────────── HERO SECTION ────────────────── */}
      {template === "modern-medical" ? (
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-teal-50/50 via-sky-50/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-900 text-xs font-semibold tracking-wide border border-teal-200">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>Verified Medical Specialist • {profile.experience}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Expert Healthcare by{" "}
                  <span style={{ color: design.primaryColor }} className="underline decoration-teal-300/60 decoration-wavy underline-offset-8">
                    {profile.doctorName}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
                  {profile.title} specialized in {profile.specialization}. Compassionate, patient-first care backed by {profile.qualification}.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <a
                    href="#book"
                    style={{ backgroundColor: design.primaryColor }}
                    className={`text-white px-7 py-3.5 text-base font-semibold shadow-lg hover:shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center space-x-2.5 ${buttonRadius}`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Consultation</span>
                  </a>
                  <a
                    href="#services"
                    className={`bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 px-6 py-3.5 text-base font-semibold transition-all inline-flex items-center space-x-2 ${buttonRadius}`}
                  >
                    <span>View All Services</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                </div>

                {/* Hero Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
                  <div>
                    <span className="block text-2xl font-black text-slate-900">{profile.experience.split(" ")[0] || "10+"}</span>
                    <span className="text-xs text-slate-500 font-medium">Years Experience</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-slate-900">10,000+</span>
                    <span className="text-xs text-slate-500 font-medium">Patients Treated</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-slate-900">99%</span>
                    <span className="text-xs text-slate-500 font-medium">Satisfaction Rate</span>
                  </div>
                </div>
              </div>

              {/* Doctor Image Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md">
                  <div
                    style={{ backgroundColor: design.primaryColor }}
                    className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl transform rotate-3"
                  />
                  <div className="relative bg-white rounded-3xl p-3 shadow-2xl border border-slate-100 overflow-hidden">
                    <img
                      src={
                        profile.profileImage ||
                        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={profile.doctorName}
                      className="w-full h-96 object-cover object-top rounded-2xl"
                    />
                    <div className="p-4 bg-gradient-to-t from-slate-900/90 to-transparent absolute bottom-3 inset-x-3 rounded-b-2xl text-white">
                      <div className="font-bold text-lg">{profile.doctorName}</div>
                      <div className="text-xs text-teal-200 font-medium">{profile.qualification}</div>
                      <div className="text-xs text-slate-300 mt-1 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span className="truncate">{profile.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : template === "professional-doctor" ? (
        /* Professional Doctor Template Hero */
        <section className="bg-slate-900 text-white pt-16 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
                  <Award className="w-4 h-4" />
                  <span>{profile.qualification}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {profile.doctorName}
                </h1>
                <p className="text-xl text-sky-200 font-medium">
                  {profile.title} • {profile.specialization}
                </p>
                <p className="text-base text-slate-300 leading-relaxed max-w-xl">
                  {profile.about}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="#book"
                    style={{ backgroundColor: design.primaryColor }}
                    className={`text-white px-8 py-3.5 text-sm font-bold tracking-wide uppercase shadow-lg hover:brightness-110 transition-all ${buttonRadius}`}
                  >
                    Schedule Appointment
                  </a>
                  <a
                    href={`tel:${profile.phone}`}
                    className={`border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-6 py-3.5 text-sm font-semibold transition-all inline-flex items-center space-x-2 ${buttonRadius}`}
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>Call {profile.phone}</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative border-4 border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
                  <img
                    src={profile.profileImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"}
                    alt={profile.doctorName}
                    className="w-full h-96 object-cover object-top"
                  />
                  <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-sm text-white">{profile.doctorName}</div>
                      <div className="text-xs text-slate-400">{profile.experience}</div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Premium Clinic Template Hero */
        <section className="relative pt-20 pb-32 bg-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-teal-950/40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-6">
              <span className="text-teal-400 font-semibold text-xs tracking-widest uppercase">
                Premier Medical & Clinical Practice
              </span>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
                {website.name}
              </h1>
              <p className="text-2xl font-light text-slate-300">
                Led by <span className="font-semibold text-white">{profile.doctorName}</span> — {profile.title}
              </p>
              <p className="text-base text-slate-400 leading-relaxed max-w-xl">
                {profile.about}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#book"
                  style={{ backgroundColor: design.primaryColor }}
                  className={`text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all shadow-xl hover:opacity-90 ${buttonRadius}`}
                >
                  Consult With Specialist
                </a>
                <a
                  href="#services"
                  className={`border border-white/20 text-white hover:bg-white/10 px-6 py-4 text-sm font-semibold ${buttonRadius}`}
                >
                  Explore Treatments
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────── ABOUT & CREDENTIALS ────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div
                    style={{ backgroundColor: `${design.primaryColor}15`, color: design.primaryColor }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold"
                  >
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Doctor Profile</h3>
                    <p className="text-xs text-slate-500">{profile.title}</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm divide-y divide-slate-200">
                  <div className="pt-2 flex justify-between">
                    <span className="text-slate-500 font-medium">Specialization</span>
                    <span className="font-semibold text-slate-900 text-right">{profile.specialization}</span>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <span className="text-slate-500 font-medium">Qualifications</span>
                    <span className="font-semibold text-slate-900 text-right">{profile.qualification}</span>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <span className="text-slate-500 font-medium">Experience</span>
                    <span className="font-semibold text-slate-900 text-right">{profile.experience}</span>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <span className="text-slate-500 font-medium">Address</span>
                    <span className="font-semibold text-slate-900 text-right max-w-xs">{profile.address}</span>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: `${design.primaryColor}10` }}
                  className="rounded-2xl p-4 flex items-center space-x-3 text-xs text-slate-700"
                >
                  <CheckCircle2 style={{ color: design.primaryColor }} className="w-5 h-5 flex-shrink-0" />
                  <span>Licensed medical practitioner accepting new patient registrations.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                <span>About The Practice</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Committed to delivering world-class medical excellence
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {profile.about}
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Every consultation is conducted with utmost clinical accuracy, thorough patient education, and a dedicated treatment protocol designed for rapid recovery and lasting health.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck style={{ color: design.primaryColor }} className="w-5 h-5 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Evidence-Based Medicine</h4>
                    <p className="text-xs text-slate-500 mt-1">Practicing up-to-date global clinical guidelines.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock style={{ color: design.primaryColor }} className="w-5 h-5 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Zero Long Waits</h4>
                    <p className="text-xs text-slate-500 mt-1">Dedicated slots scheduled with personal attention.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── SERVICES SECTION ────────────────── */}
      <section id="services" className="py-20 bg-slate-50/80 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span
              style={{ color: design.primaryColor }}
              className="text-xs font-bold uppercase tracking-wider"
            >
              Comprehensive Clinical Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Services & Specialized Consultations
            </h2>
            <p className="text-slate-600 text-base">
              Transparent pricing, dedicated appointment durations, and tailored treatments for all patients.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No services added yet. Add services from the builder wizard.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        style={{ backgroundColor: `${design.primaryColor}15`, color: design.primaryColor }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      >
                        <DynamicIcon name={service.icon || "Stethoscope"} className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-slate-900">{service.price}</span>
                        <div className="text-xs text-slate-400 flex items-center justify-end space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-600 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Available for Booking</span>
                    </span>
                    <a
                      href="#book"
                      onClick={() => setSelectedService(service.name)}
                      style={{ color: design.primaryColor }}
                      className="text-xs font-bold hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Select</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────── EXPERIENCE & CREDENTIALS ────────────────── */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <span style={{ color: design.primaryColor }} className="text-xs font-bold uppercase tracking-wider">
              Experience & Recognition
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Clinical Background & Academic Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <Award style={{ color: design.primaryColor }} className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Qualifications</h3>
              <p className="text-sm text-slate-600">{profile.qualification}</p>
              <div className="mt-4 text-xs font-semibold text-slate-500">Board Certified</div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <Heart style={{ color: design.primaryColor }} className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Years of Practice</h3>
              <p className="text-sm text-slate-600">{profile.experience} in active clinical patient care</p>
              <div className="mt-4 text-xs font-semibold text-slate-500">Continuous Excellence</div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <ShieldCheck style={{ color: design.primaryColor }} className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-slate-900 text-lg mb-2">Accreditation</h3>
              <p className="text-sm text-slate-600">Full medical council registration and hospital clinical privileges.</p>
              <div className="mt-4 text-xs font-semibold text-slate-500">Verified Credentials</div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── GALLERY ────────────────── */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-20 bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Clinic & Facilities</h2>
              <p className="text-slate-600 text-sm mt-2">Take a visual tour of our modern diagnostic and patient suites.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((img, i) => (
                <div key={img.id || i} className="group relative rounded-3xl overflow-hidden shadow-md bg-slate-200 aspect-[4/3]">
                  <img
                    src={img.url}
                    alt={img.caption || "Clinic photo"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white text-xs font-medium">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────────────── PATIENT TESTIMONIALS ────────────────── */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span style={{ color: design.primaryColor }} className="text-xs font-bold uppercase tracking-wider">
              Patient Experiences
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              What Our Patients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Dr. Khan's approach was exceptionally clear and calming. His detailed explanation of my heart tests gave my whole family peace of mind.",
                author: "Michael R.",
                detail: "Cardiology Patient",
              },
              {
                quote:
                  "The clinic is spotlessly clean, appointments run right on time, and the staff is wonderful. Booking online was effortless!",
                author: "Elena S.",
                detail: "Annual Health Check",
              },
              {
                quote:
                  "I was able to schedule an online telehealth consultation within an hour. Dr. Khan reviewed my reports thoroughly and sent prescriptions right away.",
                author: "David K.",
                detail: "Telehealth Consultation",
              },
            ].map((t, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-200">
                  <div className="font-bold text-sm text-slate-900">{t.author}</div>
                  <div className="text-xs text-slate-500">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── BOOKING & CONTACT ────────────────── */}
      <section id="book" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact details */}
            <div id="contact" className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                  Direct Contact & Location
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                  Get in Touch
                </h2>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Have a question or need to schedule an in-person or virtual consultation? We are here to assist you promptly.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                  <Phone className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Phone</div>
                    <a href={`tel:${profile.phone}`} className="text-sm font-semibold text-white hover:text-teal-300">
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                  <Mail className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Official Email</div>
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-white hover:text-teal-300">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                  <MapPin className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Clinic Address</div>
                    <div className="text-sm font-semibold text-white">{profile.address}</div>
                  </div>
                </div>

                {profile.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl transition-all shadow-md"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Interactive Appointment Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-800/95 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Request an Appointment</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Select your requested service and convenient time. Our clinic coordinator will confirm your slot immediately.
                </p>

                {bookingSuccess ? (
                  <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-6 text-center text-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h4 className="font-bold text-lg text-white">Appointment Request Received!</h4>
                    <p className="text-xs mt-1">
                      Thank you. We have sent a confirmation message to your phone and email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Patient Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Select Service
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                        >
                          <option value="">-- General Appointment --</option>
                          {services.map((s, i) => (
                            <option key={s.id || i} value={s.name}>
                              {s.name} ({s.price})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Symptoms or Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief description of symptoms or questions..."
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-400 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{ backgroundColor: design.primaryColor }}
                      className={`w-full text-white py-3.5 font-semibold text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center space-x-2 ${buttonRadius}`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm Appointment Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div
                style={{ backgroundColor: design.primaryColor }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              >
                {website.name.charAt(0)}
              </div>
              <span className="text-white font-bold text-base">{website.name}</span>
            </div>
            <div className="flex space-x-6 text-xs">
              <a href="#about" className="hover:text-white">About</a>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#contact" className="hover:text-white">Contact</a>
              <a href="#book" className="hover:text-white">Appointments</a>
            </div>
            <div className="text-xs text-slate-500">
              Powered by <span className="text-slate-300 font-semibold">ProSite Builder</span>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
            <div>© {new Date().getFullYear()} {website.name}. All rights reserved.</div>
            <div>In medical emergencies, please dial your local emergency services immediately.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
