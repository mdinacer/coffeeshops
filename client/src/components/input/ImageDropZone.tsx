import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  className?: string;
}

export default function ImageDropZone(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.webp'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className={`flex h-full w-full flex-col overflow-hidden text-inherit ${props.className}`}
    >
      <div
        className={`${
          isDragActive ? ' bg-green-500' : 'bg-inherit '
        } flex w-full flex-auto cursor-pointer flex-col  items-center  justify-center`}
      >
        <input aria-label='dropZone' {...getInputProps()} />
        <div className=' flex flex-col items-center justify-center'>
          <svg
            aria-hidden='true'
            className='mb-3 h-10 w-10 text-stone-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            ></path>
          </svg>
          <p className='mb-2 flex flex-col text-center font-Secondary text-xs text-stone-500 dark:text-stone-400 md:text-sm'>
            <span className='font-semibold'>Cliquez pour télécharger</span>
            <span>ou faites glisser et déposez</span>
          </p>
        </div>
      </div>
      {fieldState.error?.message && (
        <div className='w-full flex-initial py-1 px-2'>
          <p
            className={`w-full text-center font-Secondary text-base leading-none text-red-500  lg:text-sm `}
          >
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
