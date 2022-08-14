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
      className={`py-2 px-5 bg-gray-50 border border-gray-100 rounded-2xl  grid gap-y-2 md:table-row ${
        onClick && 'hover:text-white cursor-pointer  hover:bg-indigo-500 '
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
