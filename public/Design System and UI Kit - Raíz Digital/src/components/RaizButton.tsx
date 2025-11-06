import { ButtonHTMLAttributes, forwardRef } from 'react';

interface RaizButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const RaizButton = forwardRef<HTMLButtonElement, RaizButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeStyles = {
      sm: 'px-4 py-2',
      md: 'px-6 py-3',
      lg: 'px-8 py-4'
    };
    
    const variantStyles = {
      primary: 'bg-[var(--neural-cyan)] text-white hover:bg-[var(--soft-magenta)] hover:glow-magenta',
      secondary: 'bg-transparent border border-[var(--neural-cyan)] text-[var(--neural-cyan)] hover:bg-[var(--neural-cyan)] hover:text-white hover:glow-cyan',
      ghost: 'bg-transparent text-[var(--neural-cyan)] hover:text-[var(--soft-magenta)] hover:bg-white/5'
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

RaizButton.displayName = 'RaizButton';
