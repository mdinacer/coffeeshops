import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useController, UseControllerProps } from 'react-hook-form';
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
    <div className='w-full text-stone-600'>
      <ComponentWrapper
        label={props.label}
        element={
          <div className='flex flex-auto flex-row items-center overflow-hidden'>
            <input
              className={`form-input w-full border-none bg-transparent py-1 text-center font-Primary  text-lg  placeholder:text-stone-400 placeholder:first-letter:uppercase focus:border focus:outline-none`}
              aria-label={props.label}
              type={'number'}
              {...props}
              {...field}
            />
            {prefix && (
              <p className=' flex-initial pr-2 font-Primary text-lg text-stone-400'>
                {prefix}
              </p>
            )}
          </div>
        }
        button={
          showButtons && (
            <div className='flex h-full flex-row items-stretch  justify-evenly overflow-hidden rounded-2xl  '>
              <button
                onClick={handleDecrease}
                disabled={+field.value <= (props.min || 0)}
                type='button'
                className={`${buttonStyle} ${
                  +field.value <= (props.min || 0)
                    ? 'bg-stone-200 text-stone-400'
                    : ''
                }`}
              >
                <ChevronDownIcon className='h-6 w-6' />
              </button>

              <button
                onClick={handleIncrease}
                type='button'
                className={buttonStyle}
              >
                <ChevronUpIcon className='h-6 w-6' />
              </button>
            </div>
          )
        }
      />
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='w-full py-1'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}

const buttonStyle =
  ' flex items-center justify-center bg-stone-300  px-1 md:px-2 ';
