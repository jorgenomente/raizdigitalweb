import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface RaizCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const RaizCheckbox = forwardRef<HTMLInputElement, RaizCheckboxProps>(
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
            w-5 h-5 
            border-2 border-[var(--neural-cyan)] 
            rounded 
            bg-transparent
            peer-checked:bg-[var(--neural-cyan)]
            transition-all duration-200
            flex items-center justify-center
          ">
            <Check className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={14} />
          </div>
        </div>
        {label && <span className="text-white">{label}</span>}
      </label>
    );
  }
);

RaizCheckbox.displayName = 'RaizCheckbox';
