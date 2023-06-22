import { useState, useEffect } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Profile({ authUser }: { authUser: UserProfile }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      // Send request to /api/user with the auth0 user id token
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authUser),
      });
      const data = await response.json();

      setUser(data);
    };

    fetchUser();
  }, [authUser]);

  return (
    user && (
      <div className="antialiased bg-gray-900 min-h-screen overflow-hidden">
        <header className="flex items-center justify-between px-16 pt-8 pb-4 bg-gray-900 text-white justify-center">
          <div className="flex items-center">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-semibold">Zenith</h1>
          </div>
        </header>
        <div className="text-center p-4 text-white pt-16">
          <Link
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded inline-block w-full sm:w-auto"
            href="/"
          >
            Return to Dashboard
          </Link>
          <div className="my-8">
            <img
              src={authUser.picture}
              alt={authUser.name}
              className="mx-auto h-32 w-32 rounded-full"
            />
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-400">{user.email}</p>
            <a
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded inline-block w-full sm:w-auto mt-4"
              href="/api/auth/logout"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    )
  );
}
