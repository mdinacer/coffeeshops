import { useAppSelector } from '../../app/store/configureStore';
import Layout from '../../components/Layout';
import ShopDetailsHeader from '../../components/shop/ShopDetailsHeader';

export default function ShopManagerPage() {
  const { shop } = useAppSelector((state) => state.shop);

  if (!shop) return <div>No Shop</div>;
  return (
    <Layout>
      <ShopDetailsHeader
        name={shop.name}
        tablesCount={shop.tablesCount}
        productsCount={shop.productsCount}
        operationsCount={shop.operationsCount}
      />
      <div className='my-5 rounded bg-gray-100 p-5 dark:bg-gray-600 '>
        <p className=' font-Primary text-2xl font-thin uppercase'>
          Propriétaire
        </p>
      </div>
    </Layout>
  );
}
