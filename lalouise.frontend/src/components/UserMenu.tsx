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
    <div className="flex-1 flex flex-col gap-2 bg-primary/10 p-2 rounded-sm">
      <label className="text-small font-semibold">Configs</label>
      <NavItem index={0} href="/" Icon={UserCircleIcon} linkText="Perfil" />
      <AnimationDiv animation={formInputLeftAnimation()}>
        <button
          onClick={() => logout()}
          className="hover:bg-secondary-light/10 rounded-sm px-2 p-1 flex items-center group text-small text-secondary-light transition-all gap-2 font-medium cursor-pointer active:scale-98"
        >
          <ArrowLeftEndOnRectangleIcon className="w-6 text-secondary-light group-hover:scale-105" />
          Sair
        </button>
      </AnimationDiv>
    </div>
  );
}
