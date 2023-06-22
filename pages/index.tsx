import { useUser } from "@auth0/nextjs-auth0/client";

import Landing from "@/components/Landing";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return <Dashboard authUser={user} />;
  }

  return <Landing />;
}
