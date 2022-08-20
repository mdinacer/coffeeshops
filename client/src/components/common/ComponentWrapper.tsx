interface Props {
  label?: string;
  element: React.ReactNode;
  button?: React.ReactNode;
  className?: string;
}

export default function ComponentWrapper({
  label,
  element,
  button,
  className,
}: Props) {
  return (
    <div
      className={` relative flex flex-row items-stretch  bg-gray-100 border border-gray-300 rounded-lg pl-4 ${className}`}
    >
      <label className={`flex-auto flex flex-row w-full gap-x-2 items-center `}>
        <div className='flex-initial'>
          {label && (
            <p className=' min-w-[4rem] w-full text-sm uppercase  opacity-50 border-r border-gray-400 pr-2  hover:text-sky-900'>
              {label}
            </p>
          )}
        </div>
        <div className='flex-auto'>{element}</div>
      </label>
      <div className='flex-initial flex items-stretch'>
        {!!button && button}
      </div>
    </div>
  );
}
