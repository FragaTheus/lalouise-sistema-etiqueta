import logo from "@/assets/logo.png";
import Image from "next/image";
import { AnimationDiv } from "./Animations";
import UserMenu from "./UserMenu";
import { NavItem } from "./NavItem";
import { navItems } from "@/constants/drawerItens";
import { logoDownAnimation } from "@/constants/animationContants";

export default function Drawer() {
  return (
    <div className="bg-surface w-full h-15 lg:h-full lg:w-60 lg:p-4 flex">
      <div id="drawer-content" className="flex-1 relative flex flex-col">
        <AnimationDiv
          className="h-30 hidden lg:block pointer-events-none"
          animation={logoDownAnimation}
        >
          <Image
            src={logo}
            alt="Lalouise Logo"
            className="absolute w-60 -left-19 -top-3"
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
    </div>
  );
}
