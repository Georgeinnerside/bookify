import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import WishlistClient from "./WishlistClient";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/pages/login");
  }

  return <WishlistClient />;
}
