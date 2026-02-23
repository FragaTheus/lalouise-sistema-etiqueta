import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Desenvolvimento() {
  return (
    <div className="flex flex-col items-center gap-8 flex-1 justify-center p-4">
      <div className="flex flex-col items-center bg-surface rounded-sm p-12 gap-4 justify-center max-w-md">
        <SparklesIcon className="w-12 h-12 text-primary animate-pulse" />

        <h1 className="text-2xl font-bold text-primary">Em breve</h1>

        <p className="text-center text-gray-600">
          Ainda estamos trabalhando nessa página. Volte em breve para ver as
          novidades!
        </p>

        <div className="w-full flex gap-4 justify-center mt-4">
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-primary text-white rounded-sm font-semibold hover:bg-primary/80 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
