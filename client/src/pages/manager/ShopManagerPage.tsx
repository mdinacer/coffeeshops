import {useAppSelector} from '../../app/store/configureStore';
import Layout from '../../components/Layout';
import ShopDetailsHeader from '../../components/shop/ShopDetailsHeader';
import ShopDetailsOwner from '../../components/shop/ShopDetailsOwner';

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
      <div className='my-5 p-5 bg-gray-100 dark:bg-gray-600 rounded '>
        <p className=' font-Primary text-2xl uppercase font-thin'>
          Propriétaire
        </p>
        <div className='w-full grid lg:grid-cols-2 '>
          <ShopDetailsOwner owner={shop.owner} />
        </div>
      </div>
    </Layout>
  );
}
