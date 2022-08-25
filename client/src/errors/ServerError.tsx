import { HomeIcon } from '@heroicons/react/outline';
import AppLink from '../components/common/AppLink';
import Layout from '../components/Layout';

export default function ServerErrorPage() {
  return (
    <Layout className='flex h-screen flex-col items-center justify-center'>
      <div className='inline-flex text-center font-Secondary text-[10rem] leading-none lg:text-[16rem]'>
        500
      </div>
      <p className='rounded-md py-2 px-5 text-center font-Primary text-3xl  font-thin uppercase lg:text-5xl'>
        <span className=' mr-2 font-semibold'>désolé, </span>
        <span>Erreur Serveur</span>
      </p>

      <AppLink
        toPath='/'
        label='Accueil'
        Icon={HomeIcon}
        genre='warning'
        className=' mt-5 w-full max-w-lg rounded-md'
      />
    </Layout>
  );
}
