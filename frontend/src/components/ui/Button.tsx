import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'link';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

/**
 * Base button styles shared across all variants.
 */
const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

/** Variant-specific styles */
const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  outline: 'border border-gray-300 text-gray-800 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  link: 'text-blue-600 hover:underline',
};

/** Size-specific styles */
const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

/**
 * Reusable Button component with variants and sizes.
 * Accepts all native button props plus `variant`, `size`, and `asChild`.
 * When `asChild` is true, the component clones the first child element and applies the button styles to it.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    asChild = false,
    children,
    ...props
  }, ref) => {
    const combinedClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].filter(Boolean).join(' ');

    if (asChild) {
      // Expect exactly one child element
      const child = React.Children.only(children) as React.ReactElement;
      return React.cloneElement(child, {
        className: `${combinedClasses} ${child.props.className ?? ''}`,
        ...props,
        ref,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    )
  }
);

Button.displayName = 'Button';