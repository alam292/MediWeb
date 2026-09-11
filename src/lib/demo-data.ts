import { WebsiteData } from "./types";

export const SAMPLE_AHMED_CARE: WebsiteData = {
  id: "demo-ahmed-care-id",
  name: "Ahmed Care",
  slug: "ahmed-care",
  status: "LIVE",
  template: "modern-medical",
  profile: {
    doctorName: "Dr. Ahmed Khan",
    title: "Senior Consultant Cardiologist",
    specialization: "Cardiology & Interventional Heart Care",
    qualification: "MBBS, MD (Cardiology), FACC (USA)",
    experience: "12+ Years Experience",
    about:
      "Dr. Ahmed Khan is a renowned cardiologist specializing in cardiovascular health, non-invasive heart screenings, coronary interventions, and preventative cardiology. Having treated over 15,000 patients across leading medical centers, he brings compassionate, evidence-based care to every consultation.",
    phone: "+1 (555) 234-5678",
    email: "contact@ahmedcare.com",
    whatsapp: "+15552345678",
    address: "Suite 402, Metro Cardiology Center, 850 Health Blvd, Medical City",
    profileImage:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=200&auto=format&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
  },
  services: [
    {
      id: "srv-1",
      name: "General Consultation",
      description:
        "Comprehensive health review, vitals evaluation, cardiovascular risk assessment, and personalized health roadmap.",
      price: "$120",
      duration: "30 mins",
      icon: "Stethoscope",
      order: 1,
    },
    {
      id: "srv-2",
      name: "Cardiac Consultation",
      description:
        "Advanced cardiovascular diagnosis, ECG interpretation, echocardiogram review, and tailored hypertension management.",
      price: "$200",
      duration: "45 mins",
      icon: "HeartPulse",
      order: 2,
    },
    {
      id: "srv-3",
      name: "Online Consultation",
      description:
        "Secure high-definition telehealth review, medical reports assessment, digital prescriptions, and follow-up guidance.",
      price: "$95",
      duration: "25 mins",
      icon: "Video",
      order: 3,
    },
    {
      id: "srv-4",
      name: "Executive Heart Screening",
      description:
        "Full preventive cardiac panel including stress ECG, lipid profile review, and personalized preventative counseling.",
      price: "$350",
      duration: "60 mins",
      icon: "Activity",
      order: 4,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
      caption: "Advanced Consultation Suite",
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
      caption: "State-of-the-art Diagnostics",
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      caption: "Executive Patient Waiting Lounge",
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
};

export const SAMPLE_SARA_CLINIC: WebsiteData = {
  id: "demo-sara-clinic-id",
  name: "Dr. Sara Clinic",
  slug: "sara-clinic",
  status: "LIVE",
  template: "professional-doctor",
  profile: {
    doctorName: "Dr. Sara Al-Mansoor",
    title: "Lead Aesthetic Dentist & Orthodontist",
    specialization: "Advanced Smile Design & Orthodontics",
    qualification: "BDS, MDS (Orthodontics), Invisalign Gold Provider",
    experience: "9+ Years Experience",
    about:
      "Dr. Sara Al-Mansoor is dedicated to crafting radiant, confident smiles using gentle techniques and modern digital dentistry. Known for her patient-centered approach and attention to detail, she transforms smiles for patients of all ages.",
    phone: "+1 (555) 890-1234",
    email: "hello@drsaraclinic.com",
    whatsapp: "+15558901234",
    address: "22 Dental Plaza, 5th Avenue, Westside Health District",
    profileImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    logoImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=200&auto=format&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
  },
  services: [
    {
      id: "sara-srv-1",
      name: "Smile Makeover Consultation",
      description:
        "Comprehensive 3D intraoral scan, aesthetic analysis, digital smile preview, and customized treatment planning.",
      price: "$150",
      duration: "40 mins",
      icon: "Smile",
      order: 1,
    },
    {
      id: "sara-srv-2",
      name: "Invisalign Clear Aligners",
      description:
        "Discreet orthodontic realignment using virtually invisible custom aligners tailored to your lifestyle.",
      price: "$2,800",
      duration: "45 mins",
      icon: "Sparkles",
      order: 2,
    },
    {
      id: "sara-srv-3",
      name: "Laser Teeth Whitening",
      description:
        "In-office safe enamel brightening system achieving up to 8 shades lighter in a single comfortable session.",
      price: "$320",
      duration: "60 mins",
      icon: "Zap",
      order: 3,
    },
  ],
  gallery: [
    {
      id: "sara-gal-1",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
      caption: "Painless Dental Operatory",
    },
    {
      id: "sara-gal-2",
      url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
      caption: "Digital 3D Smile Studio",
    },
  ],
  design: {
    primaryColor: "#2563eb",
    secondaryColor: "#0891b2",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    fontFamily: "Professional",
    buttonStyle: "Pill",
    headerStyle: "Modern",
  },
};
