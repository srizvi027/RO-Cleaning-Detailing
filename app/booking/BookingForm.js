"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HOURS, SERVICES } from "../../lib/content";

const TIMES = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
const STEPS = ["Your detail", "Date & time", "Your details"];

function getDates() {
  return Array.from({ length: 10 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return {
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.toLocaleDateString("en-US", { day: "numeric" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      full: date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    };
  });
}

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dates, setDates] = useState([]);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", vehicle: "", location: "", notes: "" });

  useEffect(() => {
    setDates(getDates());
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (SERVICES.some((item) => item.name === requestedService)) setService(requestedService);
  }, []);

  const selectedService = SERVICES.find((item) => item.name === service);
  const selectedDate = dates.find((item) => item.value === date);

  function updateDetail(event) {
    setDetails((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function goNext() {
    if (step === 0 && !service) return;
    if (step === 1 && (!date || !time)) return;
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  if (submitted) {
    return (
      <main className="booking-page">
        <header className="booking-header">
          <a href="/" aria-label="RO Mobile Car Detailing home"><Image src="/img/logo.png" alt="RO Mobile Car Detailing" width={76} height={76} /></a>
          <a className="booking-back" href="/">Back to home</a>
        </header>
        <section className="booking-complete">
          <span className="booking-check" aria-hidden="true">✓</span>
          <p className="eyebrow">Request preview</p>
          <h1>Your detail,<br />beautifully planned.</h1>
          <p className="booking-complete-copy">Your selections are ready. The appointment form is not connected to the business inbox yet, so this is not sent or confirmed.</p>
          <div className="booking-summary booking-summary-complete">
            <p><span>Service</span>{selectedService?.name}</p>
            <p><span>Preferred time</span>{selectedDate?.full} · {time}</p>
            <p><span>Vehicle</span>{details.vehicle}</p>
            <p><span>Contact</span>{details.name} · {details.email}</p>
          </div>
          <p className="booking-setup-note">Connect the Gmail booking integration to receive appointment requests here.</p>
          <button className="booking-secondary" type="button" onClick={() => { setSubmitted(false); setStep(0); }}>Start another request</button>
        </section>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <header className="booking-header">
        <a href="/" aria-label="RO Mobile Car Detailing home"><Image src="/img/logo.png" alt="RO Mobile Car Detailing" width={76} height={76} /></a>
        <a className="booking-back" href="/">← <span>Back to site</span></a>
      </header>

      <div className="booking-layout">
        <section className="booking-intro">
          <div className="booking-intro-image"><Image src="/img/car2.jpg" alt="A freshly detailed car ready for the road" fill priority sizes="(max-width: 800px) 100vw, 42vw" /></div>
          <div className="booking-intro-shade" />
          <div className="booking-intro-copy">
            <p className="eyebrow">RO Mobile Car Detailing</p>
            <h1>A little care<br />goes a long way.</h1>
            <p>Tell us what your car needs. We’ll take care of the details.</p>
            <div className="booking-hours"><span className="booking-hours-dot" /> Booking hours <span>{HOURS}</span></div>
          </div>
          <p className="booking-photo-credit">Thoughtful detailing. Exceptional finish.</p>
        </section>

        <section className="booking-panel" aria-label="Appointment request">
          <div className="booking-panel-top">
            <p className="eyebrow">Make it yours</p>
            <p className="booking-step-count">0{step + 1} <span>/ 0{STEPS.length}</span></p>
          </div>
          <div className="booking-progress" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((label, index) => <span key={label} className={index <= step ? "active" : ""} />)}
          </div>

          {step === 0 && (
            <div className="booking-step-content">
              <h2>Choose your detail.</h2>
              <p className="booking-step-lede">Select the service that feels right for your vehicle.</p>
              <div className="booking-services">
                {SERVICES.map((item, index) => (
                  <button key={item.name} type="button" className={`booking-service${service === item.name ? " selected" : ""}`} onClick={() => setService(item.name)} aria-pressed={service === item.name}>
                    <span className="booking-service-number">0{index + 1}</span>
                    <span className="booking-service-info"><strong>{item.name}</strong><small>{item.text}</small></span>
                    <span className="booking-service-price">{item.price}<small>from</small></span>
                  </button>
                ))}
              </div>
              <p className="booking-fine-print">Starting prices. Final price depends on vehicle size and condition.</p>
            </div>
          )}

          {step === 1 && (
            <div className="booking-step-content">
              <h2>Pick a time.</h2>
              <p className="booking-step-lede">Choose a day and a time that works for you.</p>
              <div className="booking-date-list" aria-label="Available dates">
                {dates.map((item) => (
                  <button key={item.value} type="button" className={`booking-date${date === item.value ? " selected" : ""}`} onClick={() => { setDate(item.value); setTime(""); }} aria-pressed={date === item.value}>
                    <span>{item.weekday}</span><strong>{item.day}</strong><span>{item.month}</span>
                  </button>
                ))}
              </div>
              <p className="booking-field-label">Preferred start time</p>
              <div className="booking-times">
                {TIMES.map((slot) => (
                  <button key={slot} type="button" className={`booking-time${time === slot ? " selected" : ""}`} onClick={() => setTime(slot)} aria-pressed={time === slot}>{slot}</button>
                ))}
              </div>
              <p className="booking-fine-print">Your preferred time is a request. We’ll confirm availability with you.</p>
            </div>
          )}

          {step === 2 && (
            <form className="booking-step-content booking-details-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <h2>Almost there.</h2>
              <p className="booking-step-lede">Share a few details so we can prepare for your visit.</p>
              <div className="booking-fields">
                <label>Your name<input name="name" autoComplete="name" value={details.name} onChange={updateDetail} required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" value={details.email} onChange={updateDetail} required /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" value={details.phone} onChange={updateDetail} required /></label>
                <label>Vehicle (year, make & model)<input name="vehicle" placeholder="e.g. 2022 Toyota Camry" value={details.vehicle} onChange={updateDetail} required /></label>
                <label className="booking-field-wide">Where should we meet?<input name="location" autoComplete="street-address" placeholder="Service address or ZIP code" value={details.location} onChange={updateDetail} required /></label>
                <label className="booking-field-wide">Anything we should know? <span className="booking-optional">Optional</span><textarea name="notes" rows="2" placeholder="Special requests, pet hair, and so on" value={details.notes} onChange={updateDetail} /></label>
              </div>
              <p className="booking-fine-print">Your request is not sent or confirmed until the business inbox is connected.</p>
              <button className="booking-submit" type="submit">Review request <span>→</span></button>
            </form>
          )}

          {step < 2 && (
            <div className="booking-controls">
              {step > 0 ? <button className="booking-secondary" type="button" onClick={() => setStep((current) => current - 1)}>← Back</button> : <span />}
              <button className="booking-submit" type="button" onClick={goNext} disabled={step === 0 ? !service : !date || !time}>
                Continue <span>→</span>
              </button>
            </div>
          )}

          {selectedService && (
            <aside className="booking-mini-summary" aria-live="polite">
              <span>Your selection</span><strong>{selectedService.name}</strong><b>{selectedService.price}<small> from</small></b>
              {selectedDate && <span className="booking-mini-date">{selectedDate.full}{time ? ` · ${time}` : ""}</span>}
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}
