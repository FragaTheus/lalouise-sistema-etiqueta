import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border shadow-xs h-9 rounded-sm text-sm placeholder:text-gray-400 transition-all selection:bg-primary selection:text-white",
        "w-full px-3 py-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring",
        "aria-invalid:border-ring aria-invalid:ring-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
