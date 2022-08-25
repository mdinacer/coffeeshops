import { ITableCell } from './tableModels';

export default function ResponsiveTableCell({
  align = 'left',
  title,
  value,
  className,
}: ITableCell) {
  return (
    <td
      align={align}
      className={`inline-flex h-full w-full items-end justify-between px-0 py-1 md:table-cell md:w-auto md:border md:border-stone-400 md:px-5  ${className}`}
    >
      <span className='block font-Primary text-base font-thin uppercase md:hidden'>
        {title}
      </span>
      <div className=' whitespace-pre-line font-Secondary text-base font-light capitalize'>
        {value}
      </div>
    </td>
  );
}
