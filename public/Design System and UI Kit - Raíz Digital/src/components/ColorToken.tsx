interface ColorTokenProps {
  name: string;
  value: string;
  description?: string;
}

export const ColorToken = ({ name, value, description }: ColorTokenProps) => {
  return (
    <div className="flex items-start gap-4">
      <div 
        className="w-16 h-16 rounded-xl border border-[var(--neural-cyan)]/30 flex-shrink-0"
        style={{ backgroundColor: value }}
      ></div>
      <div className="flex-1">
        <div className="text-white mb-1">{name}</div>
        <code className="text-[var(--neural-cyan)]">{value}</code>
        {description && (
          <p className="text-[var(--silver-gray)] mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};
