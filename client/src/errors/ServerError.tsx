export default function ServerErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='inline-flex font-Montserrat text-[10rem] lg:text-[16rem] text-center leading-none'>
        500
      </div>
      <p className='font-Primary text-3xl lg:text-5xl font-thin text-center uppercase  rounded-md py-2 px-5'>
        <span className=' font-semibold mr-2'>désolé, </span>
        <span>Erreur Serveur</span>
      </p>
    </div>
  );
}
