// src/pages/Welcome.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../components/welcome.css";
import heroImg from "../assets/icon.png";

export default function Welcome() {
    const navigate = useNavigate();
  
    const { greeting, emoji } = useMemo(() => {
      const h = new Date().getHours();
      if (h < 12) return { greeting: "Good morning", emoji: "🌤️" };
      if (h < 18) return { greeting: "Good afternoon", emoji: "☀️" };
      return { greeting: "Good evening", emoji: "🌙" };
    }, []);
  
    return (
      <main className="wh-wrap wh-gradient wh-bg-shapes">
        {/* Glass hero card */}
        <section className="wh-card-hero pulse" aria-labelledby="welcome-title">
          <div className="wh-card-hero__grid">
            {/* LEFT:*/}
            <div className="wh-left">
              <h1 id="welcome-title" className="wh-title wh-title--xl">
                {greeting} <span className="wh-emoji" aria-hidden>{emoji}</span>
              </h1>
  
              <p className="wh-sub wh-sub--lg">
                Welcome to <strong>Inventory Management</strong>. Please login to continue.
                </p>
              <p className="wh-note">
                New staff? Please collect your <strong>username</strong> and <strong>password </strong> 
                from the administrator.
                </p>
              <div className="wh-cta-row">
                <button className="wh-btn wh-btn--xl" onClick={() => navigate("/")}>
                  Login
                </button>
              </div>
            </div>
  
            {/* RIGHT */}
            <div className="wh-art">
              <img
                src={heroImg}
                alt="Illustration of inventory boxes and dashboard"
                className="wh-illus wh-illus--bleed"
                loading="eager"
              />
            </div>
          </div>
        </section>
      </main>
    );
  }