import { motion } from 'framer-motion';
import { IResponsiveTable } from './tableModels';

const styles = {
  header:
    'font-thin font-Primary uppercase text-lg border border-stone-400 py-1 ',
};

export default function ResponsiveTable({
  headers,
  children,
  fixed = false,
}: IResponsiveTable) {
  return (
    <motion.table
      variants={tableContainer}
      initial='hidden'
      animate='show'
      exit='close'
      className={`w-full border-collapse ${
        fixed ? 'table-fixed' : 'table-auto'
      }`}
    >
      <thead className='hidden border border-stone-700 bg-stone-400 text-center text-stone-900 drop-shadow-md md:table-header-group '>
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
      staggerChildren: 0.2,
    },
  },
  close: {},
};
