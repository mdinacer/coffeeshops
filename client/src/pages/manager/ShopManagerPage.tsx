import { useAppSelector } from '../../app/store/configureStore';
import Layout from '../../components/Layout';
import ShopDetailsHeader from '../../components/shop/ShopDetailsHeader';
import ShopDetailsOwner from '../../components/shop/ShopDetailsOwner';
import ShopUsersForm from '../../components/shop/ShopUsersForm';

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
        <div className='grid w-full lg:grid-cols-2 '>
          <ShopUsersForm />
        </div>
      </div>
    </Layout>
  );
}
