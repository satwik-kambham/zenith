import { Inter } from "next/font/google";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Generate from "@/components/Generate";

const inter = Inter({ subsets: ["latin"] });

export default function GeneratePage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <main className={`${inter.className}`}>
        <Generate authUser={user} />
      </main>
    );
  }

  router.replace("/");
}
