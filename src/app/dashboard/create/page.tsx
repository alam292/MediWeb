"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Laptop,
  Tablet,
  Smartphone,
  Sparkles,
  Upload,
  Palette,
  Layers,
  Image as ImageIcon,
  HelpCircle,
  ExternalLink,
  Copy,
  Calendar,
  Save,
  ChevronRight,
  Stethoscope,
  LogOut,
  Globe,
  AppWindow,
} from "lucide-react";
import { WebsiteData, ServiceData } from "@/lib/types";
import WebsiteRenderer from "@/components/renderer/WebsiteRenderer";
import MobileAppPreview from "@/components/renderer/MobileAppPreview";
import APKGeneratorModal from "@/components/APKGeneratorModal";
import { ICON_OPTIONS } from "@/components/renderer/IconHelper";
import { slugify } from "@/lib/utils";

const STEPS = [
  { id: 1, name: "Details", label: "Website & Doctor Info" },
  { id: 2, name: "Services", label: "Treatments & Fees" },
  { id: 3, name: "Template", label: "Layout Selection" },
  { id: 4, name: "Design", label: "Colors & Typography" },
  { id: 5, name: "Images", label: "Photos & Logo" },
  { id: 6, name: "Review & Create", label: "Live Launch" },
];

export default function CreateWebsiteWizardPage() {
  const router = useRouter();

  // Wizard Step
  const [currentStep, setCurrentStep] = useState(1);
  const [previewType, setPreviewType] = useState<"website" | "mobile_app">("website");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [appDevice, setAppDevice] = useState<"ios" | "android">("ios");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdWebsite, setCreatedWebsite] = useState<WebsiteData | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAPKModal, setShowAPKModal] = useState(false);

  // Live state that drives the live preview synchronously
  const [websiteData, setWebsiteData] = useState<WebsiteData>({
    id: "preview-temp-id",
    name: "Dr. Ahmed Care",
    slug: "dr-ahmed-care",
    status: "LIVE",
    template: "modern-medical",
    profile: {
      doctorName: "Dr. Ahmed Khan",
      title: "Consultant Cardiologist",
      specialization: "Preventative & Clinical Cardiology",
      qualification: "MBBS, MD (Cardiology)",
      experience: "10 Years Experience",
      about:
        "Dedicated to providing exceptional cardiovascular care through advanced diagnosis, personalized lifestyle interventions, and patient-centered clinical management.",
      phone: "+1 (555) 234-5678",
      email: "dr.ahmed@example.com",
      whatsapp: "+15552345678",
      address: "Suite 301, Premier Medical Tower, Central Avenue",
      profileImage:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
      logoImage: null,
      coverImage: null,
    },
    services: [
      {
        id: "s-1",
        name: "General Consultation",
        description: "Comprehensive medical evaluation, vitals check, and customized health advice.",
        price: "$120",
        duration: "30 mins",
        icon: "Stethoscope",
      },
      {
        id: "s-2",
        name: "Cardiac Consultation",
        description: "Specialist heart screening, ECG assessment, and hypertension management.",
        price: "$200",
        duration: "45 mins",
        icon: "HeartPulse",
      },
      {
        id: "s-3",
        name: "Online Telehealth",
        description: "Digital consultation with direct medical prescription and video review.",
        price: "$90",
        duration: "25 mins",
        icon: "Video",
      },
    ],
    gallery: [
      {
        id: "g-1",
        url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
        caption: "Clinic Examination Suite",
      },
      {
        id: "g-2",
        url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
        caption: "Cardiac Diagnostic Lab",
      },
    ],
    design: {
      primaryColor: "#0d9488",
      secondaryColor: "#0284c7",
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      fontFamily: "Modern",
      buttonStyle: "Rounded",
      headerStyle: "Modern",
    },
  });

  // Local helper for new service modal/inputs
  const [newService, setNewService] = useState<ServiceData>({
    name: "",
    description: "",
    price: "$150",
    duration: "30 mins",
    icon: "Stethoscope",
  });
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);

  // Update website details
  const updateProfileField = (field: string, val: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile!,
        [field]: val,
      },
    }));
  };

  const updateDesignField = (field: string, val: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      design: {
        ...prev.design!,
        [field]: val,
      },
    }));
  };

  // Image Upload helper using FileReader for instant Base64 preview
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "logo" | "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === "profile") {
        setWebsiteData((prev) => ({
          ...prev,
          profile: { ...prev.profile!, profileImage: base64String },
        }));
      } else if (type === "logo") {
        setWebsiteData((prev) => ({
          ...prev,
          profile: { ...prev.profile!, logoImage: base64String },
        }));
      } else if (type === "gallery") {
        setWebsiteData((prev) => ({
          ...prev,
          gallery: [
            ...prev.gallery,
            { id: `g-${Date.now()}`, url: base64String, caption: file.name.replace(/\.[^/.]+$/, "") },
          ],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Service management
  const handleAddService = () => {
    if (!newService.name.trim()) return;
    setWebsiteData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          ...newService,
          id: `srv-${Date.now()}`,
        },
      ],
    }));
    setNewService({
      name: "",
      description: "",
      price: "$150",
      duration: "30 mins",
      icon: "Stethoscope",
    });
    setShowAddServiceForm(false);
  };

  const handleDeleteService = (index: number) => {
    setWebsiteData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  // Final Submit / Create Website
  const handleCreateWebsite = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(websiteData),
      });

      if (!res.ok) {
        throw new Error("Failed to create website");
      }

      const created = await res.json();
      // Save website ID so future logins redirect straight to admin panel
      if (typeof window !== "undefined") {
        localStorage.setItem("prosite_website_id", created.id);
      }
      setCreatedWebsite(created);
    } catch (err: any) {
      alert(err.message || "Failed to create website");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (createdWebsite) {
    const publicUrl = `${window.location.origin}/demo/${createdWebsite.slug}`;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/20 animate-bounce">
            🎉
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Website Created Successfully!
            </h2>
            <p className="text-slate-500 text-sm">
              Your professional website is now configured and published live.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Website Name</span>
              <span className="font-bold text-slate-900">{createdWebsite.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Status</span>
              <span className="inline-flex items-center space-x-1 font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE</span>
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Template</span>
              <span className="font-semibold text-teal-700 capitalize">
                {createdWebsite.template.replace("-", " ")}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="block text-[11px] text-slate-400 mb-1">Public URL</span>
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2 font-mono text-xs text-slate-800">
                <span className="truncate pr-2">{publicUrl}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(publicUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setShowAPKModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:opacity-95 active:scale-[0.99] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2.5 transition-all group"
            >
              <Smartphone className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Generate Android APK (.apk)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-bold">
                Installer
              </span>
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/demo/${createdWebsite.slug}`}
                target="_blank"
                className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Open Website</span>
                <ExternalLink className="w-4 h-4" />
              </Link>

              <Link
                href={`/dashboard/websites/${createdWebsite.id}`}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all"
              >
                <span>Manage Website</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <APKGeneratorModal
            isOpen={showAPKModal}
            onClose={() => setShowAPKModal(false)}
            website={createdWebsite}
          />

          <div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("prosite_user");
                }
                router.push("/");
              }}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold inline-flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* ────────────────── TOP BAR ────────────────── */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("prosite_user");
              }
              router.push("/");
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] text-teal-600 font-extrabold uppercase tracking-wider block">
              Website & Mobile App Wizard
            </span>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              {websiteData.name || "Untitled Website"}
            </h1>
          </div>
        </div>

        {/* Website + Mobile App Preview Mode Switcher */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Main Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setPreviewType("website")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                previewType === "website"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
            <button
              onClick={() => setPreviewType("mobile_app")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                previewType === "mobile_app"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile App</span>
            </button>
          </div>

          {/* Sub-controls depending on mode */}
          {previewType === "website" ? (
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewport("desktop")}
                title="Desktop View"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  viewport === "desktop"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewport("tablet")}
                title="Tablet View"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  viewport === "tablet"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Tablet</span>
              </button>
              <button
                onClick={() => setViewport("mobile")}
                title="Mobile Web View"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  viewport === "mobile"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Mobile</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setAppDevice("ios")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  appDevice === "ios"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                iOS / iPhone
              </button>
              <button
                onClick={() => setAppDevice("android")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  appDevice === "android"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Android
              </button>
            </div>
          )}
        </div>

        {/* Quick Launch CTA */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1.5 hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Preview: Website + App</span>
          </span>
          <button
            onClick={handleCreateWebsite}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center space-x-1.5 hover:scale-105 active:scale-95 disabled:opacity-70"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? "Creating..." : "Create Website + App"}</span>
          </button>
        </div>
      </header>

      {/* ────────────────── STEPPER PROGRESS BAR ────────────────── */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-between min-w-[500px]">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center space-x-2 text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${
                  currentStep === step.id
                    ? "text-teal-700 bg-teal-50"
                    : currentStep > step.id
                    ? "text-slate-700"
                    : "text-slate-400"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    currentStep === step.id
                      ? "bg-teal-600 text-white"
                      : currentStep > step.id
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-3 h-3" /> : step.id}
                </div>
                <span>{step.name}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <div className="w-8 sm:w-12 h-0.5 bg-slate-200 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────── SPLIT-SCREEN WORKSPACE ────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT COLUMN: STEP CONTROLS (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-110px)] overflow-y-auto">
          <div className="p-6 flex-1 space-y-6">
            {/* STEP 1: DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Step 1: Website & Doctor Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Basic information that will appear across your header, hero section, and contact card.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Website / Clinic Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={websiteData.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setWebsiteData((prev) => ({
                          ...prev,
                          name: newName,
                          slug: slugify(newName),
                        }));
                      }}
                      placeholder="e.g. Ahmed Care"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      Generated slug: /demo/{websiteData.slug || "your-site"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Doctor / Professional Name *
                      </label>
                      <input
                        type="text"
                        value={websiteData.profile?.doctorName || ""}
                        onChange={(e) => updateProfileField("doctorName", e.target.value)}
                        placeholder="e.g. Dr. Ahmed Khan"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Professional Title *
                      </label>
                      <input
                        type="text"
                        value={websiteData.profile?.title || ""}
                        onChange={(e) => updateProfileField("title", e.target.value)}
                        placeholder="e.g. Consultant Cardiologist"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={websiteData.profile?.specialization || ""}
                        onChange={(e) => updateProfileField("specialization", e.target.value)}
                        placeholder="e.g. Interventional Cardiology"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Qualifications
                      </label>
                      <input
                        type="text"
                        value={websiteData.profile?.qualification || ""}
                        onChange={(e) => updateProfileField("qualification", e.target.value)}
                        placeholder="e.g. MBBS, MD, FACC"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={websiteData.profile?.experience || ""}
                      onChange={(e) => updateProfileField("experience", e.target.value)}
                      placeholder="e.g. 10 Years Experience"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      About / Biography
                    </label>
                    <textarea
                      rows={3}
                      value={websiteData.profile?.about || ""}
                      onChange={(e) => updateProfileField("about", e.target.value)}
                      placeholder="Share your clinical background, mission, and patient approach..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={websiteData.profile?.phone || ""}
                        onChange={(e) => updateProfileField("phone", e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={websiteData.profile?.whatsapp || ""}
                        onChange={(e) => updateProfileField("whatsapp", e.target.value)}
                        placeholder="+15552345678"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={websiteData.profile?.email || ""}
                        onChange={(e) => updateProfileField("email", e.target.value)}
                        placeholder="contact@example.com"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Clinic Address</label>
                      <input
                        type="text"
                        value={websiteData.profile?.address || ""}
                        onChange={(e) => updateProfileField("address", e.target.value)}
                        placeholder="Suite 101, Medical Building"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SERVICES */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Step 2: Clinical Services</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Add treatments, consultation types, pricing, and duration.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddServiceForm(!showAddServiceForm)}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                {/* Add Service Modal / Collapsible Form */}
                {showAddServiceForm && (
                  <div className="bg-slate-50 border-2 border-teal-500/40 rounded-2xl p-4 space-y-3">
                    <h3 className="font-bold text-xs text-slate-800">New Service Entry</h3>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Service Name *</label>
                      <input
                        type="text"
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        placeholder="e.g. Cardiac Health Check"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        placeholder="Details about tests, counseling, etc."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Price</label>
                        <input
                          type="text"
                          value={newService.price}
                          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                          placeholder="$150"
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={newService.duration}
                          onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                          placeholder="30 mins"
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Icon</label>
                        <select
                          value={newService.icon}
                          onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                          className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        >
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt.name} value={opt.name}>
                              {opt.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => setShowAddServiceForm(false)}
                        className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddService}
                        className="px-3 py-1 bg-teal-600 text-white font-bold rounded-lg text-xs"
                      >
                        Save Service
                      </button>
                    </div>
                  </div>
                )}

                {/* Services List */}
                <div className="space-y-2.5">
                  {websiteData.services.map((service, idx) => (
                    <div
                      key={service.id || idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-900">{service.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {service.price} • {service.duration} • {service.description}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteService(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: TEMPLATE */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Step 3: Select Template</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any template to instantly preview it in the live frame on the right.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Template 1 */}
                  <div
                    onClick={() => setWebsiteData({ ...websiteData, template: "modern-medical" })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      websiteData.template === "modern-medical"
                        ? "border-teal-600 bg-teal-50/50 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900">1. Modern Medical</h3>
                      {websiteData.template === "modern-medical" && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Clean cyan/teal accents, soft cards, rounded badges, tech-forward medical aesthetic.
                    </p>
                  </div>

                  {/* Template 2 */}
                  <div
                    onClick={() => setWebsiteData({ ...websiteData, template: "professional-doctor" })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      websiteData.template === "professional-doctor"
                        ? "border-teal-600 bg-teal-50/50 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900">2. Professional Doctor</h3>
                      {websiteData.template === "professional-doctor" && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deep navy / slate prestige styling, structured credentials card, authoritative clinical presence.
                    </p>
                  </div>

                  {/* Template 3 */}
                  <div
                    onClick={() => setWebsiteData({ ...websiteData, template: "premium-clinic" })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      websiteData.template === "premium-clinic"
                        ? "border-teal-600 bg-teal-50/50 shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900">3. Premium Clinic</h3>
                      {websiteData.template === "premium-clinic" && (
                        <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Luxury dark clinic theme, elegant typography, expansive hero photography, boutique medical touch.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: DESIGN & COLORS */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Step 4: Design & Colors</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize your colors, button curves, and typography. Updates via dynamic CSS variables.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Colors */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Primary Brand Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={websiteData.design?.primaryColor || "#0d9488"}
                          onChange={(e) => updateDesignField("primaryColor", e.target.value)}
                          className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={websiteData.design?.primaryColor || "#0d9488"}
                          onChange={(e) => updateDesignField("primaryColor", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Secondary Accent Color
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={websiteData.design?.secondaryColor || "#0284c7"}
                          onChange={(e) => updateDesignField("secondaryColor", e.target.value)}
                          className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={websiteData.design?.secondaryColor || "#0284c7"}
                          onChange={(e) => updateDesignField("secondaryColor", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preset Color Swatches */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                      Quick Healthcare Palettes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Teal Medical", primary: "#0d9488", secondary: "#0284c7" },
                        { name: "Royal Doctor", primary: "#2563eb", secondary: "#0891b2" },
                        { name: "Emerald Clinic", primary: "#059669", secondary: "#10b981" },
                        { name: "Slate Prestige", primary: "#0f172a", secondary: "#38bdf8" },
                        { name: "Rose Care", primary: "#e11d48", secondary: "#f43f5e" },
                      ].map((palette) => (
                        <button
                          key={palette.name}
                          onClick={() => {
                            setWebsiteData((prev) => ({
                              ...prev,
                              design: {
                                ...prev.design!,
                                primaryColor: palette.primary,
                                secondaryColor: palette.secondary,
                              },
                            }));
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] border border-slate-200 flex items-center space-x-1.5 bg-slate-50 hover:bg-white transition-colors"
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: palette.primary }}
                          />
                          <span>{palette.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Font Family
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Modern", "Professional", "Minimal"] as const).map((font) => (
                        <button
                          key={font}
                          onClick={() => updateDesignField("fontFamily", font)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                            websiteData.design?.fontFamily === font
                              ? "border-teal-600 bg-teal-50 text-teal-800"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Button Style */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Button Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Rounded", "Pill", "Square"] as const).map((bStyle) => (
                        <button
                          key={bStyle}
                          onClick={() => updateDesignField("buttonStyle", bStyle)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                            websiteData.design?.buttonStyle === bStyle
                              ? "border-teal-600 bg-teal-50 text-teal-800"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {bStyle}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Header Layout */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Header Layout
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Modern", "Classic", "Centered"] as const).map((hStyle) => (
                        <button
                          key={hStyle}
                          onClick={() => updateDesignField("headerStyle", hStyle)}
                          className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                            websiteData.design?.headerStyle === hStyle
                              ? "border-teal-600 bg-teal-50 text-teal-800"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {hStyle}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: IMAGES */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Step 5: Photos & Clinic Logo</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload your profile picture, practice logo, or facility gallery photos.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Doctor Profile Image */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Doctor Profile Photo</label>
                    <div className="flex items-center space-x-4">
                      {websiteData.profile?.profileImage ? (
                        <img
                          src={websiteData.profile.profileImage}
                          alt="Profile"
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <label className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer inline-flex items-center space-x-1.5 shadow-sm">
                          <Upload className="w-3.5 h-3.5 text-teal-600" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "profile")}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-slate-400 mt-1">JPEG, PNG or WebP</p>
                      </div>
                    </div>
                  </div>

                  {/* Logo Image */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Clinic Brand Logo</label>
                    <div className="flex items-center space-x-4">
                      {websiteData.profile?.logoImage ? (
                        <img
                          src={websiteData.profile.logoImage}
                          alt="Logo"
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">
                          Logo
                        </div>
                      )}
                      <div>
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
                        <p className="text-[11px] text-slate-400 mt-1">Transparent PNG recommended</p>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Upload */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-slate-700">Clinic Gallery</label>
                      <label className="px-2.5 py-1 bg-white border border-slate-200 text-teal-700 rounded-lg text-xs font-bold cursor-pointer inline-flex items-center space-x-1">
                        <Plus className="w-3 h-3" />
                        <span>Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "gallery")}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {websiteData.gallery.map((g, i) => (
                        <div key={g.id || i} className="relative rounded-xl overflow-hidden aspect-video border border-slate-200 group">
                          <img src={g.url} alt="Gallery" className="w-full h-full object-cover" />
                          <button
                            onClick={() =>
                              setWebsiteData((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((_, idx) => idx !== i),
                              }))
                            }
                            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & CREATE */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Step 6: Review & Publish</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your website and mobile app configuration is complete and ready to deploy.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Website & App Name:</span>
                    <strong className="text-slate-900">{websiteData.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Doctor Name:</span>
                    <strong className="text-slate-900">{websiteData.profile?.doctorName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Specialization:</span>
                    <strong className="text-slate-900">{websiteData.profile?.specialization}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Services Count:</span>
                    <strong className="text-slate-900">{websiteData.services.length} Listed</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Template:</span>
                    <strong className="text-teal-700 capitalize">
                      {websiteData.template.replace("-", " ")}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mobile App (PWA):</span>
                    <strong className="text-emerald-700 font-bold">Enabled (iOS & Android)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Public Slug:</span>
                    <strong className="font-mono text-slate-700">/demo/{websiteData.slug}</strong>
                  </div>
                </div>

                <button
                  onClick={handleCreateWebsite}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm rounded-xl shadow-xl shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isSubmitting ? "Creating Website & App..." : "CREATE WEBSITE & MOBILE APP NOW"}</span>
                </button>
              </div>
            )}
          </div>

          {/* STEP CONTROLS FOOTER */}
          <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentStep} of {STEPS.length}
            </span>

            {currentStep < STEPS.length ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(STEPS.length, prev + 1))}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-600/20 flex items-center space-x-1"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCreateWebsite}
                disabled={isSubmitting}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1"
              >
                <span>Create Website & App</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE WEBSITE + MOBILE APP PREVIEW (7 cols on lg) */}
        <div className="lg:col-span-7 bg-slate-200/80 p-4 sm:p-6 flex flex-col items-center justify-start overflow-y-auto h-[calc(100vh-110px)]">
          {/* Header Switcher inside Preview Column */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mb-4 bg-white/90 backdrop-blur-sm p-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setPreviewType("website")}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  previewType === "website"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>Website Preview</span>
              </button>
              <button
                onClick={() => setPreviewType("mobile_app")}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  previewType === "mobile_app"
                    ? "bg-white text-teal-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-teal-600" />
                <span>Mobile App Preview</span>
              </button>
            </div>

            {/* Sub-view switcher buttons */}
            <div className="flex items-center space-x-2">
              {previewType === "website" ? (
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewport("desktop")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all ${
                      viewport === "desktop"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Laptop className="w-3 h-3" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewport("tablet")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all ${
                      viewport === "tablet"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Tablet className="w-3 h-3" />
                    <span>Tablet</span>
                  </button>
                  <button
                    onClick={() => setViewport("mobile")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition-all ${
                      viewport === "mobile"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setAppDevice("ios")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      appDevice === "ios"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    iPhone (iOS)
                  </button>
                  <button
                    onClick={() => setAppDevice("android")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      appDevice === "android"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Android
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW CONTAINER BODY */}
          {previewType === "website" ? (
            /* Website Frame */
            <div
              className={`transition-all duration-300 bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-300 flex flex-col ${
                viewport === "desktop"
                  ? "w-full min-h-[750px]"
                  : viewport === "tablet"
                  ? "w-[768px] max-w-full min-h-[700px]"
                  : "w-[375px] max-w-full min-h-[650px]"
              }`}
            >
              {/* Frame Browser bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="bg-white px-4 py-1 rounded-md text-[10px] font-mono text-slate-500 border border-slate-200 w-2/3 text-center truncate">
                  https://prositebuilder.com/demo/{websiteData.slug}
                </div>
                <div className="w-6" />
              </div>

              {/* Embedded Live Renderer */}
              <div className="flex-1 overflow-y-auto max-h-[700px]">
                <WebsiteRenderer website={websiteData} isIframe />
              </div>
            </div>
          ) : (
            /* Dedicated Interactive Mobile App Frame */
            <div className="py-2 w-full flex justify-center">
              <MobileAppPreview website={websiteData} deviceType={appDevice} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
