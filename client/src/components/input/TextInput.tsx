import { UseControllerProps, useController } from 'react-hook-form';
import ComponentWrapper from '../common/ComponentWrapper';

interface Props extends UseControllerProps {
  label?: string;
  type?: string;
  placeholder: string;
  autoComplete?: string | undefined;
  initial?: string;
  className?: string;
  button?: React.ReactNode;
}

export default function TextInput({
  className,
  initial,

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
            className={`form-input font-Secondary first-letter:uppercase  border-none focus:border-none focus:outline-none bg-transparent py-2 px-5 placeholder:first-letter:uppercase placeholder:text-gray-400 w-full`}
            aria-label={props.label}
            type={props.type}
            {...props}
            {...field}
          />
        }
        button={props.button}
      />
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-0 w-full'>
          <p
            className={`w-full font-Secondary text-sm text-left text-red-500 first-letter:uppercase `}
          >
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
