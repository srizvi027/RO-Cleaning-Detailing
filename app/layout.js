import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-display" });
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--f-body" });

export const metadata = {
  title: "RO Mobile Car Detailing",
  description: "Premium mobile car detailing with meticulous attention to every surface, inside and out.",
};
export const viewport = { themeColor: "#000001" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
