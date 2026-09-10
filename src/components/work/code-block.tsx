interface CodeBlockProps {
    title: string;
    code: string;
    language?: string;
    copy?: string;
}

export function CodeBlock({ title, code, language = "tsx", copy }: CodeBlockProps) {
    return (
        <div className="bg-surface rounded-card border border-border overflow-hidden font-mono text-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-glass/10 bg-glass/5">
                <span className="text-muted-foreground text-xs">{title}</span>
                <span className="text-muted-foreground/60 text-xs">{language}</span>
            </div>

            {/* Code */}
            <pre className="px-4 py-3 overflow-x-auto">
                <code className="text-primary/90 text-xs leading-relaxed">
                    {code}
                </code>
            </pre>

            {/* Copy Indicator */}
            {copy && (
                <div className="px-4 py-2 border-t border-glass/5 bg-glass/5 flex justify-end">
                    <span className="text-muted-foreground text-xs">{copy}</span>
                </div>
            )}
        </div>
    );
}
