import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { KeyIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAppSelector } from '../../app/store/configureStore';
import getRoleName from '../../app/utils/rolesNames';
import AppButton from '../../components/common/AppButton';
import ModalDialog from '../../components/common/ModalDialog';
import PasswordChangeForm from '../../components/forms/PasswordChangeForm';
import ProfileForm from '../../components/forms/ProfileForm';
import Layout from '../../components/Layout';
import MailChangeRequest from './MailChangeRequest';

export default function ProfilePage() {
  const [isEdit, setIsEdit] = useState(false);
  const { user, roles } = useAppSelector((state) => state.account);
  const { shop } = useAppSelector((state) => state.shop);
  const profile = user?.profile;
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);

  if (isEdit || !profile)
    return (
      <Layout className='flex'>
        <div className='container mx-auto flex flex-1 flex-col items-center justify-center px-5'>
          <p className=' mb-5 font-Primary text-5xl font-thin'>
            {user?.profile ? 'Modifier le profil' : 'Créer votre profil'}
          </p>
          <div className=' w-full max-w-2xl '>
            <ProfileForm onClose={() => setIsEdit(false)} />
          </div>
        </div>
      </Layout>
    );

  return (
    <>
      <ModalDialog
        title="Changement de l'email"
        active={isChangeEmail}
        onClose={() => setIsChangeEmail(false)}
      >
        <MailChangeRequest onClose={() => setIsChangeEmail(false)} />
      </ModalDialog>

      <ModalDialog
        containerStyle=' max-w-sm'
        title='Changement de mot de passe'
        active={isPasswordChange}
        onClose={() => setIsPasswordChange(false)}
      >
        <PasswordChangeForm onClose={() => setIsPasswordChange(false)} />
      </ModalDialog>
      <Layout className='m-auto h-auto text-stone-600 2xl:max-w-6xl'>
        <div className=' flex w-full flex-col gap-y-4 '>
          <div className='mb-5'>
            <p className=' mb-2 font-Primary text-3xl font-thin lg:text-5xl '>
              {user.profile.fullName}
            </p>
            {shop && (
              <p className='w-full '>
                <span className=' font-semibold uppercase '>
                  {shop.name} -{' '}
                </span>
                {roles &&
                  roles.map((role, index) => (
                    <span className='uppercase' key={index}>
                      {getRoleName(role)}
                    </span>
                  ))}
              </p>
            )}
          </div>

          <div className='  rounded-md '>
            <p className=' mb-5 font-Primary text-3xl font-thin '>Contact</p>
            <div className='grid lg:grid-cols-2'>
              <div className='flex flex-col gap-y-2'>
                <DetailItem title='Email:' value={profile.email} />
                <DetailItem
                  title='Adresse:'
                  value={[profile.address1, profile.address2]}
                />
              </div>
              <div className='flex flex-col gap-y-2'>
                <DetailItem
                  title='Téléphone:'
                  value={profile.phone || 'Aucun'}
                />
                <DetailItem title='Mobile:' value={profile.mobile} />
              </div>
            </div>
          </div>

          <div className='mt-5 grid w-full grid-cols-1 gap-4 lg:grid-cols-3'>
            <AppButton
              label={'Modifier'}
              Icon={PencilSquareIcon}
              onClick={() => setIsEdit(true)}
              genre='secondary'
            />
            <AppButton
              label={"Changer l'adresse email"}
              Icon={EnvelopeIcon}
              onClick={() => setIsChangeEmail(true)}
              genre='secondary'
            />

            <AppButton
              disabled={isPasswordChange}
              onClick={() => setIsPasswordChange(true)}
              type='button'
              label={
                isPasswordChange
                  ? 'Demande en cours'
                  : 'Changer le mot de passe'
              }
              Icon={KeyIcon}
              genre='warning'
            />
            {/* <AppButton
            type='button'
            label=' Supprimer le compte'
            Icon={TrashIcon}
            genre={'error'}
          /> */}
          </div>
        </div>
      </Layout>
    </>
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
      <p className=' mr-2 min-w-[4rem] font-Primary text-base uppercase'>
        {title}
      </p>
      {Array.isArray(value) ? (
        <div>
          {value.map((item, index) => (
            <p
              key={index}
              className=' mr-2 font-Secondary text-xl font-normal capitalize'
            >
              {item}
            </p>
          ))}
        </div>
      ) : (
        <p className=' font-Secondary text-xl font-normal capitalize'>
          {value}
        </p>
      )}
    </div>
  );
}
