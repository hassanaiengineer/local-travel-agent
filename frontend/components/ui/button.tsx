import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-normal transition duration-200",
        variant === "default" && "bg-zinc-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-zinc-800",
        variant === "outline" && "border border-zinc-200 bg-white/70 text-zinc-700 hover:-translate-y-0.5 hover:bg-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
