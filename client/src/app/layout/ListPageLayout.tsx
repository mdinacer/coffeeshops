import Pagination from '../../components/input/Pagination';
import Layout from '../../components/Layout';
import { MetaData } from '../models/pagination';

interface Props {
  title?: string;
  stats?: Array<{ title: string; value: any }>;
  list: React.ReactNode;
  header?: React.ReactNode;
  actionButton?: React.ReactNode;
  filters?: React.ReactNode;
  metaData: MetaData | null;
  className?: string;
  onPageChange: (page: number) => void;
}

export default function ListPageLayout({
  title,
  list,
  header,
  stats,
  actionButton,
  filters,
  metaData,
  className,
  onPageChange,
}: Props) {
  return (
    <Layout
      className={` ${className} ax-h-full flex flex-col items-stretch  gap-y-4 md:gap-y-5 `}
    >
      {(title || actionButton) && (
        <div className='mb-5 flex w-full flex-col items-center justify-start gap-y-5 md:flex-row md:items-center md:justify-between '>
          {title && (
            <h1
              className={` font-Primary text-4xl font-thin capitalize lg:text-5xl`}
            >
              {title}
            </h1>
          )}
          {actionButton && <div>{actionButton}</div>}
        </div>
      )}
      {header && <div>{header}</div>}
      {stats && (
        <div className='flex flex-initial flex-col items-center justify-center gap-4 rounded-md border-y border-stone-300  py-3 md:flex-row  '>
          {stats.length > 0 && (
            <div className=' grid w-full py-2 px-4 md:w-auto md:p-0 lg:grid-flow-col lg:gap-5'>
              {stats.map((item, index) => (
                <StatItem key={index} title={item.title} value={item.value} />
              ))}
            </div>
          )}
        </div>
      )}

      {filters && <div className='flex-initial'>{filters}</div>}

      <div className='flex-auto overflow-y-auto pr-3'>{list}</div>

      {metaData && (
        <div className='flex-initial'>
          <Pagination metaData={metaData} onPageChange={onPageChange} />
        </div>
      )}
    </Layout>
  );
}

interface ItemProps {
  title: string;
  value: any;
}

function StatItem({ title, value }: ItemProps) {
  return (
    <div className='flex w-full items-end justify-between gap-x-4 lg:flex-row  lg:justify-end lg:px-5'>
      <p className=' font-Secondary text-base uppercase'>{title}</p>

      {typeof value === 'string' ? (
        <p className=' font-Primary text-lg uppercase lg:text-4xl'>{value}</p>
      ) : (
        <div className='font-Primary text-lg uppercase lg:text-4xl'>
          {value}
        </div>
      )}
    </div>
  );
}
