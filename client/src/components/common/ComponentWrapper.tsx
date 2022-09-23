interface Props {
  label?: string;
  element: React.ReactNode;
  button?: React.ReactNode;
  className?: string;
  labelStyle?: string;
}

export default function ComponentWrapper({
  label,
  element,
  button,
  className,
  labelStyle,
}: Props) {
  return (
    <div
      className={` relative flex flex-row items-stretch  rounded-lg border border-stone-400 bg-stone-300 pl-4 ${className}`}
    >
      <label className={`flex w-full flex-auto flex-row items-center gap-x-2 `}>
        <div className='flex-initial'>
          {label && (
            <p
              className={` ${labelStyle} w-full  min-w-[3rem] border-r border-stone-400 pr-2  font-Secondary text-sm uppercase  hover:text-yellow-900`}
            >
              {label}
            </p>
          )}
        </div>
        <div className='flex-auto'>{element}</div>
      </label>
      <div className='flex flex-initial items-stretch overflow-hidden rounded-r-lg'>
        {!!button && button}
      </div>
    </div>
  );
}
