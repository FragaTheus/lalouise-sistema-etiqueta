import Image from "next/image";
import logo from "@/assets/logo.png";
import UserMenu from "./UserMenu";
import { AnimationDiv } from "./Animations";
import { logoDownAnimationDrawer } from "@/constants/animationContants";

export default function Header() {
  return (
    <div className="bg-surface w-full h-12 left-0 lg:hidden order-1 flex px-3">
      <div className="flex-1 flex items-center justify-between">
        <AnimationDiv animation={logoDownAnimationDrawer}>
          <div className="relative flex-1">
            <Image
              src={logo}
              alt="Logo Lalouise"
              className="w-35 absolute -left-12 -top-10"
            />
          </div>
        </AnimationDiv>

        <div className="flex">
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
