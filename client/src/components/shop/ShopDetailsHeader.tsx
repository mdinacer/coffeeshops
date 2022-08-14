interface Props {
  name: string;
  tablesCount: number;
  productsCount: number;
  operationsCount: number;
}
export default function ShopDetailsHeader({
  name,
  tablesCount,
  productsCount,
  operationsCount,
}: Props) {
  return (
    <div className=' flex flex-col gap-y-4 lg:flex-row justify-between items-center'>
      <p className=' font-Primary text-6xl font-thin'>{name}</p>
      <div className='grid grid-cols-3 gap-5'>
        <DetailItem title={'Tables'} value={tablesCount} />
        <DetailItem title={'Articles'} value={productsCount} />
        <DetailItem title={'Opérations'} value={operationsCount} />
      </div>
    </div>
  );
}

interface ItemProps {
  title: string;
  value: any;
}

function DetailItem({ title, value }: ItemProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className=' font-Primary text-4xl font-thin'>{value}</p>
      <p className='uppercase font-Secondary font-normal text-sm'>{title}</p>
    </div>
  );
}
