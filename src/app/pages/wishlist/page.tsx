import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/authOptions";
import { redirect } from "next/navigation";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/pages/login");
  }

  return <WishlistClient />;
}
