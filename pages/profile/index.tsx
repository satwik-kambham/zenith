import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Profile from "@/components/Profile";

const inter = Inter({ subsets: ["latin"] });

export default function ProfilePage() {
  const { user, error, isLoading } = useUser();
    const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <main className={`${inter.className}`}>
        <Profile authUser={user} />
      </main>
    );
  }

  router.replace("/");
}
