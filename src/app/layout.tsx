import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Parth Kachhela | Full Stack Developer (MERN, Next.js)",
  description:
    "Parth Kachhela is a Full Stack Developer specializing in MERN Stack, Next.js, TypeScript, and modern web technologies. Explore projects, skills, and experience.",
  keywords: [
    "Parth Kachhela",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer Portfolio",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer India",
  ],
  authors: [{ name: "Parth Kachhela" }],
  creator: "Parth Kachhela",
  openGraph: {
    title: "Parth Kachhela | Full Stack Developer",
    description:
      "Modern Full Stack Developer portfolio showcasing projects, skills, and experience.",
    url: "https://your-portfolio-domain.com",
    siteName: "Parth Kachhela Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Parth Kachhela Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="3f942a6c-8b37-4726-ae75-4ad51b4bcf80"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}
