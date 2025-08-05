import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/authOptions";
import { redirect } from "next/navigation";
import CartClient from "./CartClient";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/pages/login");
  }

  return <CartClient />;
}
