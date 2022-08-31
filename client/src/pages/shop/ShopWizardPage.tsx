import {
  CheckCircleIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAppSelector } from '../../app/store/configureStore';
import AppButton from '../../components/common/AppButton';
import AppLink from '../../components/common/AppLink';
import ModalDialog from '../../components/common/ModalDialog';
import ProfileForm from '../../components/forms/ProfileForm';
import ShopForm from '../../components/forms/ShopForm';
import ShopUsersForm from '../../components/forms/ShopUsersForm';
import Layout from '../../components/Layout';

export default function ShopWizardPage() {
  const [shopFormVisible, setShopFormVisible] = useState(false);
  const [profileFormVisible, setProfileFormVisible] = useState(false);
  const [usersFormVisible, setUsersFormVisible] = useState(false);
  const [usersValid, setUsersValid] = useState(false);
  const { profile, shopId } = useAppSelector((state) => state.account);
  const isValid = (index: number) => {
    switch (index) {
      case 0:
        return shopId !== null;
      case 1:
        return shopId !== null && profile !== null;
      case 2:
        return usersValid;
      case 3:
        return shopId !== null && profile !== null && usersValid;

      default:
        break;
    }
  };
  return (
    <>
      {shopFormVisible && (
        <ModalDialog title='' active={shopFormVisible}>
          <ShopForm onClose={() => setShopFormVisible(false)} />
        </ModalDialog>
      )}

      {profileFormVisible && (
        <ModalDialog title='' active={profileFormVisible}>
          <ProfileForm
            onClose={() => {
              setProfileFormVisible(false);
            }}
          />
        </ModalDialog>
      )}

      {usersFormVisible && (
        <ModalDialog title='' active={usersFormVisible}>
          <ShopUsersForm
            onClose={() => {
              setUsersValid(true);
              setUsersFormVisible(false);
            }}
          />
        </ModalDialog>
      )}
      <Layout className=' flex h-screen items-center justify-center  overflow-hidden bg-stone-500 2xl:max-w-none'>
        <div className=' w-full bg-stone-300  py-6 md:w-auto md:rounded-2xl'>
          <div className='mb-5 w-full p-6'>
            <p className=' font-Secondary text-3xl uppercase'>
              Premier lancement
            </p>
          </div>
          <ul className='flex min-w-[40vw] list-none flex-col items-stretch gap-y-5'>
            <li className=' flex  min-w-[40vw] flex-row items-center  gap-y-2  border bg-stone-200 px-5 '>
              <div className=' inline-flex flex-auto items-center gap-x-2 py-2'>
                <CheckCircleIcon
                  className={` h-7 w-7  ${
                    isValid(0) ? ' text-yellow-500 ' : ' text-stone-400'
                  }`}
                />
                <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                  cafétéria
                </p>
              </div>

              {!isValid(0) && (
                <AppButton
                  Icon={Cog6ToothIcon}
                  label='Configurer'
                  onClick={() => setShopFormVisible(true)}
                  genre='info'
                />
              )}
            </li>

            <li className=' flex  min-w-[40vw] flex-row items-center  gap-y-2  border bg-stone-200  px-5 '>
              <div className=' inline-flex flex-auto items-center gap-x-2 py-2'>
                <CheckCircleIcon
                  className={` h-7 w-7  ${
                    isValid(1) ? ' text-yellow-500 ' : ' text-stone-400'
                  }`}
                />
                <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                  profil
                </p>
              </div>

              {!isValid(1) && (
                <AppButton
                  disabled={!shopId}
                  Icon={Cog6ToothIcon}
                  label='Configurer'
                  onClick={() => setProfileFormVisible(true)}
                  genre='info'
                />
              )}
            </li>

            <li className=' flex  min-w-[40vw] flex-row items-center  gap-y-2  border bg-stone-200  px-5 '>
              <div className=' inline-flex flex-auto items-center gap-x-2 py-2'>
                <CheckCircleIcon
                  className={` h-7 w-7  ${
                    isValid(2) ? ' text-yellow-500 ' : ' text-stone-400'
                  }`}
                />
                <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                  utilisateurs
                </p>
              </div>

              <AppButton
                disabled={!shopId}
                Icon={Cog6ToothIcon}
                label='Configurer'
                onClick={() => setUsersFormVisible(true)}
                genre='info'
              />
            </li>

            <li className=' flex  flex-row items-center  gap-y-2  border bg-stone-200  px-5 '>
              <div className=' inline-flex flex-auto items-center gap-x-2 py-2'>
                <CheckCircleIcon
                  className={` h-7 w-7  ${
                    isValid(3) ? ' text-yellow-500 ' : ' text-stone-400'
                  }`}
                />
                <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                  inventaire
                </p>
              </div>
              {shopId && (
                <AppLink
                  Icon={ChevronRightIcon}
                  iconRight
                  label='Configurer'
                  toPath={'/management/products'}
                  genre='info'
                />
              )}
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
}
