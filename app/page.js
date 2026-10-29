import Image from "next/image";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import { BOOKING_URL, SOCIALS, HOURS, SERVICES, WORK } from "../lib/content";

const bookingLink = (service) => ({
  href: service ? `${BOOKING_URL}?service=${encodeURIComponent(service)}` : BOOKING_URL,
  target: "_blank",
  rel: "noopener noreferrer",
});

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main id="top">
        <section className="hero dark">
          <Image src="/img/car2.jpg" alt="" fill priority sizes="100vw" className="hero-img" />
          <div className="hero-shade" />
          <div className="wrap hero-copy">
            <p className="eyebrow">RO Mobile Car Detailing</p>
            <h1>Detailing that makes every drive feel new.</h1>
            <p className="lede">Premium mobile car detailing with meticulous attention to every surface, inside and out.</p>
            <div className="btns">
              <a className="btn" {...bookingLink()}>Book your detail</a>
              <a className="btn btn-ghost" href="#work">Explore our work</a>
            </div>
          </div>
        </section>

        <section id="services" className="light pad">
          <div className="wrap">
            <p className="eyebrow">Services</p>
            <h2>Choose the level of care.</h2>
            <p className="note">All prices are starting prices. Final price depends on your vehicle and its condition.</p>
            <ul className="rows">
              {SERVICES.map((s) => (
                <li key={s.name} className="row">
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                  <div className="row-end">
                    <span className="price"><small>Starting at</small>{s.price}</span>
                    <a className="link" {...bookingLink(s.name)}>Book this service<span className="sr"> — {s.name}</span></a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="work" className="dark pad">
          <div className="wrap">
            <p className="eyebrow">Our Work</p>
            <h2>The finish speaks for itself.</h2>
            <div className="mosaic">
              {WORK.map((w) => (
                <figure key={w.label} className={`tile ${w.cls}`}>
                  {w.src ? <Image src={w.src} alt={w.alt} fill sizes="(max-width:700px) 100vw, 50vw" /> : <div className="ph">Image placeholder</div>}
                  <figcaption>{w.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="ivory pad">
          <div className="wrap split">
            <div className="split-img"><Image src="/img/work-team.png" alt="Two RO detailers with their equipment beside a customer's SUV" fill sizes="(max-width:800px) 100vw, 45vw" /></div>
            <div>
              <p className="eyebrow">About</p>
              <h2>Detail isn’t extra. It’s everything.</h2>
              <p>RO Mobile Car Detailing is built around careful vehicle care. We bring the work to you and focus on the small things: every seat, seam, and surface.</p>
              <p>The result is a cleaner interior, a refreshed appearance, and a car that feels good to get back into.</p>
            </div>
          </div>
        </section>

        <section className="dark cta">
          <Image src="/img/car1.jpg" alt="" fill sizes="100vw" className="hero-img" />
          <div className="hero-shade" />
          <div className="wrap hero-copy">
            <h2>Your car deserves the RO treatment.</h2>
            <p className="lede">Ready to give your vehicle the attention it deserves?</p>
            <a className="btn" {...bookingLink()}>Book your appointment</a>
          </div>
        </section>
      </main>

      <footer id="contact" className="light pad foot">
        <div className="wrap foot-grid">
          <div className="foot-logo"><img src="/img/logo.png" alt="RO Mobile Car Detailing" width="120" height="120" /></div>
          <div>
            <h2 className="h-sm">Thoughtful detailing. Exceptional finish.</h2>
            <p>Hours: {HOURS}</p>
            <p><a className="link" {...bookingLink()}>Book online</a></p>
            {SOCIALS.length > 0 && <p className="socials">{SOCIALS.map((s) => <a key={s.href} className="link" href={s.href} {...ext}>{s.label}</a>)}</p>}
          </div>
        </div>
        <p className="copy wrap">© {new Date().getFullYear()} RO Mobile Car Detailing</p>
      </footer>
    </>
  );
}
