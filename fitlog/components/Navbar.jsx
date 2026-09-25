"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();

  const { planCount, savedCount } = usePlan();

  return (
    <header className="site-header">
      <div className="container navbar">
        {/* Logo */}
        <Link href="/" className="logo">
          <span className="logo-icon">
            <Dumbbell size={20} strokeWidth={2.5} />
          </span>

          <span>FITLOG</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link
            href="/"
            className={pathname === "/" ? "nav-link active" : "nav-link"}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan" ? "nav-link active" : "nav-link"
            }
          >
            MY PLAN
          </Link>
        </nav>

        {/* Counters */}
        <div className="nav-counters">
          <Link href="/my-plan" className="counter plan-counter">
            <span>PLAN</span>
            <strong>{planCount}</strong>
          </Link>

          <Link href="/my-plan" className="counter saved-counter">
            <span>SAVED</span>
            <strong>{savedCount}</strong>
          </Link>
        </div>
      </div>
    </header>
  );
}