"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../Providers/AuthProvider";
import { useEffect } from "react";
import { ERoutes } from "@/lib/constants/ERoutes";

/** Performs the logout operation */
export function LogoutPerformer() {
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    authContext?.doLogout();
    router.push(ERoutes.Index);
  }, [router, authContext]);

  return <></>;
}
