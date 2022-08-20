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
        className={`flex-auto flex flex-col w-full gap-x-2 items-start bg-gray-100 border border-gray-300 rounded-lg px-4 `}
      >
        <div className='flex-initial w-full'>
          {props.label && (
            <p className=' min-w-[4rem] w-full text-sm uppercase  opacity-50 border-b border-b-gray-300 py-2  hover:text-sky-900'>
              {props.label}
            </p>
          )}
        </div>
        <div className='flex-auto w-full'>
          <textarea
            rows={props.rows || 3}
            className={`form-input border-none focus:outline-none bg-transparent py-1 resize-none  placeholder:first-letter:uppercase placeholder:text-gray-400 w-full`}
            aria-label={props.label}
            type={props.type}
            {...props}
            {...field}
          />
        </div>
      </label>
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
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
    //     className={`form-input autofill:text-white autofill:bg-red-500 dark:autofill:text-white border border-gray-400 focus:border-gray-400 focus:outline-none  focus:border  bg-transparent py-1 px-5 placeholder:first-letter:uppercase placeholder:text-gray-400 w-full  ${
    //       fieldState.error
    //         ? 'border-red-400 focus:border-red-400'
    //         : 'border-gray-400 focus:border-gray-400'
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
