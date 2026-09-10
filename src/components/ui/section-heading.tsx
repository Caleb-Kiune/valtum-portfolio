import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
}

export function SectionHeading({ title, subtitle, className, ...props }: SectionHeadingProps) {
    return (
        <div className={cn("flex flex-col space-y-2 md:text-left text-center", className)} {...props}>
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mx-auto md:mx-0 max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-xl/relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
