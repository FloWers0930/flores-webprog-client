// src/pages/NotFoundPage.jsx
import { Link, useRouteError } from "react-router-dom";
import Button from "../Components/Button";

function NotFoundPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-[#f8f9f5] flex flex-col">
      {/* Simple Header */}
      <nav className="w-full px-12 lg:px-24 py-6 border-b-[1.5px] border-[#c5d0c5]">
        <div className="max-w-[1400px] mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c5d0c5] flex items-center justify-center">
              <div className="w-3 h-3 bg-[#f8f9f5] rounded-sm" />
            </div>
            <span className="text-[13px] font-medium tracking-[0.08em] text-[#2a3a2a] uppercase">
              Flores Studio
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-12 lg:px-24 py-16">
        <div className="max-w-[600px] text-center">
          {/* 404 Number */}
          <div className="text-[120px] lg:text-[160px] font-light text-[#c5d0c5] leading-none mb-4 select-none">
            404
          </div>

          <h1 className="text-[24px] font-light text-[#2a3a2a] mb-4">
            Page Not Found
          </h1>
          <p className="text-[14px] text-[#6a7a6a] mb-2">
            The link you followed to get here must be broken...
          </p>
          <p className="text-[13px] text-[#8a9a8a] mb-8">
            {error?.statusText ||
              error?.message ||
              "The page you're looking for doesn't exist."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
            <Link to="/articles">
              <Button variant="secondary">Browse Articles</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full px-12 lg:px-24 py-6 border-t-[1.5px] border-[#c5d0c5]">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[11px] text-[#8a9a8a] tracking-[0.04em]">
            © 2025 Flores Studio
          </span>
        </div>
      </footer>
    </div>
  );
}

export default NotFoundPage;
