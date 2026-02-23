import Link from "next/link";
import { ComponentType } from "react";
import { usePathname } from "next/navigation";
import { AnimationDiv } from "./Animations";
import { navListAnimation } from "@/constants/animationContants";

export interface NavItemProps {
  index: number;
  href: string;
  Icon: ComponentType<{ className: string }>;
  linkText: string;
}

export const NavItem = ({ index, href, Icon, linkText }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <AnimationDiv animation={navListAnimation(index)} className="lg:w-full">
      <Link
        href={href}
        className={`rounded-sm p-2 flex items-center group gap-2 transition-all active:scale-98 ${
          isActive ? "bg-primary/10" : "hover:bg-primary/10"
        }`}
      >
        <Icon
          className={`w-5 lg:w-6 group-hover:scale-105 transition-all ${
            isActive ? "text-primary" : "text-gray-500 group-hover:text-primary"
          }`}
        />
        <small
          className={`font-semibold hidden lg:inline transition-all ${
            isActive ? "text-primary" : "text-gray-500 hover:text-primary"
          }`}
        >
          {linkText}
        </small>
      </Link>
    </AnimationDiv>
  );
};
