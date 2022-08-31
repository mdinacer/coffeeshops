import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label?: string;
  type?: string;
  rows?: number;
  placeholder: string;
  autoComplete?: string | undefined;
  initial?: string;
  classes?: string;
}

export default function TextArea(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  return (
    <div>
      <label
        className={`flex w-full flex-auto flex-col items-start gap-x-2 rounded-lg border border-stone-400 bg-stone-300 px-4 `}
      >
        <div className='w-full flex-initial'>
          {props.label && (
            <p className=' w-full min-w-[4rem] border-b border-b-stone-400  py-2 text-sm uppercase opacity-50  hover:text-yellow-900'>
              {props.label}
            </p>
          )}
        </div>
        <div className='w-full flex-auto'>
          <textarea
            rows={props.rows || 3}
            className={`form-input w-full resize-none border-none bg-transparent py-1  placeholder:text-stone-400 placeholder:first-letter:uppercase focus:outline-none`}
            aria-label={props.label}
            type={props.type}
            {...props}
            {...field}
          />
        </div>
      </label>
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='w-full py-1'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
    // <label className='flex flex-col gap-y-1'>
    //   {props.label && <span className=' text-sm uppercase'>{props.label}</span>}
    //   <textarea
    //     rows={props.rows || 3}
    //     className={`form-input autofill:text-stone-100 autofill:bg-red-500 dark:autofill:text-stone-100 border border-stone-400 focus:border-stone-400 focus:outline-none  focus:border  bg-transparent py-1 px-5 placeholder:first-letter:uppercase placeholder:text-stone-400 w-full  ${
    //       fieldState.error
    //         ? 'border-red-400 focus:border-red-400'
    //         : 'border-stone-400 focus:border-stone-400'
    //     }`}
    //     aria-label={props.label}
    //     type={props.type}
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
