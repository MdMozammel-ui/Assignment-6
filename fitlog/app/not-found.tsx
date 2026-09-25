"use client";

import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">

        <div className="not-found-icon">
          <Dumbbell size={28} />
        </div>

        <p className="eyebrow">FITLOG</p>

        <h1>404</h1>

        <h2>WORKOUT NOT FOUND</h2>

        <p>
          The workout or page you are looking for does not exist.
        </p>

        <Link href="/" className="primary-button">
          <ArrowLeft size={16} />
          BACK TO WORKOUTS
        </Link>

      </div>
    </main>
  );
}