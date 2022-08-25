import AppLink from '../../components/common/AppLink';
import Layout from '../../components/Layout';

export default function HomePage() {
  const random = Math.floor(Math.random() * 4);

  return (
    <Layout className=' w-scree relative block min-h-screen overflow-x-hidden bg-black px-0 py-0 2xl:max-w-none'>
      <video
        autoPlay
        loop
        playsInline
        muted
        className='fixed top-0 left-0 hidden h-full w-full object-cover object-center md:block'
        src={`/assets/videos/hero${random + 1}.mp4`}
      />

      <div className='fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-gradient-to-br from-[#3B9AE1] via-[#876445] to-[#100720] bg-fixed opacity-60' />
      <div className=' top-0 left-0 bottom-0 right-0 flex h-screen w-full flex-auto snap-center items-center justify-center overflow-hidden'>
        <div className='  flex w-full max-w-xl  flex-col  items-center rounded-2xl  bg-black bg-opacity-10  p-12 text-stone-100  backdrop-blur-lg '>
          <div className='mb-5 flex flex-col items-center justify-center text-9xl opacity-60'>
            <p className='font-Primary font-thin uppercase '>Coffee</p>
            <p className=' font-Secondary text-8xl font-bold uppercase'>CUPS</p>
          </div>

          <p className=' text-center font-Secondary text-base font-normal opacity-80'>
            Coffee Cups équipe votre café d'une technologie "Point De Vente" de
            pointe conçue par des spécialistes de l'industrie du café. Coffee
            Cups Manager a tout ce dont vous avez besoin pour développer votre
            boutique, de la technologie de point de vente de base aux outils
            commerciaux complets et avancés.
          </p>
          <div className=' mt-10 grid grid-cols-2 gap-4 '>
            <AppLink
              label='Créer un compte'
              toPath={'/account/register'}
              className={` ${buttonStyle}  hover:border-green-400 hover:bg-green-500 hover:shadow-green-600`}
            />
            <AppLink
              label='Se connecter'
              toPath={'/account/login'}
              className={` ${buttonStyle}  hover:border-yellow-400 hover:bg-yellow-500 hover:shadow-yellow-600`}
            />
          </div>
        </div>
      </div>

      <div className='relative flex h-screen w-screen  snap-center flex-col items-center justify-center bg-stone-200  '>
        <div className=' w-full py-10 opacity-70'>
          <p className=' text-center font-Primary text-6xl font-thin uppercase'>
            Caractéristiques
          </p>
        </div>
        <div className='container relative mx-auto grid w-screen grid-cols-2 gap-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className=' flex h-auto w-full  flex-row items-center  gap-10  rounded-xl bg-stone-100 py-6 px-12'
            >
              <div className=' flex-initial'>
                <div className='flex w-full items-center justify-center'>
                  <img
                    src={`/assets/images/home/${feature.image}`}
                    alt={feature.title}
                    className=' '
                  />
                </div>
              </div>
              <div className=' flex-auto'>
                <p className=' mb-5 font-Primary text-2xl font-thin uppercase  '>
                  {feature.title}
                </p>
                <p className=' max-w-md font-Secondary font-light'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const buttonStyle =
  '  rounded-2xl hover:-translate-y-1 hover:scale-110 hover:shadow-lg bg-stone-200 bg-opacity-20 ';

type featureItem = {
  id: number;
  title: string;
  image: string;
  description?: string;
};

const features: featureItem[] = [
  {
    id: 0,
    title: 'Accessible',
    image: 'responsive.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus similique maiores culpa beatae sint iusto, totam earum perferendis quis sapiente placeat ad, magni maxime ducimus reiciendis suscipit eligendi quo ab!`,
  },
  {
    id: 1,
    title: 'Détaillé',
    image: 'reports.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus similique maiores culpa beatae sint iusto, totam earum perferendis quis sapiente placeat ad, magni maxime ducimus reiciendis suscipit eligendi quo ab!`,
  },
  {
    id: 2,
    title: 'précis',
    image: 'money_management.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus similique maiores culpa beatae sint iusto, totam earum perferendis quis sapiente placeat ad, magni maxime ducimus reiciendis suscipit eligendi quo ab!`,
  },
  {
    id: 3,
    title: 'multi rôles',
    image: 'users_management.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus similique maiores culpa beatae sint iusto, totam earum perferendis quis sapiente placeat ad, magni maxime ducimus reiciendis suscipit eligendi quo ab!`,
  },
  {
    id: 4,
    title: 'Intuitif',
    image: 'user_actions.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus similique maiores culpa beatae sint iusto, totam earum perferendis quis sapiente placeat ad, magni maxime ducimus reiciendis suscipit eligendi quo ab!`,
  },
  {
    id: 5,
    title: 'multi fonctions',
    image: 'multitask.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus similique maiores culpa beatae sint iusto, totam earum perferendis quis sapiente placeat ad, magni maxime ducimus reiciendis suscipit eligendi quo ab!`,
  },
];
