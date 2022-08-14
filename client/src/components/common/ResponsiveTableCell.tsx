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
      className={`w-full md:w-auto h-full inline-flex justify-between md:table-cell items-end px-0 md:px-5 md:border py-1 md:border-gray-200  ${className}`}
    >
      <span className='block md:hidden font-Primary text-base font-thin uppercase'>
        {title}
      </span>
      <div className='capitalize font-Secondary text-lg'>{value}</div>
    </td>
  );
}
