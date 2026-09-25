import type { Metadata } from "next";
import "./globals.css";
import { PlanProvider } from "../context/PlanContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a modern workout library and daily workout planning application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}