import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  placeholder: string;
  autoComplete?: string | undefined;
}

export default function AppPasswordInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <label className='flex flex-col gap-y-1'>
      {props.label && <span className=' text-sm uppercase'>{props.label}</span>}
      <input
        className={`form-input autofill:text-white autofill:bg-red-500 dark:autofill:text-white border border-gray-400 focus:border-gray-400 focus:outline-none  focus:border  bg-transparent py-1 px-5 placeholder:first-letter:uppercase placeholder:text-gray-400 w-full  ${
          fieldState.error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-400 focus:border-gray-400'
        }`}
        aria-label={props.label}
        type={'password'}
        {...props}
        {...field}
      />
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </label>
  );
}
