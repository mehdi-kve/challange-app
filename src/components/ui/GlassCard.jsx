import { cn } from "../../utils/cn";

export function GlassCard({ className, ...props }) {
  return <div className={cn("glass rounded-3xl", className)} {...props} />;
}