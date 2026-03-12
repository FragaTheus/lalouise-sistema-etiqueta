import * as React from "react";

import { cn } from "@/config/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-2 border-primary/30 bg-white dark:bg-slate-900 shadow-xs h-9 rounded-sm text-sm placeholder:text-gray-400 transition-all selection:bg-primary selection:text-white",
        "w-full px-3 py-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
