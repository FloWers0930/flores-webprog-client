import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-full border border-[#c5d0c5] bg-[#f8f9f5] px-5 py-3 text-sm text-[#2a3a2a] outline-none transition placeholder:text-[#a5b5a5] focus:border-[#2a3a2a] focus:bg-white";

const actionButtonClassName = "w-full py-3.5 text-[11px] tracking-[0.15em]";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "viewer", // all self-registered users default to viewer
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!formData.firstName.trim()) return "First name is required.";
    if (!formData.lastName.trim()) return "Last name is required.";
    if (
      !formData.age ||
      !/^\d+$/.test(formData.age) ||
      parseInt(formData.age) < 1 ||
      parseInt(formData.age) > 150
    ) {
      return "Age must be a valid number between 1 and 150.";
    }
    if (!formData.gender) return "Please select a gender.";
    if (!/^\d{11}$/.test(formData.contactNumber.replace(/\D/g, ""))) {
      return "Contact number must be exactly 11 digits.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Enter a valid email address.";
    }
    if (!formData.username.trim()) return "Username is required.";
    if (/\s/.test(formData.username))
      return "Username must not contain spaces.";
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!formData.address.trim()) return "Address is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await createUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: String(formData.age).trim(),
        gender: formData.gender.toLowerCase(),
        contactNumber: formData.contactNumber.replace(/\D/g, "").trim(),
        email: formData.email.trim().toLowerCase(),
        username: formData.username.trim().toLowerCase(),
        password: formData.password,
        address: formData.address.trim(),
        type: "viewer",
        isActive: true,
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/auth/signin"), 1500);
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create account. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#2a3a2a] sm:text-4xl">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-[#6a7a6a]">
        Create your account to get started.
      </p>

      {/* Error Message */}
      {error && (
        <p className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && (
        <p className="mt-4 p-3 bg-green-50 text-green-600 text-sm rounded-xl">
          {success}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-[#4a5a4a]"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-[#4a5a4a]"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Age & Gender */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-[#4a5a4a]">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              min={1}
              max={150}
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 21"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-[#4a5a4a]"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactNumber"
            className="text-sm font-medium text-[#4a5a4a]"
          >
            Contact Number
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            required
            maxLength={11}
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="09171234567"
            className={inputClasses}
          />
        </div>

        {/* Email & Username */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#4a5a4a]"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-[#4a5a4a]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="No spaces allowed"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#4a5a4a]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#8a9a8a]">
            Must be at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium text-[#4a5a4a]"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="dark"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Social Login */}
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Sign Up with Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Sign Up with Apple
          </Button>
        </div>
      </form>

      {/* Footer Link */}
      <div className="mt-8 border-t border-[#c5d0c5] pt-6 text-sm text-[#6a7a6a]">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#2a3a2a] transition hover:text-[#4a5a4a]"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
