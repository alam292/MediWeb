"use client";

import React from "react";
import {
  Stethoscope,
  HeartPulse,
  Video,
  Activity,
  Smile,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Check,
  CheckCircle2,
  ExternalLink,
  Award,
  BookOpen,
  User,
  Star,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  HelpCircle,
  Building,
  Layers,
  Palette,
  Laptop,
  Tablet,
  Smartphone,
  Copy,
  Edit,
  Trash2,
  Eye,
  Plus,
  ArrowLeft,
  Sparkle,
  Upload,
} from "lucide-react";

export const ICON_OPTIONS = [
  { name: "Stethoscope", label: "Consultation / Doctor" },
  { name: "HeartPulse", label: "Cardiology / Heart" },
  { name: "Video", label: "Online Telehealth" },
  { name: "Activity", label: "Health Screening / Diagnostic" },
  { name: "Smile", label: "Dental / Smile Design" },
  { name: "Sparkles", label: "Aesthetic / Cosmetic" },
  { name: "Zap", label: "Laser / Rapid Treatment" },
  { name: "Shield", label: "Preventative Care" },
  { name: "Award", label: "Specialized Treatment" },
  { name: "BookOpen", label: "Education & Therapy" },
];

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className = "w-5 h-5" }: DynamicIconProps) {
  switch (name) {
    case "Stethoscope":
      return <Stethoscope className={className} />;
    case "HeartPulse":
      return <HeartPulse className={className} />;
    case "Video":
      return <Video className={className} />;
    case "Activity":
      return <Activity className={className} />;
    case "Smile":
      return <Smile className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "Shield":
      return <Shield className={className} />;
    case "Award":
      return <Award className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    default:
      return <Stethoscope className={className} />;
  }
}
