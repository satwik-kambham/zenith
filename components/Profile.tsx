import { useState, useEffect } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";

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
      <div className="container">
        <h1>Zenith</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={authUser.picture} alt={authUser.name} />
        <h3>{authUser.name}</h3>
        <p>{authUser.email}</p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.auth0Id}</p>
        <p>{user.id}</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="button" href="/api/auth/logout">
          Logout
        </a>
      </div>
    )
  );
}
