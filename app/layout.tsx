import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import SiteHeader from "@/components/site-header";
import Contact from "@/components/contact";
export const metadata: Metadata = {
  title: "Muhammad Sidratul Muntaha | Fullstack Engineer",
  description: "Muhammad Sidratul Muntaha is a Fullstack Engineer in Jakarta with 10+ years of experience building web and mobile applications. Explore projects, experience, and collaboration opportunities.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main id="main">{children}</main><Contact /><footer className="footer wrap"><span>© {new Date().getFullYear()} Muhammad Sidratul Muntaha</span><a href="#main">Back to top ↑</a></footer></body></html>;
}
