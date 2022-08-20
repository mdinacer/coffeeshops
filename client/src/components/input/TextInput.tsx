import { useController, UseControllerProps } from 'react-hook-form';
import ComponentWrapper from '../common/ComponentWrapper';

interface Props extends UseControllerProps {
  label?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string | undefined;
  initial?: string;
  className?: string;
  inputStyle?: string;
  button?: React.ReactNode;
}

export default function TextInput({
  className,
  initial,
  inputStyle,
  ...props
}: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: initial || '',
  });

  return (
    <div className='w-full'>
      <ComponentWrapper
        className={className}
        label={props.label}
        element={
          <input
            className={`${inputStyle} form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-gray-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none`}
            aria-label={props.label}
            type={props.type}
            {...props}
            {...field}
          />
        }
        button={props.button}
      />
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='w-full py-0'>
          <p
            className={`w-full text-left font-Secondary text-sm text-red-500 first-letter:uppercase `}
          >
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
