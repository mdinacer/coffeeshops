import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid';
import {useController, UseControllerProps} from 'react-hook-form';
import ComponentWrapper from '../common/ComponentWrapper';

interface Props extends UseControllerProps {
  label?: string;
  placeholder: string;
  showButtons?: boolean;
  min?: number;
  max?: number;
  prefix?: string;
  className?: string;
}

export default function NumberInput({
  showButtons,
  prefix,
  className,
  ...props
}: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.min || 0,
  });

  const handleIncrease = () => {
    field.onChange(+field.value + 1);
  };

  const handleDecrease = () => {
    const min = props.min || 0;
    if (+field.value > min) {
      field.onChange(+field.value - 1);
    }
  };

  return (
    <div className='w-full'>
      <ComponentWrapper
        label={props.label}
        element={
          <div className='flex-auto flex flex-row items-center'>
            <input
              className={`form-input w-full font-Secondary text-center border-none focus:outline-none  focus:border  bg-transparent placeholder:first-letter:uppercase placeholder:text-gray-400 py-2`}
              aria-label={props.label}
              type={'number'}
              {...props}
              {...field}
            />
            {prefix && (
              <p className=' text-gray-500 text-sm font-Secondary flex-initial pr-2'>
                {prefix}
              </p>
            )}
          </div>
        }
        button={
          showButtons && (
            <div className='flex flex-row justify-evenly items-stretch  h-full  '>
              <button
                onClick={handleDecrease}
                disabled={+field.value <= (props.min || 0)}
                type='button'
                className={`flex  items-center justify-center bg-gray-300    ${
                  +field.value <= (props.min || 0)
                    ? 'text-gray-200 bg-gray-100'
                    : ''
                }`}
              >
                <ChevronDownIcon className='h-6 w-6' />
              </button>

              <button
                onClick={handleIncrease}
                type='button'
                className={`flex  items-center justify-center bg-gray-300  h-full `}
              >
                <ChevronUpIcon className='h-6 w-6' />
              </button>
            </div>
          )
        }
      />
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
