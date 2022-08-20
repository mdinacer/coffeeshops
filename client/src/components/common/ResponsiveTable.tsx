import { motion } from 'framer-motion';
import { IResponsiveTable } from './tableModels';

const styles = {
  header:
    'font-thin font-Primary uppercase text-lg border border-gray-300 py-1 ',
};

export default function ResponsiveTable({
  headers,
  children,
}: IResponsiveTable) {
  return (
    <motion.table
      variants={tableContainer}
      initial='hidden'
      animate='show'
      exit='close'
      className='  w-full table-auto border-collapse border-slate-300'
    >
      <thead className='hidden border border-gray-500 bg-gray-300 text-center drop-shadow-md md:table-header-group '>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={styles.header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className=' grid gap-y-2 md:table-row-group'>{children}</tbody>
    </motion.table>
  );
}

const tableContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
  close: {},
};
