import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SAMPLE_AHMED_CARE, SAMPLE_SARA_CLINIC } from "@/lib/demo-data";
import { WebsiteData } from "@/lib/types";
import WebsiteRenderer from "@/components/renderer/WebsiteRenderer";
import Link from "next/link";
import { ArrowLeft, Edit, ExternalLink, Sparkles } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getWebsiteData(slug: string): Promise<WebsiteData | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  try {
    const site = await prisma.website.findUnique({
      where: { slug: normalizedSlug },
      include: {
        profile: true,
        services: {
          orderBy: { order: "asc" },
        },
        design: true,
        gallery: true,
      },
    });

    if (site) return site as unknown as WebsiteData;
  } catch (error) {
    console.error("Database query error:", error);
  }

  // Fallback demo fixtures
  if (normalizedSlug === "ahmed-care") return SAMPLE_AHMED_CARE;
  if (normalizedSlug === "sara-clinic") return SAMPLE_SARA_CLINIC;

  return null;
}

export async function generateMetadata({ params }: PageProps) {
  const website = await getWebsiteData(params.slug);
  if (!website) return { title: "Website Not Found" };

  return {
    title: `${website.name} | ${website.profile?.title || "Professional Healthcare"}`,
    description: website.profile?.about || `Official website of ${website.name}.`,
  };
}

export default async function PublicWebsitePage({ params }: PageProps) {
  const website = await getWebsiteData(params.slug);

  if (!website) {
    notFound();
  }

  return (
    <div className="relative">
      {/* Top Demo Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-1 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="flex items-center space-x-1.5 font-semibold text-teal-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{website.name}</span>
            <span className="text-slate-400 font-normal">(/demo/{website.slug})</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400 hidden sm:inline">Template: <strong className="text-slate-200 capitalize">{website.template.replace("-", " ")}</strong></span>
          <Link
            href={`/dashboard/websites/${website.id}`}
            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded font-medium transition-colors shadow-sm"
          >
            <Edit className="w-3 h-3" />
            <span>Edit Website</span>
          </Link>
        </div>
      </div>

      {/* Unified Public Website Renderer */}
      <WebsiteRenderer website={website} />
    </div>
  );
}
