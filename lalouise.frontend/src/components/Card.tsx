import Link from "next/link";
import { AnimationDiv } from "./Animations";
import { navListAnimation } from "@/constants/animationContants";

export interface CardProps {
  index: number;
  href: string;
  Icon: React.ElementType;
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function Card({
  index,
  href,
  Icon,
  children,
  title,
  description,
}: CardProps) {
  return (
    <AnimationDiv animation={navListAnimation(index)}>
      <Link
        href={href}
        className="mt-2 bg-surface rounded-sm max-w-lg p-4 lg:p-8 hover:scale-101 active:scale-98 transition-all gap-4 flex flex-col hover:shadow-2xs"
      >
        <div className="w-full flex flex-col items-start justify-center">
          <Icon className="w-12 text-primary" />
          <p className="font-semibold mt-4">{title}</p>
          <small className="text-gray-500 font-semibold">{description}</small>
        </div>
        <div className="flex-1">{children}</div>
      </Link>
    </AnimationDiv>
  );
}
