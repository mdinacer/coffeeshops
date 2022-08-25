import LoadingAnimation from '../../app/layout/LoadingAnimation';

interface Props {
  message?: string;
  className?: string;
}

export default function LoadingComponent({
  message = 'Chargement en cours...',
  className = '  fixed top-0 left-0 right-0 bottom-0 z-50 flex select-none items-center justify-center border-yellow-500 bg-gray-900 text-stone-100  ',
}: Props) {
  return (
    <div className={`${className} `}>
      <div className='flex flex-col items-center justify-center'>
        <LoadingAnimation />
        <p className=' mt-5 font-Primary text-3xl font-thin uppercase lg:text-5xl'>
          {message}
        </p>
      </div>
    </div>
  );
}
