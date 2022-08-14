export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='inline-flex font-Montserrat text-[10rem] lg:text-[16rem] text-center leading-none'>
        404
      </div>
      <p className='font-Primary text-3xl lg:text-5xl font-thin text-center uppercase  rounded-md py-2 px-5'>
        <span className=' font-semibold mr-2'>désolé, </span>
        <span>Page introuvable</span>
      </p>
    </div>
  );
}
