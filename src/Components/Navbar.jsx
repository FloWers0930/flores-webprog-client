import { NavLink } from "react-router-dom";
import Logo from "../Components/Logo";
import Button from "../Components/Button";

function Navbar() {
  const linkBaseClasses =
    "font-['DM_Sans'] text-[11px] font-medium tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-200";

  return (
    <nav className="w-full bg-white border-b-[1.5px] border-[#4a5c4a] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-12 lg:px-24 h-16 flex items-center justify-between">
        <NavLink to="/" className="no-underline">
          <Logo />
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBaseClasses} ${isActive ? "bg-[#4a5c4a] text-white" : "text-[#6b7b6b] hover:text-[#4a5c4a]"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBaseClasses} ${isActive ? "bg-[#4a5c4a] text-white" : "text-[#6b7b6b] hover:text-[#4a5c4a]"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              `${linkBaseClasses} ${isActive ? "bg-[#4a5c4a] text-white" : "text-[#6b7b6b] hover:text-[#4a5c4a]"}`
            }
          >
            Articles
          </NavLink>

          {/* Divider */}
          <div className="h-6 w-[1.5px] bg-[#c5d0c5] mx-2" />

          {/* Auth Buttons - Enhancement 3 */}
          <Button
            to="/auth/signin"
            variant="secondary"
            className="!px-4 !py-1.5 !text-[10px] !tracking-[0.1em]"
          >
            Log In
          </Button>
          <Button
            to="/auth/signup"
            variant="primary"
            className="!px-4 !py-1.5 !text-[10px] !tracking-[0.1em]"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
