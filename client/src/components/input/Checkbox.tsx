import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useController, UseControllerProps } from 'react-hook-form';

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
      className={`flex w-full flex-auto flex-row  items-center  rounded-lg border border-stone-400 bg-stone-300 pl-4`}
    >
      <div className='flex-auto'>
        {props.label && (
          <p className=' w-full min-w-[4rem] border-r border-stone-400  py-2 text-sm uppercase   '>
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
          className={` flex items-center justify-center px-2 py-0 transition-all duration-300`}
        >
          <CheckCircleIcon
            className={`h-7 w-7 transition-all duration-300   ${
              field.value === true
                ? ' text-yellow-500 opacity-100'
                : ' opacity-20'
            }`}
          />
        </div>
      </div>
    </label>
  );
}
