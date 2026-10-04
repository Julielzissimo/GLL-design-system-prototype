import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { X } from 'lucide-react'

const buttonStyles = cva('gll-button', {
  variants: {
    variant: { primary: 'gll-button--primary', secondary: 'gll-button--secondary', quiet: 'gll-button--quiet', danger: 'gll-button--danger' },
    size: { default: 'gll-button--default', small: 'gll-button--small', icon: 'gll-button--icon' },
  },
  defaultVariants: { variant: 'primary', size: 'default' },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, ...props }, ref) {
  return <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />
})

export function IconButton({ label, children, ...props }: ButtonProps & { label: string }) {
  return <Button variant="quiet" size="icon" aria-label={label} title={label} {...props}>{children}</Button>
}

export type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'
export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return <span className={clsx('gll-badge', `gll-badge--${tone}`, className)}>{children}</span>
}

export function Surface({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={clsx('gll-surface', className)} {...props}>{children}</section>
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={clsx('gll-input', className)} {...props} />
})

export function Field({ label, hint, error, required, htmlFor, children }: { label: string; hint?: string; error?: string; required?: boolean; htmlFor: string; children: ReactNode }) {
  return <div className="gll-field"><label htmlFor={htmlFor} className="gll-label">{label}{required && <span className="gll-required" aria-hidden="true"> *</span>}</label>{children}{hint && <small id={`${htmlFor}-help`} className="gll-help">{hint}</small>}{error && <small id={`${htmlFor}-error`} className="gll-error" role="alert">{error}</small>}</div>
}

export function Dialog({ open, onOpenChange, title, description, children, footer }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; children: ReactNode; footer?: ReactNode }) {
  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}><DialogPrimitive.Portal><DialogPrimitive.Overlay className="gll-dialog-overlay" /><DialogPrimitive.Content className="gll-dialog"><header className="gll-dialog-header"><div><DialogPrimitive.Title>{title}</DialogPrimitive.Title>{description && <DialogPrimitive.Description>{description}</DialogPrimitive.Description>}</div><DialogPrimitive.Close className="gll-dialog-close" aria-label="Fechar"><X size={19}/></DialogPrimitive.Close></header><div className="gll-dialog-body">{children}</div>{footer && <footer className="gll-dialog-footer">{footer}</footer>}</DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>
}

export function Dropdown({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return <DropdownPrimitive.Root><DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger><DropdownPrimitive.Portal><DropdownPrimitive.Content className="gll-dropdown" sideOffset={5} align="end">{children}</DropdownPrimitive.Content></DropdownPrimitive.Portal></DropdownPrimitive.Root>
}
export const DropdownItem = DropdownPrimitive.Item

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={250}><TooltipPrimitive.Root><TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger><TooltipPrimitive.Portal><TooltipPrimitive.Content className="gll-tooltip" sideOffset={6}>{label}<TooltipPrimitive.Arrow className="gll-tooltip-arrow" /></TooltipPrimitive.Content></TooltipPrimitive.Portal></TooltipPrimitive.Root></TooltipPrimitive.Provider>
}

export function PageHeader({ kicker, title, description, actions }: { kicker: string; title: string; description?: string; actions?: ReactNode }) {
  return <header className="gll-page-header"><div><span className="gll-kicker">{kicker}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{actions && <div className="gll-page-actions">{actions}</div>}</header>
}
