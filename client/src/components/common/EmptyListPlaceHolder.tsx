export default function EmptyListPlaceHolder({
  body = 'Aucun élément',
}: {
  body?: string;
}) {
  return (
    <div className=' flex items-center justify-center bg-stone-300 p-6'>
      <span className=' font-Primary text-3xl font-thin uppercase text-stone-400'>
        {body}
      </span>
    </div>
  );
}
