"use client";

import { useAuthStore } from "@/store/UserStore";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="bg-amber-300">{(user?.nickname, user?.id, user?.role)}</div>
  );
}
