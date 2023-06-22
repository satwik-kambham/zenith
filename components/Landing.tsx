import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function Landing() {
  return (
    <div
      className={`${inter.className} antialiased bg-gray-900 min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip`}
    >
      <header className="flex items-center sm:justify-between px-16 pt-8 pb-4 bg-gray-900 text-white justify-center">
        <div className="flex items-center">
          <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-semibold">Zenith</h1>
        </div>
      </header>
      <main className="text-center p-4 text-white pt-16">
        <div
          className="hidden lg:inline lg:absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#3a86f4" offset="0%" />
                <stop stopColor="#2dd2c0" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>
        <h1
          className="text-5xl md:text-7xl font-extrabold leading-tighter tracking-tighter mb-4 max-w-3xl mx-auto"
          data-aos="zoom-y-out"
        >
          Personalized learning for everyone with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Zenith
          </span>
        </h1>
        <p className="text-gray-200 text-xl my-8 max-w-3xl mx-auto">
          Generate a personalized learning plan based on your interests and
          goals. Zenith will help you learn the skills you need to achieve your
          goals. Zenith will also help you find the best resources to learn
          those skills. Zenith will help you track your progress and keep you
          motivated.
        </p>
        <Link
          href="/api/auth/login"
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded inline-block w-full sm:w-auto"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
}
