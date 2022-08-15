import {motion} from 'framer-motion';
import {IResponsiveTable} from './tableModels';

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
      variants={containerVariants}
      initial='hidden'
      animate='show'
      exit='close'
      className='table-auto w-full border-collapse borde border-slate-300'
    >
      <thead className='bg-gray-300 text-center hidden md:table-header-group drop-shadow-md border border-gray-500 '>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={styles.header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className=' grid gap-y-5 md:table-row-group'>{children}</tbody>
    </motion.table>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
  close: {},
};
