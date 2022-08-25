import { ArrowLeftIcon, LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import {
  BellIcon,
  MenuAlt1Icon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../../app/models/user';
import { signOut } from '../../app/slices/accountSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import AppButton from '../common/AppButton';
import AppLink from '../common/AppLink';

interface Props {
  onMenuButtonClick: (value: boolean) => void;
  user: User | null;
  className?: string;
  sidebarExpanded?: boolean;
}
export default function AppPageHeader({
  user,
  className,
  sidebarExpanded = false,
  onMenuButtonClick,
}: Props) {
  const dispatch = useAppDispatch();
  const { state }: any | null = useLocation();
  const from = state?.from || null;

  return (
    <>
      <div
        className={`flex w-full flex-row  items-center justify-between border-b border-b-stone-400 bg-stone-700 text-stone-300 md:py-0 md:pl-5 ${className}`}
      >
        <div className='relative z-10 inline-flex items-center gap-x-5'>
          {!sidebarExpanded && (
            <button
              type='button'
              className='p-2'
              onClick={() => onMenuButtonClick(true)}
            >
              <MenuAlt1Icon className={` h-6 w-6 `} />
            </button>
          )}
          {from && (
            <Link
              to={from}
              className='inline-flex items-center gap-x-2 rounded-full border border-stone-800 bg-stone-400 py-1 px-5  hover:bg-yellow-500 hover:text-stone-100'
            >
              <ArrowLeftIcon className={` h-5 w-5 `} />
              <span className='hidden font-Primary font-thin uppercase md:block'>
                Retour
              </span>
            </Link>
          )}
        </div>

        <div className=' flex flex-row gap-x-5'>
          <div className='grid grid-cols-2'>
            <button type='button' className='p-2'>
              <SearchIcon className='h-6 w-6' />
            </button>
            <button type='button' className='p-2'>
              <BellIcon className='h-6 w-6' />
            </button>
          </div>

          {user ? (
            <div className='flex flex-row items-center '>
              <AppLink
                toPath='/account/profile'
                labelStyle=' capitalize hidden md:block'
                Icon={UserCircleIcon}
                iconStyle={'h-8 w-8'}
                label={user.displayName || user.username}
                className=' items-center  gap-x-2 border-none hover:text-inherit hover:underline hover:underline-offset-2 '
              />
              <AppButton
                Icon={LogoutIcon}
                label='sortir'
                labelStyle=' hidden md:block'
                genre='none'
                onClick={() => dispatch(signOut())}
                className=' rounded-none border-red-600 bg-red-600 text-stone-100  hover:bg-red-700'
              />
            </div>
          ) : (
            <div>
              <AppLink
                toPath='/account/login'
                Icon={LoginIcon}
                className={
                  ' underline  hover:text-inherit hover:underline-offset-1 '
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
