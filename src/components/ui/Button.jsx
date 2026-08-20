import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-gradient-to-l from-(--accent) to-(--accent-2) text-slate-950 shadow-[0_10px_30px_-10px_var(--accent)] hover:brightness-110",
  ghost:
    "border border-white/10 bg-white/5 text-white/85 backdrop-blur-sm hover:border-white/25 hover:bg-white/10",
};

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "w-full px-6 py-4 text-base",
  sm: "px-4 py-2.5 text-xs",
};

export function Button({ variant = "primary", size = "md", className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}