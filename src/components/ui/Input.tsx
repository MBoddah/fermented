import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon?: LucideIcon;
    iconClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ Icon, className, type, iconClassName, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'flex m-auto h-8 w-full rounded-md border border-input bg-background px-3 py-1 shadow-sm transition-colors hover:border-slate-400 focus-within:border-slate-400',
                    className,
                )}
            >
                {Icon ? (
                    <Icon className={cn('self-center h-4 w-4 text-slate-400', iconClassName)} />
                ) : null}
                <input
                    type={type}
                    className='w-full h-full border-none bg-none text-2xs outline-none group active:border-b-slate-400 ml-2'
                    ref={ref}
                    {...props}
                />
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
