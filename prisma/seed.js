const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@prositebuilder.com" },
    update: {},
    create: {
      email: "demo@prositebuilder.com",
      name: "Demo Practitioner",
      password: "password123",
    },
  });

  // Delete existing demo websites to ensure clean seed
  await prisma.website.deleteMany({
    where: {
      slug: {
        in: ["ahmed-care", "sara-clinic"],
      },
    },
  });

  // 1. Ahmed Care
  const ahmedCare = await prisma.website.create({
    data: {
      name: "Ahmed Care",
      slug: "ahmed-care",
      status: "LIVE",
      template: "modern-medical",
      userId: user.id,
      profile: {
        create: {
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
      },
      services: {
        create: [
          {
            name: "General Consultation",
            description:
              "Comprehensive health review, vitals evaluation, cardiovascular risk assessment, and personalized health roadmap.",
            price: "$120",
            duration: "30 mins",
            icon: "Stethoscope",
            order: 1,
          },
          {
            name: "Cardiac Consultation",
            description:
              "Advanced cardiovascular diagnosis, ECG interpretation, echocardiogram review, and tailored hypertension management.",
            price: "$200",
            duration: "45 mins",
            icon: "HeartPulse",
            order: 2,
          },
          {
            name: "Online Consultation",
            description:
              "Secure high-definition telehealth review, medical reports assessment, digital prescriptions, and follow-up guidance.",
            price: "$95",
            duration: "25 mins",
            icon: "Video",
            order: 3,
          },
          {
            name: "Executive Heart Screening",
            description:
              "Full preventive cardiac panel including stress ECG, lipid profile review, and personalized preventative counseling.",
            price: "$350",
            duration: "60 mins",
            icon: "Activity",
            order: 4,
          },
        ],
      },
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
            caption: "Advanced Consultation Suite",
          },
          {
            url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
            caption: "State-of-the-art Diagnostics",
          },
          {
            url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
            caption: "Executive Patient Waiting Lounge",
          },
        ],
      },
      design: {
        create: {
          primaryColor: "#0d9488",
          secondaryColor: "#0284c7",
          backgroundColor: "#ffffff",
          textColor: "#0f172a",
          fontFamily: "Modern",
          buttonStyle: "Rounded",
          headerStyle: "Modern",
        },
      },
    },
  });

  // 2. Dr. Sara Clinic
  const saraClinic = await prisma.website.create({
    data: {
      name: "Dr. Sara Clinic",
      slug: "sara-clinic",
      status: "LIVE",
      template: "professional-doctor",
      userId: user.id,
      profile: {
        create: {
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
      },
      services: {
        create: [
          {
            name: "Smile Makeover Consultation",
            description:
              "Comprehensive 3D intraoral scan, aesthetic analysis, digital smile preview, and customized treatment planning.",
            price: "$150",
            duration: "40 mins",
            icon: "Smile",
            order: 1,
          },
          {
            name: "Invisalign Clear Aligners",
            description:
              "Discreet orthodontic realignment using virtually invisible custom aligners tailored to your lifestyle.",
            price: "$2,800",
            duration: "45 mins",
            icon: "Sparkles",
            order: 2,
          },
          {
            name: "Laser Teeth Whitening",
            description:
              "In-office safe enamel brightening system achieving up to 8 shades lighter in a single comfortable session.",
            price: "$320",
            duration: "60 mins",
            icon: "Zap",
            order: 3,
          },
        ],
      },
      gallery: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
            caption: "Painless Dental Operatory",
          },
          {
            url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
            caption: "Digital 3D Smile Studio",
          },
        ],
      },
      design: {
        create: {
          primaryColor: "#2563eb",
          secondaryColor: "#0891b2",
          backgroundColor: "#ffffff",
          textColor: "#1e293b",
          fontFamily: "Professional",
          buttonStyle: "Pill",
          headerStyle: "Modern",
        },
      },
    },
  });

  console.log("Database seeded successfully with:", ahmedCare.name, "and", saraClinic.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
