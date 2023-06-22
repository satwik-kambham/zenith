import { useEffect, useState } from "react";
import PathCard from "./PathCard";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Dashboard({ authUser }: { authUser: UserProfile }) {
  const [user, setUser] = useState();
  const [paths, setPaths] = useState();

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

  return (
    user && (
      <>
        <h1>Dashboard</h1>
        <p>{user.name}</p>
        <Link className="button" href="/profile">
          Profile
        </Link>
        <Link className="button" href="/generate">
          Generate
        </Link>
        {paths && (
          <div className="grid">
            {paths.map((path) => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        )}
      </>
    )
  );
}
