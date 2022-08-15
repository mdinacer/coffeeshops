import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {useController, UseControllerProps} from 'react-hook-form';

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
      className={`w-full text-inherit overflow-hidden flex flex-col h-full ${props.className}`}
    >
      <div
        className={`${
          isDragActive ? ' bg-green-500' : 'bg-inherit '
        } flex-auto flex flex-col justify-center items-center  w-full  cursor-pointer`}
      >
        <input aria-label='dropZone' {...getInputProps()} />
        <div className=' flex flex-col items-center justify-center'>
          <svg
            aria-hidden='true'
            className='mb-3 w-10 h-10 text-gray-400'
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
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400 text-center flex flex-col font-Secondary'>
            <span className='font-semibold'>Cliquez pour télécharger</span>
            <span>ou faites glisser et déposez</span>
          </p>
        </div>
      </div>
      {fieldState.error?.message && (
        <div className='py-1 px-2 w-full flex-initial'>
          <p
            className={`text-base lg:text-sm font-Secondary leading-none w-full text-center  text-red-500 `}
          >
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
