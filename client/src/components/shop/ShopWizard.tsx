import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import AppDialog from '../common/AppDialog';
import ProfileForm from '../forms/ProfileForm';
import ShopForm from '../forms/ShopForm';
import ShopUsersForm from '../forms/ShopUsersForm';
import Layout from '../Layout';

interface Props {
  onClose: () => void;
}

export default function ShopWizard({ onClose }: Props) {
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
    <Layout
      dialogVisible={shopFormVisible || profileFormVisible || usersFormVisible}
      dialogContent={
        <AppDialog>
          {shopFormVisible && (
            <ShopForm onClose={() => setShopFormVisible(false)} />
          )}

          {profileFormVisible && (
            <ProfileForm
              onClose={(value) => {
                setProfileFormVisible(false);
              }}
            />
          )}

          {usersFormVisible && (
            <ShopUsersForm
              onClose={() => {
                setUsersValid(true);
                setUsersFormVisible(false);
              }}
            />
          )}
        </AppDialog>
      }
      className=' flex h-screen w-screen items-center justify-center 2xl:max-w-none'
    >
      <div className=' rounded-2xl bg-white p-6'>
        <div className='mb-5 w-full'>
          <p className=' font-Secondary text-3xl uppercase'>
            Premier lancement
          </p>
        </div>
        <ul className='flex min-w-[40vw] list-none flex-col items-stretch gap-y-5'>
          <li className=' flex  min-w-[40vw] flex-row items-center  gap-y-2 rounded-2xl border px-5  py-2'>
            <div className=' inline-flex flex-auto items-center gap-x-2'>
              <CheckCircleIcon
                className={` h-6 w-6  ${
                  isValid(0) ? ' text-sky-500 ' : ' text-gray-400'
                }`}
              />
              <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                cafétéria
              </p>
            </div>

            {!isValid(0) && (
              <div className='flex w-full flex-initial items-center justify-end'>
                <button
                  onClick={() => setShopFormVisible(true)}
                  className=' inline-flex gap-x-2 rounded-lg py-1 px-2 uppercase hover:bg-sky-500 hover:text-white'
                >
                  configurer
                  <ChevronRightIcon className={` h-6 w-6 `} />
                </button>
              </div>
            )}
          </li>

          <li className=' flex  min-w-[40vw] flex-row items-center  gap-y-2 rounded-2xl border px-5  py-2'>
            <div className=' inline-flex flex-auto items-center gap-x-2'>
              <CheckCircleIcon
                className={` h-6 w-6  ${
                  isValid(1) ? ' text-sky-500 ' : ' text-gray-400'
                }`}
              />
              <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                profil
              </p>
            </div>

            {!isValid(1) && (
              <div className='flex w-full flex-initial items-center justify-end'>
                <button
                  onClick={() => setProfileFormVisible(true)}
                  className=' inline-flex gap-x-2 rounded-lg py-1 px-2 uppercase hover:bg-sky-500 hover:text-white'
                >
                  configurer
                  <ChevronRightIcon className={` h-6 w-6 `} />
                </button>
              </div>
            )}
          </li>

          <li className=' flex  min-w-[40vw] flex-row items-center  gap-y-2 rounded-2xl border px-5  py-2'>
            <div className=' inline-flex flex-auto items-center gap-x-2'>
              <CheckCircleIcon
                className={` h-6 w-6  ${
                  isValid(2) ? ' text-sky-500 ' : ' text-gray-400'
                }`}
              />
              <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                utilisateurs
              </p>
            </div>

            {!isValid(2) && (
              <div className='flex w-full flex-initial items-center justify-end'>
                <button
                  onClick={() => setUsersFormVisible(true)}
                  className=' inline-flex gap-x-2 rounded-lg py-1 px-2 uppercase hover:bg-sky-500 hover:text-white'
                >
                  configurer
                  <ChevronRightIcon className={` h-6 w-6 `} />
                </button>
              </div>
            )}
          </li>

          <li className=' flex  flex-row items-center  gap-y-2 rounded-2xl border px-5  py-2'>
            <div className=' inline-flex flex-auto items-center gap-x-2'>
              <CheckCircleIcon
                className={` h-6 w-6  ${
                  isValid(3) ? ' text-sky-500 ' : ' text-gray-400'
                }`}
              />
              <p className=' whitespace-nowrap font-Primary text-xl font-thin uppercase'>
                inventaire
              </p>
            </div>

            {isValid(3) && (
              <div className='flex flex-initial items-center justify-end'>
                <Link
                  onClick={onClose}
                  to={'/management/products'}
                  className=' inline-flex gap-x-2 rounded-lg py-1 px-2 uppercase hover:bg-sky-500 hover:text-white'
                >
                  configurer
                  <ChevronRightIcon className={` h-6 w-6 `} />
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </Layout>
  );
}
