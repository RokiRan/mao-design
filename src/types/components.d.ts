// Form Components
export interface InputProps {
  modelValue: string | number
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  error?: string
}

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps {
  modelValue: string | number | (string | number)[]
  options: SelectOption[]
  multiple?: boolean
  searchable?: boolean
  remote?: boolean
  loading?: boolean
  placeholder?: string
  disabled?: boolean
}

// Events
export interface SelectEvents {
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  (e: 'search', query: string): void
  (e: 'change', value: string | number | (string | number)[]): void
}

export interface InputEvents {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
}
