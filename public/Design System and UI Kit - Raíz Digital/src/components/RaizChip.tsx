import { HTMLAttributes, forwardRef } from 'react';

interface RaizChipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'success' | 'error';
  onRemove?: () => void;
}

export const RaizChip = forwardRef<HTMLDivElement, RaizChipProps>(
  ({ variant = 'default', onRemove, className = '', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-[var(--neural-cyan)]/20 text-[var(--neural-cyan)] border-[var(--neural-cyan)]',
      accent: 'bg-[var(--soft-magenta)]/20 text-[var(--soft-magenta)] border-[var(--soft-magenta)]',
      success: 'bg-[var(--green-cyan)]/20 text-[var(--green-cyan)] border-[var(--green-cyan)]',
      error: 'bg-[var(--coral-tech)]/20 text-[var(--coral-tech)] border-[var(--coral-tech)]'
    };
    
    return (
      <div
        ref={ref}
        className={`
          inline-flex items-center gap-2
          px-3 py-1.5
          rounded-full
          border
          transition-all duration-200
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        <span>{children}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="hover:opacity-70 transition-opacity"
            aria-label="Remove"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

RaizChip.displayName = 'RaizChip';
