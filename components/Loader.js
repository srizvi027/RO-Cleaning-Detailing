"use client";
import { useEffect, useState } from "react";

// Plays once per browser session; state lives here so re-renders/nav clicks never replay it.
export default function Loader() {
  const [phase, setPhase] = useState("on"); // on -> out -> gone
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ro-intro") === "1"; sessionStorage.setItem("ro-intro", "1"); } catch {}
    if (seen) { setPhase("gone"); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("out"), reduce ? 600 : 1800);
    const t2 = setTimeout(() => setPhase("gone"), reduce ? 900 : 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (phase === "gone") return null;
  return (
    <div className={`loader ${phase === "out" ? "loader-out" : ""}`} role="status" aria-label="Loading RO Mobile Car Detailing">
      <div className="loader-inner">
        <div className="loader-logo">
          <img src="/img/logo.png" alt="" width="360" height="360" />
          <span className="loader-sweep" aria-hidden="true" />
        </div>
        <p className="loader-text">RO Mobile Car Detailing</p>
      </div>
    </div>
  );
}
