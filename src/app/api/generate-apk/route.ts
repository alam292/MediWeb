import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, primaryColor, version = "1.0.0" } = body;

    const sanitizedSlug = slug || "doctor-clinic";
    const appName = name || "MediWeb Doctor App";
    const packageId = `com.mediweb.${sanitizedSlug.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase()}`;

    // Check candidate paths for real compiled APK
    const candidatePaths = [
      path.join(process.cwd(), "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk"),
      path.resolve(process.cwd(), "..", "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk"),
      "C:\\Users\\alam292\\OneDrive\\Desktop\\MediWeb-main\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk",
    ];

    let fileSize = "4.3 MB";
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        const stats = fs.statSync(p);
        fileSize = `${(stats.size / (1024 * 1024)).toFixed(1)} MB`;
        break;
      }
    }

    // Return APK metadata and download preparation
    return NextResponse.json({
      success: true,
      data: {
        appName,
        packageId,
        version,
        fileSize,
        targetSdk: "Android 14 (API 34)",
        fileName: `${sanitizedSlug}-v${version}.apk`,
        buildTimestamp: new Date().toISOString(),
        downloadUrl: `/api/generate-apk?slug=${encodeURIComponent(sanitizedSlug)}&name=${encodeURIComponent(appName)}&version=${encodeURIComponent(version)}`,
      },
    });
  } catch (error) {
    console.error("APK generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate APK" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "clinic-app";
  const version = searchParams.get("version") || "1.0.0";

  // Look for the actual compiled Capacitor Android APK
  const candidatePaths = [
    path.join(process.cwd(), "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk"),
    path.resolve(process.cwd(), "..", "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk"),
    "C:\\Users\\alam292\\OneDrive\\Desktop\\MediWeb-main\\android\\app\\build\\outputs\\apk\\debug\\app-debug.apk",
  ];

  let apkBuffer: Buffer | null = null;
  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      apkBuffer = fs.readFileSync(p);
      break;
    }
  }

  if (apkBuffer) {
    const uint8Array = new Uint8Array(apkBuffer);
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": `attachment; filename="${slug}-v${version}.apk"`,
        "Content-Length": uint8Array.byteLength.toString(),
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }

  return NextResponse.json(
    {
      error: "APK binary not found. Please ensure android/app/build/outputs/apk/debug/app-debug.apk exists.",
    },
    { status: 404 }
  );
}
