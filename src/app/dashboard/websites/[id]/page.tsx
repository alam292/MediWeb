"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Save,
  Trash2,
  Plus,
  Layers,
  Palette,
  Image as ImageIcon,
  Laptop,
  Tablet,
  Smartphone,
  Eye,
  Settings,
  CheckCircle2,
  Sparkles,
  Upload,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  LogOut,
} from "lucide-react";
import { WebsiteData, ServiceData } from "@/lib/types";
import WebsiteRenderer from "@/components/renderer/WebsiteRenderer";
import { ICON_OPTIONS } from "@/components/renderer/IconHelper";

export default function ManageWebsitePage() {
  const params = useParams();
  const router = useRouter();
  const websiteId = params.id as string;

  const [activeTab, setActiveTab] = useState<
    "overview" | "details" | "services" | "appointments" | "design" | "images" | "preview" | "mobile"
  >("overview");

  // Demo appointments data
  const [appointments] = useState([
    {
      id: "apt-1",
      patientName: "Ali Hassan",
      email: "ali.hassan@gmail.com",
      phone: "+92 300 1234567",
      service: "General Consultation",
      date: "2026-09-05",
      time: "10:00 AM",
      status: "confirmed",
      notes: "Follow-up for blood pressure check",
    },
    {
      id: "apt-2",
      patientName: "Sara Malik",
      email: "sara.malik@outlook.com",
      phone: "+92 321 9876543",
      service: "Cardiac Consultation",
      date: "2026-09-05",
      time: "11:30 AM",
      status: "pending",
      notes: "First-time patient, chest pain complaints",
    },
    {
      id: "apt-3",
      patientName: "Usman Raza",
      email: "usman.raza@yahoo.com",
      phone: "+92 333 5556789",
      service: "Online Telehealth",
      date: "2026-09-06",
      time: "02:00 PM",
      status: "confirmed",
      notes: "Prescription renewal request",
    },
    {
      id: "apt-4",
      patientName: "Hina Shaikh",
      email: "hina.shaikh@gmail.com",
      phone: "+92 345 2223344",
      service: "General Consultation",
      date: "2026-09-07",
      time: "09:00 AM",
      status: "cancelled",
      notes: "Patient cancelled due to travel",
    },
    {
      id: "apt-5",
      patientName: "Bilal Ahmed",
      email: "bilal.ahmed@hotmail.com",
      phone: "+92 311 7778899",
      service: "Cardiac Consultation",
      date: "2026-09-08",
      time: "03:30 PM",
      status: "pending",
      notes: "ECG results review",
    },
  ]);
  const [website, setWebsite] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // New service inputs
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState<ServiceData>({
    name: "",
    description: "",
    price: "$100",
    duration: "30 mins",
    icon: "Stethoscope",
  });

  useEffect(() => {
    async function loadWebsite() {
      try {
        setLoading(true);
        const res = await fetch(`/api/websites/${websiteId}`);
        if (res.ok) {
          const data = await res.json();
          setWebsite(data);
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (websiteId) {
      loadWebsite();
    }
  }, [websiteId, router]);

  const handleSave = async () => {
    if (!website) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/websites/${websiteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(website),
      });
      if (res.ok) {
        const updated = await res.json();
        setWebsite(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert("Failed to save changes");
      }
    } catch (err) {
      alert("Error saving website");
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (!website) return;
    const url = `${window.location.origin}/demo/${website.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateProfile = (field: string, val: string) => {
    if (!website) return;
    setWebsite({
      ...website,
      profile: {
        ...website.profile!,
        [field]: val,
      },
    });
  };

  const updateDesign = (field: string, val: string) => {
    if (!website) return;
    setWebsite({
      ...website,
      design: {
        ...website.design!,
        [field]: val,
      },
    });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "logo" | "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !website) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === "profile") {
        setWebsite({
          ...website,
          profile: { ...website.profile!, profileImage: base64String },
        });
      } else if (type === "logo") {
        setWebsite({
          ...website,
          profile: { ...website.profile!, logoImage: base64String },
        });
      } else if (type === "gallery") {
        setWebsite({
          ...website,
          gallery: [
            ...website.gallery,
            { id: `g-${Date.now()}`, url: base64String, caption: file.name.replace(/\.[^/.]+$/, "") },
          ],
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddService = () => {
    if (!website || !newService.name.trim()) return;
    setWebsite({
      ...website,
      services: [
        ...website.services,
        { ...newService, id: `srv-${Date.now()}`, order: website.services.length + 1 },
      ],
    });
    setNewService({
      name: "",
      description: "",
      price: "$100",
      duration: "30 mins",
      icon: "Stethoscope",
    });
    setShowAddService(false);
  };

  const handleDeleteService = (index: number) => {
    if (!website) return;
    setWebsite({
      ...website,
      services: website.services.filter((_, i) => i !== index),
    });
  };

  if (loading || !website) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-bold">Loading website editor...</p>
        </div>
      </div>
    );
  }

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/demo/${website.slug}` : `/demo/${website.slug}`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 pb-16">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-slate-900">{website.name}</h1>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">/demo/{website.slug}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {savedSuccess && (
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Saved successfully!</span>
            </span>
          )}

          <Link
            href={`/demo/${website.slug}`}
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-sm flex items-center space-x-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Website</span>
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center space-x-1.5 disabled:opacity-70"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Tabs Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-4 overflow-x-auto text-xs font-bold">
          {(
            [
              { id: "overview", label: "Overview" },
              { id: "details", label: "Details" },
              { id: "services", label: "Services" },
              { id: "appointments", label: "Appointments" },
              { id: "design", label: "Design" },
              { id: "images", label: "Images" },
              { id: "mobile", label: "Mobile App" },
              { id: "preview", label: "Live Preview" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-teal-600 text-teal-700 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 w-full flex-1">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{website.name}</h2>
                  <p className="text-xs text-slate-500">
                    Lead Practitioner: {website.profile?.doctorName} • {website.profile?.title}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                  </button>
                  <Link
                    href={`/demo/${website.slug}`}
                    target="_blank"
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Public Page</span>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Status</span>
                  <span className="font-bold text-emerald-600 text-sm flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>LIVE</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Active Template</span>
                  <span className="font-bold text-teal-700 capitalize text-sm">
                    {website.template.replace("-", " ")}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-1">Services Listed</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {website.services?.length || 0} Consultations
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Instant Live Deployment</span>
                  <span className="text-[11px] text-teal-800">
                    Any edits you save on this manage dashboard immediately update the live public website at <strong>/demo/{website.slug}</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("services")}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold whitespace-nowrap"
                >
                  Edit Services
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILS */}
        {activeTab === "details" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Practitioner & Clinic Details</h2>
              <p className="text-xs text-slate-500">Edit qualifications, biography, and contact numbers.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website Name</label>
                  <input
                    type="text"
                    value={website.name}
                    onChange={(e) => setWebsite({ ...website, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    value={website.profile?.doctorName || ""}
                    onChange={(e) => updateProfile("doctorName", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={website.profile?.title || ""}
                    onChange={(e) => updateProfile("title", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    value={website.profile?.specialization || ""}
                    onChange={(e) => updateProfile("specialization", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={website.profile?.qualification || ""}
                    onChange={(e) => updateProfile("qualification", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={website.profile?.experience || ""}
                    onChange={(e) => updateProfile("experience", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">About / Bio</label>
                <textarea
                  rows={4}
                  value={website.profile?.about || ""}
                  onChange={(e) => updateProfile("about", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={website.profile?.phone || ""}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={website.profile?.whatsapp || ""}
                    onChange={(e) => updateProfile("whatsapp", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={website.profile?.email || ""}
                    onChange={(e) => updateProfile("email", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={website.profile?.address || ""}
                  onChange={(e) => updateProfile("address", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-600/20"
              >
                {saving ? "Saving..." : "Save Details"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === "services" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Manage Services</h2>
                <p className="text-xs text-slate-500">Add, edit pricing, or remove consultation offerings.</p>
              </div>
              <button
                onClick={() => setShowAddService(!showAddService)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {showAddService && (
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-teal-500/40 space-y-3 text-xs">
                <h3 className="font-bold text-slate-900">New Service</h3>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="e.g. Specialized Consultation"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Service description"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price</label>
                    <input
                      type="text"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      placeholder="$120"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      placeholder="30 mins"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Icon</label>
                    <select
                      value={newService.icon}
                      onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    >
                      {ICON_OPTIONS.map((o) => (
                        <option key={o.name} value={o.name}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setShowAddService(false)}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddService}
                    className="px-3 py-1 bg-teal-600 text-white font-bold rounded-lg text-xs"
                  >
                    Add Service
                  </button>
                </div>
              </div>
            )}

            {/* List of existing services with inline editing */}
            <div className="space-y-3">
              {website.services.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => {
                        const updated = [...website.services];
                        updated[idx].name = e.target.value;
                        setWebsite({ ...website, services: updated });
                      }}
                      className="font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-teal-500 focus:outline-none w-full text-sm"
                    />
                    <input
                      type="text"
                      value={s.description}
                      onChange={(e) => {
                        const updated = [...website.services];
                        updated[idx].description = e.target.value;
                        setWebsite({ ...website, services: updated });
                      }}
                      className="text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-teal-500 focus:outline-none w-full text-xs"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={s.price}
                      onChange={(e) => {
                        const updated = [...website.services];
                        updated[idx].price = e.target.value;
                        setWebsite({ ...website, services: updated });
                      }}
                      className="w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center font-bold"
                    />
                    <input
                      type="text"
                      value={s.duration}
                      onChange={(e) => {
                        const updated = [...website.services];
                        updated[idx].duration = e.target.value;
                        setWebsite({ ...website, services: updated });
                      }}
                      className="w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg text-center"
                    />
                    <button
                      onClick={() => handleDeleteService(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-600/20"
              >
                {saving ? "Saving..." : "Save Services"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Patient Appointments</h2>
                <p className="text-xs text-slate-500">View and manage all incoming appointment bookings.</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold">
                  {appointments.filter((a) => a.status === "confirmed").length} Confirmed
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                  {appointments.filter((a) => a.status === "pending").length} Pending
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 font-black flex items-center justify-center text-sm flex-shrink-0">
                        {apt.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{apt.patientName}</p>
                        <p className="text-xs text-slate-500">{apt.service}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        apt.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : apt.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          apt.status === "confirmed"
                            ? "bg-emerald-500"
                            : apt.status === "pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                      <span>{apt.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                      <span className="truncate">{apt.email}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {apt.notes && (
                    <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                      <span className="font-bold text-slate-700">Notes: </span>{apt.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DESIGN & TEMPLATE (was TAB 4) */}
        {activeTab === "design" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Design & Template</h2>
              <p className="text-xs text-slate-500">Switch template or customize colors and typography.</p>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Template Layout</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "modern-medical", title: "Modern Medical", desc: "Cyan/teal soft clinic aesthetic" },
                  { id: "professional-doctor", title: "Professional Doctor", desc: "Authoritative navy / prestige" },
                  { id: "premium-clinic", title: "Premium Clinic", desc: "Luxury dark boutique clinic theme" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setWebsite({ ...website, template: t.id as any })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      website.template === t.id
                        ? "border-teal-600 bg-teal-50/50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{t.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={website.design?.primaryColor || "#0d9488"}
                    onChange={(e) => updateDesign("primaryColor", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={website.design?.primaryColor || "#0d9488"}
                    onChange={(e) => updateDesign("primaryColor", e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Secondary Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={website.design?.secondaryColor || "#0284c7"}
                    onChange={(e) => updateDesign("secondaryColor", e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={website.design?.secondaryColor || "#0284c7"}
                    onChange={(e) => updateDesign("secondaryColor", e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono w-full"
                  />
                </div>
              </div>
            </div>

            {/* Button Style & Font */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Button Style</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {(["Rounded", "Pill", "Square"] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => updateDesign("buttonStyle", b)}
                      className={`py-2 rounded-xl border ${
                        website.design?.buttonStyle === b
                          ? "border-teal-600 bg-teal-50 text-teal-800"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Typography</label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {(["Modern", "Professional", "Minimal"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => updateDesign("fontFamily", f)}
                      className={`py-2 rounded-xl border ${
                        website.design?.fontFamily === f
                          ? "border-teal-600 bg-teal-50 text-teal-800"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-600/20"
              >
                {saving ? "Saving..." : "Save Design"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: IMAGES */}
        {activeTab === "images" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Images & Media</h2>
              <p className="text-xs text-slate-500">Update doctor photo, practice logo, and clinic gallery.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Profile Photo */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Doctor Profile Photo</label>
                <div className="flex items-center space-x-4">
                  {website.profile?.profileImage && (
                    <img
                      src={website.profile.profileImage}
                      alt="Doctor"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                  )}
                  <label className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer inline-flex items-center space-x-1.5 shadow-sm">
                    <Upload className="w-3.5 h-3.5 text-teal-600" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "profile")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Logo */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Practice Logo</label>
                <div className="flex items-center space-x-4">
                  {website.profile?.logoImage && (
                    <img
                      src={website.profile.logoImage}
                      alt="Logo"
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                  )}
                  <label className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer inline-flex items-center space-x-1.5 shadow-sm">
                    <Upload className="w-3.5 h-3.5 text-teal-600" />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-600/20"
              >
                {saving ? "Saving..." : "Save Images"}
              </button>
            </div>
          </div>
        )}

        {/* TAB: MOBILE APP */}
        {activeTab === "mobile" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Mobile App (PWA)</h2>
              <p className="text-xs text-slate-500">Your website is instantly available as a mobile app. Patients can install it directly from the browser.</p>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-sm">
              <h3 className="font-bold text-base mb-2">How to install your App:</h3>
              <ol className="list-decimal list-inside space-y-2 text-teal-800">
                <li>Open your public website link on a mobile device.</li>
                <li>Tap the browser menu (Chrome, Safari, etc.).</li>
                <li>Select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.</li>
                <li>Your clinic's app will now appear on the device home screen!</li>
              </ol>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 mb-1">Share Mobile App Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={publicUrl}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs whitespace-nowrap"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PREVIEW */}
        {activeTab === "preview" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button
                  onClick={() => setViewport("desktop")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 ${
                    viewport === "desktop" ? "bg-teal-600 text-white" : "text-slate-500"
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 ${
                    viewport === "tablet" ? "bg-teal-600 text-white" : "text-slate-500"
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 ${
                    viewport === "mobile" ? "bg-teal-600 text-white" : "text-slate-500"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <Link
                href={`/demo/${website.slug}`}
                target="_blank"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-sm inline-flex items-center space-x-1.5"
              >
                <span>Open Fullscreen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex justify-center">
              <div
                className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-300 transition-all ${
                  viewport === "desktop"
                    ? "w-full"
                    : viewport === "tablet"
                    ? "w-[768px]"
                    : "w-[375px]"
                }`}
              >
                <WebsiteRenderer website={website} isIframe />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
