import logo from "@/assets/logo.png";
import Image from "next/image";
import { AnimationDiv } from "./Animations";
import UserMenu from "./UserMenu";
import { NavItem } from "./NavItem";
import { navItems } from "@/constants/drawerItens";
import {
  logoDownAnimationDrawer,
  navListAnimation,
} from "@/constants/animationContants";

export default function Drawer() {
  return (
    <AnimationDiv
      animation={navListAnimation(0.5)}
      className="w-full h-18 lg:h-full lg:w-60 lg:p-4 flex order-last lg:order-first bottom-0 fixed lg:static bg-surface border-t border-black/5"
    >
      <div id="drawer-content" className="flex-1 relative flex flex-col">
        <AnimationDiv
          className="h-30 hidden lg:block pointer-events-none"
          animation={logoDownAnimationDrawer}
        >
          <Image
            src={logo}
            alt="Lalouise Logo"
            className="absolute w-60 -left-19 -top-3"
            priority
          />
        </AnimationDiv>

        <div id="drawer-list" className="flex-1 flex">
          <ul className="flex-1 flex items-center justify-evenly lg:flex-col lg:gap-2 lg:items-start lg:justify-start">
            {navItems.map((n, i) => (
              <NavItem
                key={i}
                index={i}
                href={n.href}
                Icon={n.Icon}
                linkText={n.linkText}
              />
            ))}
          </ul>
        </div>

        <div id="drawer-footer" className="hidden lg:flex">
          <UserMenu />
        </div>
      </div>
    </AnimationDiv>
  );
}
