import type { Metadata } from "next";
import "./globals.css";
import { PlanProvider } from "../context/PlanContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#121513",
                color: "#f4f5f0",
                border: "1px solid #292e2a",
              },
            }}
          />

          <Navbar />

          <main>{children}</main>

          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}