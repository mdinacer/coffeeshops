import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import AppButton from '../common/AppButton';
import ComponentWrapper from '../common/ComponentWrapper';

interface Props extends UseControllerProps {
  label: string;
  placeholder: string;
  autoComplete?: string | undefined;
  className?: string;
}

export default function AppPasswordInput({ className, ...props }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    fieldState: { error, isDirty, isTouched },
    field,
  } = useController({ ...props, defaultValue: '' });

  return (
    <div className='w-full'>
      <ComponentWrapper
        className={className}
        label={props.label}
        element={
          <input
            className={`form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-stone-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none`}
            aria-label={props.label}
            type={isVisible ? 'text' : 'password'}
            {...props}
            {...field}
          />
        }
        button={
          <AppButton
            onClick={() => setIsVisible((prev) => !prev)}
            type='button'
            genre='none'
            className=' border-none'
            iconStyle=' text-stone-700  opacity-50 '
            Icon={!isVisible ? EyeIcon : EyeSlashIcon}
          />
        }
      />

      {error && (isDirty || isTouched) && (
        <div className='w-full py-2'>
          <span
            className={`w-full whitespace-pre-line text-left font-Secondary text-sm  text-red-500 first-letter:uppercase `}
          >
            {error.message}
          </span>
        </div>
      )}
    </div>
  );
}
