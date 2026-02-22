import Link from "next/link";
import { ComponentType } from "react";
import { AnimationDiv } from "./Animations";
import { navListAnimation } from "@/constants/animationContants";

export interface NavItemProps {
  index: number;
  href: string;
  Icon: ComponentType<{ className: string }>;
  linkText: string;
}

export const NavItem = ({ index, href, Icon, linkText }: NavItemProps) => {
  return (
    <AnimationDiv animation={navListAnimation(index)} className="lg:w-full">
      <Link
        href={href}
        className="hover:bg-primary/10 rounded-sm p-2 flex items-center group gap-2 transition-all active:scale-98"
      >
        <Icon className="w-6 text-gray-500 group-hover:text-primary group-hover:scale-105" />
        <small className="text-gray-500 font-semibold hover:text-primary hidden lg:inline">
          {linkText}
        </small>
      </Link>
    </AnimationDiv>
  );
};
