import Image from "next/image";
import logo from "@/assets/logo.png";
import UserMenu from "./UserMenu";
import { AnimationDiv } from "./Animations";
import { navListAnimation } from "@/constants/animationContants";

export default function Header() {
  return (
    <AnimationDiv
      animation={navListAnimation(0.5)}
      className="w-full left-0 lg:hidden order-1 flex p-4 fixed bg-surface h-15 shadow-xs z-50"
    >
      <div className="flex-1 flex items-center justify-between">
        <div>
          <Image
            src={logo}
            alt="Logo Lalouise"
            className="w-35 absolute -left-8 -top-2.5"
          />
        </div>
        <div className="flex">
          <UserMenu />
        </div>
      </div>
    </AnimationDiv>
  );
}
