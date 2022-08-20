import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
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
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className='w-full'>
      <ComponentWrapper
        className={className}
        label={props.label}
        element={
          <input
            className={`form-input w-full border-none  bg-transparent py-2 px-5 font-Secondary first-letter:uppercase placeholder:text-gray-400 placeholder:first-letter:uppercase focus:border-none focus:outline-none`}
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
            iconStyle=' text-black opacity-50 '
            Icon={!isVisible ? EyeIcon : EyeOffIcon}
          />
        }
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
    // <label className='flex flex-col gap-y-1'>
    //   {props.label && <span className=' text-sm uppercase'>{props.label}</span>}
    //   <input
    //     className={`form-input autofill:text-white autofill:bg-red-500 dark:autofill:text-white border border-gray-400 focus:border-gray-400 focus:outline-none  focus:border  bg-transparent py-1 px-5 placeholder:first-letter:uppercase placeholder:text-gray-400 w-full  ${
    //       fieldState.error
    //         ? 'border-red-400 focus:border-red-400'
    //         : 'border-gray-400 focus:border-gray-400'
    //     }`}
    //     aria-label={props.label}
    //     type={'password'}
    //     {...props}
    //     {...field}
    //   />
    //   {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
    //     <div className='py-1 w-full'>
    //       <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
    //         {fieldState.error.message}
    //       </p>
    //     </div>
    //   )}
    // </label>
  );
}
