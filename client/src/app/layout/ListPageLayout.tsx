import Pagination from '../../components/input/Pagination';
import Layout from '../../components/Layout';
import { MetaData } from '../models/pagination';

interface Props {
  title: string;
  stats?: Array<{ title: string; value: any }>;
  list: React.ReactNode;
  actionButton?: React.ReactNode;
  filters?: React.ReactNode;
  metaData: MetaData | null;
  onPageChange: (page: number) => void;
  dialogVisible?: boolean;
  dialogContent?: React.ReactNode;
}

export default function ListPageLayout({
  title,
  list,
  stats,
  actionButton,
  filters,
  metaData,
  onPageChange,
  dialogVisible,
  dialogContent,
}: Props) {
  return (
    <Layout
      dialogContent={dialogContent}
      dialogVisible={dialogVisible}
      className=' flex flex-col items-stretch gap-y-4 md:gap-y-10'
    >
      <div className='flex-initial '>
        <h1 className={` font-Primary text-4xl lg:text-5xl font-thin`}>
          {title}
        </h1>
      </div>
      <div className='flex-initial flex flex-col md:flex-row gap-4 rounded-md bg-gray-300  md:bg-transparent md:justify-between md:items-center '>
        {stats && stats.length > 0 && (
          <div className=' grid lg:grid-flow-col lg:gap-5 py-2 px-4 md:p-0'>
            {stats.map((item, index) => (
              <StatItem key={index} title={item.title} value={item.value} />
            ))}
          </div>
        )}
        <div>{actionButton}</div>
      </div>

      <div className='flex-initial'>{filters}</div>

      <div className='flex-auto '>{list}</div>

      {metaData && metaData.totalPages > 0 && (
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
    <div className='flex lg:flex-row gap-x-4 items-end w-full justify-between  lg:justify-end lg:px-5'>
      <p className=' font-Secondary uppercase text-base'>{title}</p>
      <p className=' font-Primary uppercase text-lg lg:text-2xl'>{value}</p>
    </div>
  );
}
