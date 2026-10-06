import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, CheckCircle2, Search, X } from './icons'

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

const statusTones: Record<string, Tone> = { 'Aprovada': 'success', 'Faturado': 'success', 'Finalizada': 'success', 'Ativo': 'success', 'Em análise': 'warning', 'Em elaboração': 'warning', 'Rascunho': 'warning', 'Em revisão': 'warning', 'Desclassificado': 'danger', 'Disputada': 'info' }
export function StatusBadge({ status }: { status: string }) { return <Badge tone={statusTones[status] ?? 'neutral'}>{status}</Badge> }
export function Tag({ children }: { children: ReactNode }) { return <span className="gll-tag">{children}</span> }

export function Surface({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={clsx('gll-surface', className)} {...props}>{children}</section>
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={clsx('gll-input', className)} {...props} />
})
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={clsx('gll-input', className)} {...props} />
})
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={clsx('gll-input', 'gll-textarea', className)} {...props} />
})

export function Field({ label, hint, error, required, htmlFor, children }: { label: string; hint?: string; error?: string; required?: boolean; htmlFor: string; children: ReactNode }) {
  return <div className="gll-field"><label htmlFor={htmlFor} className="gll-label">{label}{required && <span className="gll-required" aria-hidden="true"> *</span>}</label>{children}{hint && <small id={`${htmlFor}-help`} className="gll-help">{hint}</small>}{error && <small id={`${htmlFor}-error`} className="gll-error" role="alert">{error}</small>}</div>
}

export function Checkbox({ id, label, checked, onCheckedChange, disabled = false }: { id: string; label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean }) {
  return <div className="gll-choice"><CheckboxPrimitive.Root id={id} className="gll-checkbox" checked={checked} onCheckedChange={(value) => onCheckedChange(value === true)} disabled={disabled}><CheckboxPrimitive.Indicator><Check size={13}/></CheckboxPrimitive.Indicator></CheckboxPrimitive.Root><label htmlFor={id}>{label}</label></div>
}
export function Radio({ name, label, value, checked, onChange }: { name: string; label: string; value: string; checked: boolean; onChange: (value: string) => void }) {
  return <label className="gll-choice"><input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)}/>{label}</label>
}
export function Switch({ label, checked, onChange, disabled = false }: { label: string; checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }) {
  return <label className="gll-switch"><input type="checkbox" role="switch" checked={checked} onChange={(event) => onChange(event.target.checked)} disabled={disabled}/><span aria-hidden="true"/><strong>{label}</strong></label>
}
export function Alert({ title, children, tone = 'info' }: { title: string; children: ReactNode; tone?: Tone }) {
  return <div className={clsx('gll-alert', `gll-alert--${tone}`)} role={tone === 'danger' ? 'alert' : 'status'}><strong>{title}</strong><p>{children}</p></div>
}
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) { return <div className="gll-empty"><div className="gll-empty-icon"><Search size={22}/></div><h3>{title}</h3><p>{description}</p>{action}</div> }
export function Loading({ label = 'Carregando dados…' }: { label?: string }) { return <div className="gll-loading" role="status"><span className="gll-spinner" aria-hidden="true"/>{label}</div> }
export function Skeleton({ width = '100%' }: { width?: string }) { return <span className="gll-skeleton" style={{ width }} aria-hidden="true"/> }
export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) { return <div className="gll-toast" role="status"><CheckCircle2 size={18}/><span>{message}</span><button onClick={onDismiss} aria-label="Dispensar mensagem"><X size={16}/></button></div> }
export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(function Table({ className, ...props }, ref) { return <table ref={ref} className={clsx('gll-table', className)} {...props}/> })

export function Dialog({ open, onOpenChange, title, description, children, footer, className }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; children: ReactNode; footer?: ReactNode; className?: string }) {
  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}><DialogPrimitive.Portal><DialogPrimitive.Overlay className="gll-dialog-overlay" /><DialogPrimitive.Content className={clsx('gll-dialog', className)}><header className="gll-dialog-header"><div><DialogPrimitive.Title>{title}</DialogPrimitive.Title>{description && <DialogPrimitive.Description>{description}</DialogPrimitive.Description>}</div><DialogPrimitive.Close className="gll-dialog-close" aria-label="Fechar"><X size={19}/></DialogPrimitive.Close></header><div className="gll-dialog-body">{children}</div>{footer && <footer className="gll-dialog-footer">{footer}</footer>}</DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>
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
