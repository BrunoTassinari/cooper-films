import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TextAreaProps = ComponentProps<"textarea">;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={twMerge(
          "px-4 py-2 h-28 bg-slate-200 border border-slate-100 rounded-lg placeholder-zinc-500 outline-none text-sm hover:border-zinc-800 focus-visible:border-slate-700 focus-visible:ring-4 ring-slate-500/10",
          props.className
        )}
      />
    );
  }
);

TextArea.displayName = "TextArea";
