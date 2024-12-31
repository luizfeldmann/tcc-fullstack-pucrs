"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../Providers/AuthProvider";
import { useEffect } from "react";
import { ERoutes } from "@/lib/constants/ERoutes";

/** Redirects the user when already logged-in */
export function LoginRedirector() {
  // If already logged-in, redirect to dashboard
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authContext?.token) {
      router.push(ERoutes.Dashboard);
    }
  }, [router, authContext?.token]);

  return <></>;
}
