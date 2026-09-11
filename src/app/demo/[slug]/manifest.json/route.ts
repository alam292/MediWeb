import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SAMPLE_AHMED_CARE, SAMPLE_SARA_CLINIC } from "@/lib/demo-data";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const normalizedSlug = params.slug.toLowerCase().trim();
  let website: any = null;

  try {
    website = await prisma.website.findUnique({
      where: { slug: normalizedSlug },
      include: {
        profile: true,
        design: true,
      },
    });
  } catch (error) {
    console.error("Database query error:", error);
  }

  // Fallback demo fixtures
  if (!website) {
    if (normalizedSlug === "ahmed-care") website = SAMPLE_AHMED_CARE;
    else if (normalizedSlug === "sara-clinic") website = SAMPLE_SARA_CLINIC;
  }

  if (!website) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const primaryColor = website.design?.primaryColor || "#0d9488";
  const backgroundColor = website.design?.backgroundColor || "#ffffff";
  const appName = website.name;
  const description = website.profile?.about || `Official app of ${appName}.`;

  const manifest = {
    name: appName,
    short_name: appName,
    description: description,
    start_url: `/demo/${normalizedSlug}`,
    display: "standalone",
    background_color: backgroundColor,
    theme_color: primaryColor,
    icons: [
      {
        src: website.profile?.logoImage || "/favicon.ico",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: website.profile?.logoImage || "/favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
