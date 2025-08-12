"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import WishlistClient from "./WishlistClient";

export default function WishlistPage() {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/pages/login");
      }
    });
    return () => unsubscribe();
  }, []);
  return <WishlistClient />;
}
