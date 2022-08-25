import ComponentWrapper from '../common/ComponentWrapper';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string | undefined;
  value: any;
  initialValue?: string;
  className?: string;
  inputStyles?: string;
  min?: number;
  max?: number;
  onChange: (value: any) => void;
  onEnter?: (value: any) => void;
  button?: React.ReactNode;
}

export default function TextField({
  className,
  initialValue,
  inputStyles,
  onChange,
  onEnter,
  button,
  ...props
}: Props) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (onEnter && event.key === 'Enter') {
      onEnter(event.target.value);
    }
  }
  return (
    <ComponentWrapper
      className={className}
      label={props.label}
      element={
        <input
          onKeyDown={handleKeyDown}
          className={`${inputStyles} form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-stone-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none `}
          aria-label={props.label}
          type={props.type}
          {...props}
          onChange={({ target }) => onChange(target.value)}
        />
      }
      button={button}
    />
  );
}
