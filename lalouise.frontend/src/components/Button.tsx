import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

interface IButon {
  btnTxt: string;
  type: "submit" | "button";
  disable: boolean;
}

export default function Button({ btnTxt, type, disable }: IButon) {
  return (
    <button
      type={type}
      className={`bg-primary-light p-2 text-p font-semibold text-white rounded-sm cursor-pointer hover:bg-primary-light/70 w-1/2 transition-colors
        ${disable ? "opacity-50 cursor-none bg-gray-500" : ""} items-center flex justify-center`}
      disabled={disable}
    >
      {disable ? "Entrando..." : btnTxt}
    </button>
  );
}
