import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideNavBar from "./components/SideNavBar/page";
import AppStore from "./store/store";
import { Grid } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResuMe+ | AI-Powered Resume Assistant",
  description:
    "Explore my experience, skills, projects, and professional background through an AI-powered resume assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          width: "100%",
        }}
      >
          <AppStore>
            <SideNavBar />
            <main style={{ flex: 1 }}>{children}</main>
          </AppStore>
      </body>
    </html>
  );
}
