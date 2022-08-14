import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import {
  MenuAlt1Icon,
  SearchIcon,
  BellIcon,
  UserIcon,
} from '@heroicons/react/solid';
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

  return (
    <div
      className={`flex flex-row justify-between  items-center w-full pl-5 py-2 md:py-0 border-b bg-gray-900 text-white drop-shadow-md border-b-gray-300 ${className}`}
    >
      <div className='relative z-10'>
        {!sidebarExpanded && (
          <button
            type='button'
            className='p-2'
            onClick={() => onMenuButtonClick(true)}
          >
            <MenuAlt1Icon
              className={` h-6 w-6 ${
                sidebarExpanded ? 'text-white' : ' text-inherit'
              }`}
            />
          </button>
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
              Icon={UserIcon}
              label={user.profile.fullName || user.username}
              genre={'none'}
              className='text-inherit hover:translate-y-0 hover:shadow-none rounded-none h-full hover:border-none border-none'
            />
            <AppButton
              label='Sortir'
              Icon={LogoutIcon}
              genre='error'
              onClick={() => dispatch(signOut())}
              className=' hover:translate-y-0 hover:shadow-none rounded-none h-full hover:border-none border-none'
            />
          </div>
        ) : (
          <div>
            <AppLink
              toPath='/account/login'
              Icon={LoginIcon}
              genre={'primary'}
              className=' hover:translate-y-0 hover:shadow-none rounded-none h-full hover:border-none border-none'
            />
          </div>
        )}
      </div>
    </div>
  );
}
