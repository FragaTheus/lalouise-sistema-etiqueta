"use client";

import { useAuthStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { user, isHydrated } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isHydrated) return;

    setIsChecking(false);

    if (!user) {
      router.push("/login");
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      router.push("/unauthorized");
      return;
    }
  }, [isHydrated, user, requiredRole, router]);

  if (isChecking || !isHydrated) {
    return <div>Carregando...</div>;
  }

  if (user && (!requiredRole || user.role === requiredRole)) {
    return <>{children}</>;
  }

  return null;
};
