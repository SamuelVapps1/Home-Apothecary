export interface InputProps {
  /** Label rendered above the input in tracked uppercase */
  label?: string;
  /** Placeholder text inside the input */
  placeholder?: string;
  /** HTML input type */
  type?: 'text' | 'search' | 'email' | 'password' | 'number';
  /** Controlled value */
  value?: string;
  /** Change event handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Icon element shown on the left inside the input field */
  leadingIcon?: React.ReactNode;
  /** Helper or disclaimer text shown below the field in italic */
  hint?: string;
}
