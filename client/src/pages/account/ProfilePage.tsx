import {
  KeyIcon,
  MailIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import { useAppSelector } from '../../app/store/configureStore';
import getRoleName from '../../app/utils/rolesNames';
import AppButton from '../../components/common/AppButton';
import ProfileForm from '../../components/forms/ProfileForm';
import Layout from '../../components/Layout';

export default function ProfilePage() {
  const [isEdit, setIsEdit] = useState(false);
  const { user, roles } = useAppSelector((state) => state.account);
  const { shop } = useAppSelector((state) => state.shop);
  const profile = user?.profile;

  if (isEdit || !profile)
    return (
      <Layout className='flex'>
        <div className='container flex-1 mx-auto px-5 flex flex-col items-center justify-center'>
          <p className=' font-Primary text-5xl mb-5 font-thin'>
            {user?.profile ? 'Modifier le profil' : 'Créer votre profil'}
          </p>
          <div className=' max-w-2xl w-full '>
            <ProfileForm onClose={() => setIsEdit(false)} />
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout className='flex container'>
      <div className='container flex-1 mx-auto px-5 flex flex-col gap-y-10 my-10'>
        <div className=' flex flex-col w-full gap-y-4 '>
          <div className='mb-5'>
            <p className=' font-Primary text-3xl lg:text-5xl font-thin mb-2 '>
              {user.profile.fullName}
            </p>
            {shop && (
              <p className='w-full '>
                <span className=' font-semibold uppercase '>
                  {shop.name} -{' '}
                </span>
                {roles.map((role, index) => (
                  <span className='uppercase' key={index}>
                    {getRoleName(role)}
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className='  rounded-md '>
            <p className=' font-Primary text-3xl font-thin mb-5 '>Contact</p>
            <div className='grid lg:grid-cols-2'>
              <div className='flex flex-col gap-y-2'>
                <DetailItem title='Email:' value={profile.email} />
                <DetailItem
                  title='Adresse:'
                  value={[profile.address1, profile.address2]}
                />
              </div>
              <div className='flex flex-col gap-y-2'>
                <DetailItem title='Téléphone:' value={profile.phone} />
                <DetailItem title='Mobile:' value={profile.mobile} />
              </div>
            </div>
          </div>

          <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4'>
            <AppButton
              label={'Modifier'}
              Icon={PencilAltIcon}
              onClick={() => setIsEdit(true)}
              genre='secondary'
            />
            <AppButton
              label={"Changer l'adresse email"}
              Icon={MailIcon}
              onClick={() => setIsEdit(true)}
              genre='secondary'
            />

            <AppButton
              type='button'
              customColors={
                ' bg-orange-700 border-orange-500 hover:bg-orange-500 hover:shadow-orange-700 '
              }
              label='Changer le mot de passe'
              Icon={KeyIcon}
              genre='none'
            />
            <AppButton
              type='button'
              customColors=' bg-red-700 border-red-500 hover:bg-red-500 hover:shadow-red-700 '
              label=' Supprimer le compte'
              Icon={TrashIcon}
              genre={'none'}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface ItemProps {
  title: string;
  value: any;
  horizontal?: boolean;
  className?: string;
}

function DetailItem({
  title,
  value,
  horizontal = false,
  className,
}: ItemProps) {
  return (
    <div
      className={`flex ${horizontal ? 'flex-row' : ' flex-col'} ${className}`}
    >
      <p className=' font-Primary text-base uppercase mr-2 min-w-[4rem]'>
        {title}
      </p>
      {Array.isArray(value) ? (
        <div>
          {value.map((item, index) => (
            <p
              key={index}
              className=' font-Secondary font-normal text-xl capitalize mr-2'
            >
              {item}
            </p>
          ))}
        </div>
      ) : (
        <p className=' font-Secondary font-normal text-xl capitalize'>
          {value}
        </p>
      )}
    </div>
  );
}
