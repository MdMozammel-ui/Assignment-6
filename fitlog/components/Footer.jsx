import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="logo-icon">
            <Dumbbell size={18} />
          </span>

          <span>FITLOG</span>
        </div>

        <p>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}