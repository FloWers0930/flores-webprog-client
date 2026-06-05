import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#f8f9f5] text-[#2a3a2a]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        {/* Left side - Logo */}
        <div className="flex items-center justify-center border-b-2 border-[#c5d0c5] bg-[#4a5c4a] p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-[#c5d0c5] lg:p-16">
          <div className="flex w-full max-w-md items-center justify-center rounded-[2rem] ">
            {/* Your Logo */}
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="w-90 h-auto "
            />
          </div>
        </div>

        {/* Right side - Form */}
        <main className="flex items-center bg-[#f8f9f5] px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
