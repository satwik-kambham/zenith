import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";

import Landing from "@/components/Landing";
import Profile from "@/components/Profile";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <main className={`${inter.className}`}>
        <Profile authUser={user} />
      </main>
    );
  }

  return (
    <main className={`${inter.className}`}>
      <Landing />
    </main>
  );
}
