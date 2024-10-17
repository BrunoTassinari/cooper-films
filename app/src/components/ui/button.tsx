import { forwardRef, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2",

  variants: {
    variant: {
      primary:
        "bg-slate-800 text-slate-50 hover:bg-slate-900 ring-bg-slate-800",
      secondary:
        "bg-slate-50 text-slate-800 hover:bg-slate-100 ring-slate-800 border border-slate-400",
    },

    size: {
      default: "px-4 py-2.5",
      sm: "px-3 py-1.5",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      />
    );
  }
);

Button.displayName = "Button";
