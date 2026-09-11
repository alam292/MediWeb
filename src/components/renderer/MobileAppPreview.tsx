"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Share2,
  Bell,
  Heart,
  Video,
  Sparkles,
  User,
  Home,
  Stethoscope,
  Award,
  ArrowLeft,
  Send,
  Check,
  Download,
  Info,
  ExternalLink,
  Search,
} from "lucide-react";
import { WebsiteData } from "@/lib/types";
import { DynamicIcon } from "@/components/renderer/IconHelper";

interface MobileAppPreviewProps {
  website: WebsiteData;
  deviceType?: "ios" | "android";
}

export default function MobileAppPreview({
  website,
  deviceType = "ios",
}: MobileAppPreviewProps) {
  const [activeTab, setActiveTab] = useState<"home" | "services" | "book" | "doctor" | "contact">("home");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Today, 4:30 PM");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  const primaryColor = website.design?.primaryColor || "#0d9488";
  const secondaryColor = website.design?.secondaryColor || "#0284c7";
  const doctor = website.profile;
  const doctorPhoto =
    doctor?.profileImage ||
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop";

  const handleQuickBook = (serviceId?: string) => {
    if (serviceId) setSelectedServiceId(serviceId);
    setActiveTab("book");
  };

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTab("home");
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Smartphone Device Frame */}
      <div
        className={`relative w-[360px] sm:w-[380px] max-w-full bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 select-none transition-all`}
        style={{
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset`,
        }}
      >
        {/* Hardware side buttons */}
        <div className="absolute -left-[7px] top-24 w-[3px] h-10 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[7px] top-38 w-[3px] h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-[7px] top-28 w-[3px] h-14 bg-slate-700 rounded-r-md" />

        {/* Screen Inner Container */}
        <div className="relative w-full h-[680px] bg-slate-50 rounded-[38px] overflow-hidden flex flex-col font-sans text-slate-900">
          
          {/* Status Bar / Dynamic Island */}
          <div className="bg-white/95 backdrop-blur-md pt-2 px-6 pb-1.5 flex items-center justify-between z-30 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-900 tracking-tight">9:41</span>
            
            {/* Dynamic Island / Speaker Notch */}
            {deviceType === "ios" ? (
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center space-x-2 px-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-teal-500/80 animate-pulse" />
              </div>
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              </div>
            )}

            <div className="flex items-center space-x-1.5 text-slate-800">
              <span className="text-[10px] font-semibold">5G</span>
              <div className="w-5 h-2.5 border border-slate-800 rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-slate-900 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Top Bar */}
          <div
            className="px-4 py-2.5 flex items-center justify-between text-white shadow-sm z-20"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center space-x-2.5">
              {doctor?.profileImage ? (
                <img
                  src={doctor.profileImage}
                  alt={website.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/40 shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  {website.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-xs font-black tracking-tight leading-tight line-clamp-1">
                  {website.name}
                </h3>
                <div className="flex items-center space-x-1 text-[10px] text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold">Live Clinic App</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setActiveTab("contact")}
                className="p-1.5 bg-white/15 hover:bg-white/25 rounded-full transition-colors text-white"
                title="Direct Call"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab("book")}
                className="px-2.5 py-1 bg-white text-slate-900 rounded-full text-[10px] font-extrabold shadow-sm hover:scale-105 transition-all flex items-center space-x-1"
                style={{ color: primaryColor }}
              >
                <Calendar className="w-3 h-3" />
                <span>Book</span>
              </button>
            </div>
          </div>

          {/* App Main Scrollable Screen Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 text-slate-800 relative pb-16">
            
            {/* ─────── TAB: HOME ─────── */}
            {activeTab === "home" && (
              <div className="p-3.5 space-y-3.5">
                {/* Doctor Hero Card */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 -mr-10 -mt-10"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex items-start space-x-3">
                    <img
                      src={
                        doctor?.profileImage ||
                        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={doctor?.doctorName}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-sm font-extrabold text-slate-900 truncate">
                          {doctor?.doctorName}
                        </h4>
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      </div>
                      <p className="text-[11px] font-semibold text-teal-700 truncate">
                        {doctor?.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {doctor?.specialization}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-[10px] font-medium text-slate-600">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.9
                        </span>
                        <span>•</span>
                        <span className="text-slate-500">{doctor?.experience || "10+ Yrs"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Grid */}
                  <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                    <button
                      onClick={() => handleQuickBook()}
                      className="flex flex-col items-center space-y-1 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700">Book Visit</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("contact")}
                      className="flex flex-col items-center space-y-1 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700">Call</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("contact")}
                      className="flex flex-col items-center space-y-1 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center shadow-sm">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700">WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("doctor")}
                      className="flex flex-col items-center space-y-1 p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700">Doctor Bio</span>
                    </button>
                  </div>
                </div>

                {/* Instant Telehealth / Priority Banner */}
                <div
                  className="rounded-2xl p-3 text-white flex items-center justify-between shadow-sm relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                  }}
                >
                  <div className="space-y-0.5 z-10 max-w-[70%]">
                    <span className="inline-block px-1.5 py-0.5 bg-white/20 rounded-md text-[9px] font-extrabold uppercase tracking-wider">
                      Instant Teleconsult
                    </span>
                    <h5 className="text-xs font-bold leading-snug">Online Medical Review Available</h5>
                    <p className="text-[10px] text-white/80">Audio/Video consultation from home</p>
                  </div>
                  <button
                    onClick={() => handleQuickBook()}
                    className="px-3 py-1.5 bg-white rounded-xl text-[10px] font-black shadow-md hover:scale-105 transition-all text-slate-900"
                    style={{ color: primaryColor }}
                  >
                    Start
                  </button>
                </div>

                {/* Services Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900 flex items-center space-x-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                      <span>Popular Treatments</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab("services")}
                      className="text-[10px] font-bold text-teal-600 hover:underline flex items-center"
                    >
                      <span>View All ({website.services?.length || 0})</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {website.services?.slice(0, 3).map((service) => (
                      <div
                        key={service.id}
                        className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-teal-200 transition-all cursor-pointer"
                        onClick={() => handleQuickBook(service.id)}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <DynamicIcon name={service.icon} className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 leading-tight">
                              {service.name}
                            </h5>
                            <span className="text-[10px] text-slate-500">{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-teal-700 block">
                            {service.price}
                          </span>
                          <button
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 hover:bg-teal-600 hover:text-white transition-colors"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinic Working Hours & Location */}
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-[11px] space-y-2 shadow-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 block">Clinic Address</span>
                      <span className="text-slate-500 text-[10px] leading-tight block">
                        {doctor?.address || "Suite 301, Premier Medical Tower, Central Avenue"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-1.5 border-t border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[10px] text-slate-600">
                      Open Mon - Sat: <strong>9:00 AM - 6:00 PM</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ─────── TAB: SERVICES ─────── */}
            {activeTab === "services" && (
              <div className="p-3.5 space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <h3 className="text-xs font-black text-slate-900">Clinic Treatments & Pricing</h3>
                </div>

                <div className="space-y-2.5">
                  {website.services?.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <DynamicIcon name={service.icon} className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{service.name}</h4>
                            <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                              <Clock className="w-2.5 h-2.5 mr-0.5" />
                              {service.duration}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-teal-700">{service.price}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                      <button
                        onClick={() => handleQuickBook(service.id)}
                        className="w-full py-1.5 rounded-xl text-white text-[11px] font-bold shadow-sm transition-all hover:opacity-90 flex items-center justify-center space-x-1"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Book This Treatment</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─────── TAB: BOOK APPOINTMENT ─────── */}
            {activeTab === "book" && (
              <div className="p-3.5 space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <h3 className="text-xs font-black text-slate-900">Book Clinic Appointment</h3>
                </div>

                {bookingSuccess ? (
                  <div className="bg-white p-6 rounded-2xl border border-emerald-200 text-center space-y-3 shadow-sm my-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900">Appointment Requested!</h4>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Your booking request has been sent to {doctor?.doctorName}. You will receive an SMS confirmation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmAppointment} className="space-y-3">
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 space-y-2 text-xs shadow-sm">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase">
                        Selected Doctor
                      </label>
                      <div className="flex items-center space-x-2">
                        <img
                          src={doctorPhoto}
                          alt={doctor?.doctorName || "Doctor"}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <span className="font-bold text-slate-900 text-xs">{doctor?.doctorName}</span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-100 space-y-2 text-xs shadow-sm">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase">
                        Select Service
                      </label>
                      <select
                        value={selectedServiceId || website.services?.[0]?.id || ""}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      >
                        {website.services?.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-100 space-y-2 text-xs shadow-sm">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase">
                        Preferred Time Slot
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        {[
                          "Today, 4:30 PM",
                          "Tomorrow, 10:00 AM",
                          "Tomorrow, 2:00 PM",
                          "Next Day, 11:30 AM",
                        ].map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setSelectedDate(slot)}
                            className={`p-2 rounded-xl text-center font-bold border transition-all ${
                              selectedDate === slot
                                ? "bg-teal-50 border-teal-600 text-teal-800 shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-100 space-y-2 text-xs shadow-sm">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase">
                        Patient Details
                      </label>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-white text-xs font-black shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center space-x-1.5"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm & Book Appointment</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ─────── TAB: DOCTOR PROFILE ─────── */}
            {activeTab === "doctor" && (
              <div className="p-3.5 space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <h3 className="text-xs font-black text-slate-900">Doctor Profile & Bio</h3>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center space-y-2 shadow-sm">
                  <img
                    src={doctorPhoto}
                    alt={doctor?.doctorName || "Doctor"}
                    className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-teal-500 shadow-md"
                  />
                  <h4 className="text-sm font-black text-slate-900">{doctor?.doctorName}</h4>
                  <p className="text-xs font-bold text-teal-700">{doctor?.title}</p>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 rounded-full text-[10px] text-slate-600 font-semibold">
                    {doctor?.qualification}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-2 shadow-sm">
                  <h5 className="text-[11px] font-bold text-slate-900 uppercase">About the Doctor</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {doctor?.about || "Dedicated to providing high quality healthcare to all patients."}
                  </p>
                </div>

                {/* Gallery preview in app */}
                {website.gallery && website.gallery.length > 0 && (
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-2 shadow-sm">
                    <h5 className="text-[11px] font-bold text-slate-900 uppercase">Clinic Photo Tour</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {website.gallery.map((g) => (
                        <div key={g.id} className="rounded-xl overflow-hidden border border-slate-100">
                          <img src={g.url} alt="" className="w-full h-20 object-cover" />
                          <span className="block text-[9px] p-1 text-slate-500 truncate bg-slate-50">
                            {g.caption}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─────── TAB: CONTACT ─────── */}
            {activeTab === "contact" && (
              <div className="p-3.5 space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <h3 className="text-xs font-black text-slate-900">Contact & Clinic Info</h3>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-3 shadow-sm text-xs">
                  <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Direct Phone</span>
                      <strong className="text-slate-800">{doctor?.phone || "+1 (555) 000-0000"}</strong>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">WhatsApp Chat</span>
                      <strong className="text-slate-800">{doctor?.whatsapp || doctor?.phone || "+1 (555) 000-0000"}</strong>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Address</span>
                      <span className="text-slate-700 text-[10px]">
                        {doctor?.address || "Medical Tower, Suite 301"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl text-[11px] text-teal-900 space-y-1">
                  <strong className="font-bold block">📲 Installable PWA App</strong>
                  <p className="text-[10px] text-teal-800">
                    Patients can install this app directly on iOS & Android without App Store download.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom App Tab Navigation Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-4 flex items-center justify-around z-30">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center space-y-0.5 transition-colors ${
                activeTab === "home" ? "text-teal-600 font-extrabold" : "text-slate-400 hover:text-slate-700"
              }`}
              style={{ color: activeTab === "home" ? primaryColor : undefined }}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`flex flex-col items-center space-y-0.5 transition-colors ${
                activeTab === "services" ? "text-teal-600 font-extrabold" : "text-slate-400 hover:text-slate-700"
              }`}
              style={{ color: activeTab === "services" ? primaryColor : undefined }}
            >
              <Stethoscope className="w-4 h-4" />
              <span className="text-[9px]">Services</span>
            </button>

            {/* Floating Center Book Button */}
            <button
              onClick={() => setActiveTab("book")}
              className="flex flex-col items-center -mt-4 transition-transform hover:scale-105"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold mt-0.5 text-slate-800">Book</span>
            </button>

            <button
              onClick={() => setActiveTab("doctor")}
              className={`flex flex-col items-center space-y-0.5 transition-colors ${
                activeTab === "doctor" ? "text-teal-600 font-extrabold" : "text-slate-400 hover:text-slate-700"
              }`}
              style={{ color: activeTab === "doctor" ? primaryColor : undefined }}
            >
              <User className="w-4 h-4" />
              <span className="text-[9px]">Doctor</span>
            </button>

            <button
              onClick={() => setActiveTab("contact")}
              className={`flex flex-col items-center space-y-0.5 transition-colors ${
                activeTab === "contact" ? "text-teal-600 font-extrabold" : "text-slate-400 hover:text-slate-700"
              }`}
              style={{ color: activeTab === "contact" ? primaryColor : undefined }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-[9px]">Contact</span>
            </button>
          </div>

          {/* Home indicator bar */}
          <div className="bg-white/95 pb-1 flex justify-center">
            <div className="w-28 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
