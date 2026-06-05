import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-full border border-[#c5d0c5] bg-[#f8f9f5] px-5 py-3 text-sm text-[#2a3a2a] outline-none transition placeholder:text-[#a5b5a5] focus:border-[#2a3a2a] focus:bg-white";

const actionButtonClassName = "w-full py-3.5 text-[11px] tracking-[0.15em]";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ email, password });

      // Save authentication data — no type/role needed
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstName", response.data.firstName);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Invalid email or password.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#2a3a2a] sm:text-4xl">
        Log In
      </h1>
      <p className="mt-3 text-sm leading-6 text-[#6a7a6a]">
        Access your account using the same wireframe language used across the
        site.
      </p>

      {error && (
        <p className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
          {error}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-[#4a5a4a]"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-[#4a5a4a]"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            required
          />
          <p className="mt-2 text-xs leading-5 text-[#8a9a8a]">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[#6a7a6a]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#c5d0c5] accent-[#2a3a2a]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-[#4a5a4a] transition hover:text-[#2a3a2a]"
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="dark"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>

        {/* Social Login */}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Log In with Apple
          </Button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-8 border-t border-[#c5d0c5] pt-6 text-sm text-[#6a7a6a]">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#2a3a2a] transition hover:text-[#4a5a4a]"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
