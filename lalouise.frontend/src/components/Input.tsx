import { forwardRef } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          {...props}
          className={`
            rounded-sm
            p-1
            border
            transition-all
            focus:outline-none
            focus:ring-2
            ${
              error
                ? "border-secondary-light focus:ring-secondary-light"
                : "border-foreground/30 focus:ring-primary"
            }
          `}
        />
        {error && <span className="text-secondary-light text-sm">{error}</span>}
      </div>
    );
  },
);
