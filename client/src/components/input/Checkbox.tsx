import { CheckCircleIcon } from '@heroicons/react/solid';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  isChecked?: boolean;
  className?: string;
}

export default function CheckboxInput(props: Props) {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });
  return (
    <label
      className={`flex-auto flex flex-row w-full  items-center  bg-gray-100 border border-gray-300 rounded-lg pl-4`}
    >
      <div className='flex-auto'>
        {props.label && (
          <p className=' min-w-[4rem] w-full text-sm uppercase  opacity-50 border-r border-gray-400  py-2  hover:text-indigo-900'>
            {props.label}
          </p>
        )}
      </div>
      <div className='flex-initial'>
        <input
          className={`form-checkbox hidden appearance-none`}
          aria-label={props.label}
          checked={field.value}
          type={'checkbox'}
          {...props}
          {...field}
        />
        <div
          className={` flex items-center justify-center transition-all duration-300 px-2 py-0`}
        >
          <CheckCircleIcon
            className={`h-7 w-7 transition-all duration-300   ${
              field.value === true
                ? ' opacity-100 text-indigo-500'
                : ' opacity-20'
            }`}
          />
        </div>
      </div>
    </label>
  );
}
