import {useAppSelector} from '../../app/store/configureStore';
import ShopForm from '../../components/forms/ShopForm';
import Layout from '../../components/Layout';

export default function ShopFormPage() {
  const { shopId } = useAppSelector((state) => state.account);
  return (
    <Layout className='flex'>
      <div className='container flex-1 mx-auto px-5 flex flex-col items-center justify-center'>
        <p className=' font-Primary text-5xl mb-5 font-thin'>
          {shopId ? 'Modifier la cafétéria' : 'Créer votre Cafétéria'}
        </p>
        <div className=' max-w-2xl w-full '>
          <ShopForm />
        </div>
      </div>
    </Layout>
  );
}
