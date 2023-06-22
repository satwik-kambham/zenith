import { useEffect, useState } from "react";
import PathCard from "./PathCard";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Inter } from "next/font/google";
import Modal from "./Modal";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard({ authUser }: { authUser: UserProfile }) {
  const [user, setUser] = useState();
  const [paths, setPaths] = useState();
  const [selectedPath, setSelectedPath] = useState();

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

    const fetchPaths = async () => {
      // Send request to /api/user with the auth0 user id token
      const response = await fetch("/api/paths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authUser),
      });
      const data = await response.json();

      setPaths(data);
    };

    fetchUser();
    fetchPaths();
  }, [authUser]);

  const handlePathCardClick = (path) => {
    setSelectedPath(path);
  };

  return (
    user && (
      <div
        className={`${inter.className} antialiased bg-gray-900 min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip`}
      >
        <header className="flex items-center sm:justify-between px-16 pt-8 pb-4 bg-gray-900 text-white justify-center flex-col sm:flex-row">
          <div className="flex items-center">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-semibold">Zenith</h1>
          </div>
          <Link href="/profile">
            <div className="flex items-center pt-4 sm:pt-0">
              <h2 className="text-base font-medium mr-2">{user.name}</h2>
              <img
                src={authUser.picture}
                alt="User Image"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </Link>
        </header>

        <main className="p-4 text-white pt-8 px-16 mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">
            Dashboard
          </h1>
          <div className="flex justify-center">
            <Link
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded inline-block w-full sm:w-auto my-4"
              href="/generate"
            >
              Generate New Curriculum
            </Link>
          </div>
          {paths && (
            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
              {paths.map((path) => (
                <PathCard
                  key={path.id}
                  path={path}
                  onClick={handlePathCardClick}
                />
              ))}
            </div>
          )}
          {selectedPath && (
            <Modal path={selectedPath} onClose={() => setSelectedPath(null)} />
          )}
        </main>
      </div>
    )
  );
}
