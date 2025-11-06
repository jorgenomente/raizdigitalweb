import { forwardRef, InputHTMLAttributes } from 'react';

interface RaizSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const RaizSwitch = forwardRef<HTMLInputElement, RaizSwitchProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="
            w-11 h-6 
            bg-[var(--silver-gray)]/30 
            rounded-full 
            peer 
            peer-checked:bg-[var(--neural-cyan)]
            transition-all duration-300
            peer-checked:glow-cyan
          "></div>
          <div className="
            absolute 
            top-1 left-1 
            w-4 h-4 
            bg-white 
            rounded-full 
            transition-all duration-300
            peer-checked:translate-x-5
          "></div>
        </div>
        {label && <span className="text-white">{label}</span>}
      </label>
    );
  }
);

RaizSwitch.displayName = 'RaizSwitch';
