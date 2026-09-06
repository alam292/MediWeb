import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SAMPLE_AHMED_CARE, SAMPLE_SARA_CLINIC } from "@/lib/demo-data";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug.toLowerCase().trim();

    const website = await prisma.website.findUnique({
      where: { slug },
      include: {
        profile: true,
        services: {
          orderBy: { order: "asc" },
        },
        design: true,
        gallery: true,
      },
    });

    if (website) {
      return NextResponse.json(website);
    }

    // Fallback to demo seeds if not found in db
    if (slug === "ahmed-care") {
      return NextResponse.json(SAMPLE_AHMED_CARE);
    }
    if (slug === "sara-clinic") {
      return NextResponse.json(SAMPLE_SARA_CLINIC);
    }

    return NextResponse.json({ error: "Website not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching website by slug:", error);
    return NextResponse.json({ error: "Failed to fetch website" }, { status: 500 });
  }
}
