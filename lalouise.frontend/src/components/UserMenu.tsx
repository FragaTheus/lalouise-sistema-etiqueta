"use client";

import { useAuth } from "@/context/authContext";
import {
  ArrowLeftEndOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./NavItem";
import { AnimationDiv } from "./Animations";
import { formInputLeftAnimation } from "@/constants/animationContants";

export default function UserMenu() {
  const { logout } = useAuth();

  return (
    <div className="flex-1 flex lg:flex-col lg:gap-2 bg-primary/10 lg:p-2 rounded-sm items-center lg:items-start">
      <label className="text-small font-semibold hidden">Configs</label>
      <NavItem
        index={0}
        href="/dashboard/desenvolvimento"
        Icon={UserCircleIcon}
        linkText="Perfil"
        isActive
      />
      <AnimationDiv animation={formInputLeftAnimation()} className="w-full">
        <button
          onClick={() => logout()}
          className="hover:bg-secondary-light/10 rounded-sm p-2 flex items-center group  transition-all gap-2 font-medium cursor-pointer active:scale-98 w-full"
        >
          <ArrowLeftEndOnRectangleIcon className="w-5 lg:w-6 text-secondary-light group-hover:scale-105" />
          <small className="hidden lg:inline text-secondary-light">Sair</small>
        </button>
      </AnimationDiv>
    </div>
  );
}
