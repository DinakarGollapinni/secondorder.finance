import React from "react";

export function Badge({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border hairline bg-gradient-to-r from-white/10 to-white/5 px-2.5 py-1 text-xs text-white/85",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
