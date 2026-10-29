// Edit business content here.
export const BOOKING_URL = "/booking";
export const SOCIALS = []; // e.g. { label: "Instagram", href: "https://instagram.com/..." }
export const HOURS = "Monday–Sunday, 8 AM–5 PM";

export const SERVICES = [
  { name: "Express Interior Cleaning", price: "$100", text: "Maintenance-level interior cleaning to keep your vehicle fresh between deeper details." },
  { name: "RO Pro Package", price: "$200", text: "A more detailed interior cleaning, including steam cleaning on suitable surfaces." },
  { name: "RO Premium Package", price: "$300", text: "Deeper interior cleaning, including extraction where appropriate." },
  { name: "Headlight Restoration", price: "$80", text: "Improves the appearance of cloudy or yellowed headlight lenses." },
];

// Swap files in /public/img or edit entries. `src: null` renders a placeholder.
export const WORK = [
  { src: "/img/work-interior.png", alt: "Foam applied to a light grey cloth car seat", cls: "w-a", label: "Interior" },
  { src: "/img/work-team.png", alt: "Two RO detailers with equipment beside an SUV", cls: "w-b", label: "On location" },
  { src: "/img/work-trunk.png", alt: "Cargo area being cleaned with a drill brush", cls: "w-c", label: "Cargo area" },
  { src: "/img/work-headlight.png", alt: "Headlight before and after restoration", cls: "w-d", label: "Headlights" },
  { src: null, alt: "", cls: "w-e", label: "Add your next photo" },
];
