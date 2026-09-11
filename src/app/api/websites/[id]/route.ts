import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/websites/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const website = await prisma.website.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        services: {
          orderBy: { order: "asc" },
        },
        design: true,
        gallery: true,
      },
    });

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json(website);
  } catch (error) {
    console.error("Error fetching website:", error);
    return NextResponse.json({ error: "Failed to fetch website" }, { status: 500 });
  }
}

// PUT /api/websites/[id] - Update website
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, template, status, profile, services, design, gallery } = body;

    // Check existing
    const existing = await prisma.website.findUnique({
      where: { id: params.id },
      include: { profile: true, design: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    // 1. Update basic website fields
    const updatedWebsite = await prisma.website.update({
      where: { id: params.id },
      data: {
        name: name !== undefined ? name : existing.name,
        template: template !== undefined ? template : existing.template,
        status: status !== undefined ? status : existing.status,
      },
    });

    // 2. Update Profile if provided
    if (profile) {
      await prisma.websiteProfile.upsert({
        where: { websiteId: params.id },
        update: {
          ...(profile.doctorName !== undefined && { doctorName: profile.doctorName }),
          ...(profile.title !== undefined && { title: profile.title }),
          ...(profile.specialization !== undefined && { specialization: profile.specialization }),
          ...(profile.qualification !== undefined && { qualification: profile.qualification }),
          ...(profile.experience !== undefined && { experience: profile.experience }),
          ...(profile.about !== undefined && { about: profile.about }),
          ...(profile.phone !== undefined && { phone: profile.phone }),
          ...(profile.email !== undefined && { email: profile.email }),
          ...(profile.whatsapp !== undefined && { whatsapp: profile.whatsapp }),
          ...(profile.address !== undefined && { address: profile.address }),
          ...(profile.profileImage !== undefined && { profileImage: profile.profileImage }),
          ...(profile.logoImage !== undefined && { logoImage: profile.logoImage }),
          ...(profile.coverImage !== undefined && { coverImage: profile.coverImage }),
        },
        create: {
          websiteId: params.id,
          doctorName: profile.doctorName || existing.name,
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
      });
    }

    // 3. Update Design if provided
    if (design) {
      await prisma.websiteDesign.upsert({
        where: { websiteId: params.id },
        update: {
          ...(design.primaryColor !== undefined && { primaryColor: design.primaryColor }),
          ...(design.secondaryColor !== undefined && { secondaryColor: design.secondaryColor }),
          ...(design.backgroundColor !== undefined && { backgroundColor: design.backgroundColor }),
          ...(design.textColor !== undefined && { textColor: design.textColor }),
          ...(design.fontFamily !== undefined && { fontFamily: design.fontFamily }),
          ...(design.buttonStyle !== undefined && { buttonStyle: design.buttonStyle }),
          ...(design.headerStyle !== undefined && { headerStyle: design.headerStyle }),
        },
        create: {
          websiteId: params.id,
          primaryColor: design.primaryColor || "#0d9488",
          secondaryColor: design.secondaryColor || "#0284c7",
          backgroundColor: design.backgroundColor || "#ffffff",
          textColor: design.textColor || "#0f172a",
          fontFamily: design.fontFamily || "Modern",
          buttonStyle: design.buttonStyle || "Rounded",
          headerStyle: design.headerStyle || "Modern",
        },
      });
    }

    // 4. Update Services if provided (replace or sync)
    if (services && Array.isArray(services)) {
      // Delete old services and insert new list
      await prisma.service.deleteMany({
        where: { websiteId: params.id },
      });

      if (services.length > 0) {
        await prisma.service.createMany({
          data: services.map((s: any, idx: number) => ({
            websiteId: params.id,
            name: s.name,
            description: s.description || "",
            price: s.price || "$100",
            duration: s.duration || "30 mins",
            icon: s.icon || "Stethoscope",
            order: idx + 1,
          })),
        });
      }
    }

    // 5. Update Gallery if provided
    if (gallery && Array.isArray(gallery)) {
      await prisma.galleryImage.deleteMany({
        where: { websiteId: params.id },
      });

      if (gallery.length > 0) {
        await prisma.galleryImage.createMany({
          data: gallery.map((g: any) => ({
            websiteId: params.id,
            url: typeof g === "string" ? g : g.url,
            caption: g.caption || null,
          })),
        });
      }
    }

    // Return complete updated website
    const result = await prisma.website.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        services: { orderBy: { order: "asc" } },
        design: true,
        gallery: true,
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error updating website:", error);
    return NextResponse.json(
      { error: "Failed to update website", message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/websites/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.website.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Website deleted" });
  } catch (error) {
    console.error("Error deleting website:", error);
    return NextResponse.json({ error: "Failed to delete website" }, { status: 500 });
  }
}
