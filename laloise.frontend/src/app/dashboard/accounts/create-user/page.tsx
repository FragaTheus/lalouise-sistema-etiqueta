"use client";

import AppImageCard from "@/components/app-image-card";
import createUser from "@/assets/create-user.svg";
import CreateUserClient from "@/wrapper/create-user-client";

export default function CreateUser() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <AppImageCard description="" imgSrc={createUser}>
        <CreateUserClient />
      </AppImageCard>
    </div>
  );
}
