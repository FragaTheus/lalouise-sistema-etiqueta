"use client";

import { useAuthStore } from "@/store/UserStore";
import { AnimationDiv } from "./Animations";
import {
  subtitleAnimation,
  titleAnimation,
} from "@/constants/animationContants";

export default function DashboardTitle() {
  const { user } = useAuthStore();
  const now = new Date();
  const whatTime = now.getHours();

  const getGreeting = () => {
    if (whatTime < 12) return "Bom dia";
    if (whatTime < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <AnimationDiv animation={titleAnimation}>
        <h2>
          {getGreeting()}, {user?.nickname}!
        </h2>
      </AnimationDiv>
      <AnimationDiv animation={subtitleAnimation}>
        <h2 className="font-semibold">Por onde começamos?</h2>
      </AnimationDiv>
    </div>
  );
}
