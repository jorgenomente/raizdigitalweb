import { InputHTMLAttributes, forwardRef } from 'react';

interface RaizInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const RaizInput = forwardRef<HTMLInputElement, RaizInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-[var(--silver-gray)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            bg-[var(--input-background)] 
            border border-[var(--neural-cyan)] 
            rounded-xl 
            px-4 py-3 
            text-white 
            placeholder-[var(--silver-gray)]
            transition-all duration-300
            focus:outline-none 
            focus:border-[var(--neural-cyan)] 
            focus:glow-cyan
            disabled:opacity-50 
            disabled:cursor-not-allowed
            ${error ? 'border-[var(--coral-tech)]' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-[var(--coral-tech)]">{error}</span>
        )}
      </div>
    );
  }
);

RaizInput.displayName = 'RaizInput';
