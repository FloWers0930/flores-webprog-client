// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9f5]">
      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="w-full px-12 lg:px-24 py-8 border-t-[1.5px] border-[#c5d0c5] bg-[#f8f9f5]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <span className="text-[11px] text-[#8a9a8a] tracking-[0.04em]">
            © 2025 Flores Studio. All rights reserved.
          </span>
          <span className="text-[11px] text-[#8a9a8a] tracking-[0.04em]">
            Built with React + Vite + Tailwind
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
