import { HTMLAttributes, forwardRef } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface RaizAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'error' | 'warning';
  title?: string;
}

export const RaizAlert = forwardRef<HTMLDivElement, RaizAlertProps>(
  ({ variant = 'info', title, className = '', children, ...props }, ref) => {
    const variantConfig = {
      info: {
        icon: Info,
        bg: 'bg-[var(--neural-cyan)]/10',
        border: 'border-[var(--neural-cyan)]',
        text: 'text-[var(--neural-cyan)]'
      },
      success: {
        icon: CheckCircle,
        bg: 'bg-[var(--green-cyan)]/10',
        border: 'border-[var(--green-cyan)]',
        text: 'text-[var(--green-cyan)]'
      },
      error: {
        icon: XCircle,
        bg: 'bg-[var(--coral-tech)]/10',
        border: 'border-[var(--coral-tech)]',
        text: 'text-[var(--coral-tech)]'
      },
      warning: {
        icon: AlertCircle,
        bg: 'bg-[var(--soft-magenta)]/10',
        border: 'border-[var(--soft-magenta)]',
        text: 'text-[var(--soft-magenta)]'
      }
    };
    
    const config = variantConfig[variant];
    const Icon = config.icon;
    
    return (
      <div
        ref={ref}
        className={`
          ${config.bg}
          ${config.border}
          border
          rounded-xl
          p-4
          flex gap-3
          ${className}
        `}
        {...props}
      >
        <Icon className={`${config.text} flex-shrink-0`} size={20} />
        <div className="flex-1">
          {title && (
            <div className={`${config.text} mb-1`}>{title}</div>
          )}
          <div className="text-white/90">{children}</div>
        </div>
      </div>
    );
  }
);

RaizAlert.displayName = 'RaizAlert';
