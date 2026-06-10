import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen" style={{ background: "#080808", color: "#ffffff" }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
