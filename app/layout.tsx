import type { Metadata } from "next";
import "./globals.css";
import "./galleries.css";
import "./theme.css";
import SiteHeader from "@/components/site-header";
import Contact from "@/components/contact";
export const metadata: Metadata = {
  title: "Sidratul Muntaha | Engineer, Manager & Entrepreneur",
  description: "Muhammad Sidratul Muntaha — Fullstack Engineer, Engineering Manager, entrepreneur, and curious polymath. Explore web and mobile products, career experience, and opportunities to work together.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main id="main">{children}</main><Contact /><footer className="footer wrap"><span>© {new Date().getFullYear()} Muhammad Sidratul Muntaha</span><a href="#main">Back to top ↑</a></footer></body></html>;
}
