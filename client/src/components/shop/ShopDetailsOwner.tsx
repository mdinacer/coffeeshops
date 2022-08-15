import {UserProfile} from '../../app/models/userProfile';

interface Props {
  owner: UserProfile;
}
export default function ShopDetailsOwner({ owner }: Props) {
  return (
    <>
      <div>
        <DetailItem title='Nom' value={owner.fullName} />
        <div className='w-full flex flex-col items-start my-2 '>
          <p className='font-Primary text-base font-thin uppercase min-w-[8rem]'>
            Adresse:
          </p>
          <div className='font-Secondary font-thin text-xl'>
            <p>{owner.address1}</p>
            <p>{owner.address2 || ''}</p>
          </div>
        </div>
      </div>
      <div>
        <DetailItem title='Email' value={owner.email} />
        {owner.phone && <DetailItem title='Téléphone' value={owner.phone} />}
        <DetailItem title='Mobile' value={owner.mobile} />
      </div>
    </>
  );
}

interface ItemProps {
  title: string;
  value: any;
  horizontal?: boolean;
}

function DetailItem({ title, value, horizontal = false }: ItemProps) {
  return (
    <div
      className={` w-full flex  my-2 ${
        horizontal ? 'flex-row items-end' : 'flex-col items-start'
      }`}
    >
      <p className=' font-Primary text-lg font-thin uppercase min-w-[8rem]'>
        {title}
      </p>
      <p className='font-Secondary font-thin text-xl'>{value}</p>
    </div>
  );
}
