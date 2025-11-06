import { HTMLAttributes, forwardRef } from 'react';

interface RaizCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const RaizCard = forwardRef<HTMLDivElement, RaizCardProps>(
  ({ hoverable = true, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-[var(--deep-blue)] 
          rounded-xl 
          p-6 
          shadow-[0_2px_6px_rgba(0,0,0,0.25)]
          transition-all duration-300
          ${hoverable ? 'hover:glow-cyan hover:border-[var(--neural-cyan)] border border-transparent' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

RaizCard.displayName = 'RaizCard';
