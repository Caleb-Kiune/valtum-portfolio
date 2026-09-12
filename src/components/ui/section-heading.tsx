import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      <h2 className="font-serif text-display-lg text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-body-lg text-muted-foreground max-w-xl",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
