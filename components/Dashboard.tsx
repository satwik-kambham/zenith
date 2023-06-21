import { useEffect, useState } from "react";
import PathCard from "./PathCard";

export default function Dashboard({ authUser }) {
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
        <a className="button" href="/profile">
          Profile
        </a>
        <a className="button" href="/generate">
          Generate
        </a>
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
