"use client";
import { useEffect, useState } from "react";
import { BOOKING_URL } from "../lib/content";

const LINKS = [["Services", "#services"], ["Our Work", "#work"], ["About", "#about"], ["Contact", "#contact"]];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = open ? "hidden" : "";
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className={`nav ${solid || open ? "nav-solid" : ""}`}>
      <a href="#top" className="nav-logo" aria-label="RO Mobile Car Detailing home"><img src="/img/logo.png" alt="RO Mobile Car Detailing" width="72" height="72" /></a>
      <nav id="menu" className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
        {LINKS.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        <a className="btn btn-sm nav-book-m" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Now</a>
      </nav>
      <a className="btn btn-sm nav-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Now</a>
      <button className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
    </header>
  );
}
