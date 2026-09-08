import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, wrapperClassName, id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-burgundy",
          error && "border-sale",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-sale">{error}</span>}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
