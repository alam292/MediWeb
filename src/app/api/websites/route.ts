import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// GET /api/websites - List all websites
export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      include: {
        profile: true,
        services: {
          orderBy: { order: "asc" },
        },
        design: true,
        gallery: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(websites);
  } catch (error) {
    console.error("Error fetching websites:", error);
    return NextResponse.json({ error: "Failed to fetch websites" }, { status: 500 });
  }
}

// POST /api/websites - Create a new website
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, template, profile, services, design, gallery } = body;

    if (!name) {
      return NextResponse.json({ error: "Website name is required" }, { status: 400 });
    }

    // Generate slug
    let baseSlug = slugify(name);
    if (!baseSlug) baseSlug = "my-site";

    let slug = baseSlug;
    let counter = 1;
    while (await prisma.website.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Default demo user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "demo@prositebuilder.com",
          name: "Demo Practitioner",
        },
      });
    }

    const website = await prisma.website.create({
      data: {
        name,
        slug,
        status: "LIVE",
        template: template || "modern-medical",
        userId: user.id,
        profile: profile
          ? {
              create: {
                doctorName: profile.doctorName || name,
                title: profile.title || "Healthcare Specialist",
                specialization: profile.specialization || "General Medicine",
                qualification: profile.qualification || "MBBS",
                experience: profile.experience || "5+ Years",
                about: profile.about || "",
                phone: profile.phone || "",
                email: profile.email || "",
                whatsapp: profile.whatsapp || "",
                address: profile.address || "",
                profileImage: profile.profileImage || null,
                logoImage: profile.logoImage || null,
                coverImage: profile.coverImage || null,
              },
            }
          : undefined,
        services: services && Array.isArray(services) && services.length > 0
          ? {
              create: services.map((s: any, idx: number) => ({
                name: s.name,
                description: s.description || "",
                price: s.price || "$100",
                duration: s.duration || "30 mins",
                icon: s.icon || "Stethoscope",
                order: idx + 1,
              })),
            }
          : undefined,
        design: design
          ? {
              create: {
                primaryColor: design.primaryColor || "#0d9488",
                secondaryColor: design.secondaryColor || "#0284c7",
                backgroundColor: design.backgroundColor || "#ffffff",
                textColor: design.textColor || "#0f172a",
                fontFamily: design.fontFamily || "Modern",
                buttonStyle: design.buttonStyle || "Rounded",
                headerStyle: design.headerStyle || "Modern",
              },
            }
          : undefined,
        gallery: gallery && Array.isArray(gallery) && gallery.length > 0
          ? {
              create: gallery.map((g: any) => ({
                url: typeof g === "string" ? g : g.url,
                caption: g.caption || null,
              })),
            }
          : undefined,
      },
      include: {
        profile: true,
        services: true,
        design: true,
        gallery: true,
      },
    });

    return NextResponse.json(website, { status: 201 });
  } catch (error) {
    console.error("Error creating website:", error);
    return NextResponse.json({ error: "Failed to create website" }, { status: 500 });
  }
}
