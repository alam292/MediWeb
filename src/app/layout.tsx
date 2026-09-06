import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProSite Builder - Create Your Professional Website in Minutes",
  description:
    "White-label website builder for doctors, clinics, dentists, therapists, and healthcare service providers. Launch your custom website without writing any code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
