import { Slot } from '@radix-ui/react-slot';

function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';

  // Map variant to CSS class
  const variantClass = {
    default: 'button-default',
    destructive: 'button-destructive',
    outline: 'button-outline',
    secondary: 'button-secondary',
    ghost: 'button-ghost',
    link: 'button-link',
  }[variant] || 'button-default';

  // Map size to CSS class
  const sizeClass = {
    default: 'button-size-default',
    sm: 'button-size-sm',
    lg: 'button-size-lg',
    icon: 'button-size-icon',
  }[size] || 'button-size-default';

  // Combine base class + variant + size + any custom className
  const combinedClassName = ['button', variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Comp
      data-slot="button"
      className={combinedClassName}
      {...props}
    />
  );
}

export { Button };