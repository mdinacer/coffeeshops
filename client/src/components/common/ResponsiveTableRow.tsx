import { motion } from 'framer-motion';
import ResponsiveTableCell from './ResponsiveTableCell';
import { ITableRow } from './tableModels';

export default function ResponsiveTableRow({ cells, onClick }: ITableRow) {
  return (
    <motion.tr
      layout
      variants={itemVariants}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={`grid gap-y-0 rounded-2xl border border-gray-100 bg-gray-200  py-2 px-5 md:table-row ${
        onClick && 'cursor-pointer hover:bg-sky-500  hover:text-white '
      }`}
    >
      {cells.map((cell, index) => (
        <ResponsiveTableCell
          key={index}
          title={cell.title}
          value={cell.value}
          align={cell.align}
        />
      ))}
    </motion.tr>
  );
}

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  show: { x: 0, opacity: 1 },
  close: { x: 30, opacity: 0 },
};
