"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubrcibe = onAuthStateChanged(auth, (firebaseUser: any) => {
      setUser(firebaseUser);
    });
    return () => unsubrcibe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
