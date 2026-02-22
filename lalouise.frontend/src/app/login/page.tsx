import logo from "@/assets/logo.png";
import Image from "next/image";
import {
  fadeInUpAnimation,
  fadeInUpAnimationFooter,
  formInputLeftAnimation,
  logoDownAnimation,
} from "@/constants/animationContants";
import { AnimationDiv } from "@/components/Animations";
import textContent from "@/textContent/loginPageTextContent.json";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="grid grid-rows-6 max-w-lg h-full w-full relative">
      <AnimationDiv animation={logoDownAnimation} className="relative">
        <Image
          src={logo}
          alt={textContent.logo.alt}
          className="absolute -left-20 lg:-left-24 -top-10 w-50 md:w-60"
          priority
        />
      </AnimationDiv>

      <div id="form-layout" className="row-span-4 flex flex-col gap-4 md:gap-8">
        <div>
          <AnimationDiv animation={formInputLeftAnimation(1)}>
            <h1 className="text-3xl font-bold">{textContent.title.headline}</h1>
          </AnimationDiv>
          <AnimationDiv animation={formInputLeftAnimation(2)}>
            <h1 className="mb-2 md:mb-4 text-2xl">{textContent.title.main}</h1>
          </AnimationDiv>
          <AnimationDiv animation={formInputLeftAnimation(3)}>
            <small className="opacity-70">
              {textContent.title.description}
            </small>
          </AnimationDiv>
        </div>

        <AnimationDiv animation={fadeInUpAnimation} className="flex-1">
          <LoginForm />
        </AnimationDiv>
      </div>

      <AnimationDiv
        animation={fadeInUpAnimationFooter}
        className="absolute flex flex-col bottom-0"
      >
        <small className="opacity-70">{textContent.footer.headline}</small>
        <small className="opacity-70">{textContent.footer.main}</small>
      </AnimationDiv>
    </div>
  );
}
