import {
  AdjustmentsIcon,
  ArrowLeftIcon,
  CashIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Shop } from '../../app/models/shop';
import { User } from '../../app/models/user';
import { signOut } from '../../app/slices/accountSlice';
import { useAppDispatch } from '../../app/store/configureStore';

interface Props {
  user: User | null;
  shop: Shop | null;
  roles: Array<String>;
  onClose: () => void;
}

const ADMIN_ROLE = 'Admin';
const MODERATOR_ROLE = 'Moderator';
const LOGOUT_TEXT = 'se déconnecter';

export default function AppPageSidebar({ user, roles, shop, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const isAdmin = () => {
    return roles.includes(ADMIN_ROLE);
  };

  const isModerator = () => {
    return roles.some((role) => role === ADMIN_ROLE || role === MODERATOR_ROLE);
  };

  const linkStyle = (isActive: boolean) => {
    return `inline-flex items-center w-full hover:bg-sky-400 hover:opacity-100 hover:text-white py-1 px-4 rounded ${
      isActive ? 'font-semibold opacity-100' : 'font-normal opacity-60'
    }`;
  };

  function logOut() {
    dispatch(signOut());
  }
  return (
    <div className='  flex h-full w-full flex-col p-5'>
      <div className=' flex flex-initial flex-row items-center justify-between border-b border-b-gray-200 pb-5'>
        <Link
          to={'/'}
          className=' flex w-full items-center gap-x-2 md:justify-center md:gap-x-5'
        >
          <div className=' h-14 w-14 overflow-hidden md:h-28 md:w-28 '>
            <img
              src='/assets/logo.png'
              alt='Logo'
              className=' h-full w-full object-cover'
            />
          </div>
          <div className='w-'>
            <small className='font-Primary text-base font-thin uppercase'>
              Cafétéria
            </small>
            <p className=' font-Bebas font- text-3xl first-letter:text-red-500 md:text-3xl  lg:text-4xl'>
              {shop ? shop.name : 'CoffeeShops'}
            </p>
          </div>
        </Link>

        <div className='block md:hidden'>
          <button type='button' className='p-2' onClick={onClose}>
            <ArrowLeftIcon className='h-6 w-6' />
          </button>
        </div>
      </div>

      <div className='mt-20 flex flex-auto  flex-col gap-y-4 font-Secondary'>
        <div className='flex flex-col  gap-y-4'>
          {pages.map(({ title, path, Icon }, index) => (
            <NavLink
              onClick={onClose}
              key={index}
              to={path}
              state={{ from: pathname }}
              className={({ isActive }) => linkStyle(isActive)}
            >
              <Icon className='mr-5 h-6 w-6' />
              <span className=' font-Secondary'>{title}</span>
            </NavLink>
          ))}
        </div>

        {user && shop && (
          <div className='flex flex-col  gap-y-4'>
            {memberPages.map(({ title, path, Icon }, index) => (
              <NavLink
                onClick={onClose}
                key={index}
                to={path}
                state={{ from: pathname }}
                className={({ isActive }) => linkStyle(isActive)}
              >
                <Icon className='mr-5 h-6 w-6' />
                <span className=' font-Secondary'>{title}</span>
              </NavLink>
            ))}
          </div>
        )}

        {isModerator() && (
          <div className='flex flex-col  gap-y-4 py-1 px-4'>
            {moderatorPages.map(({ title, Icon, items }, index) => (
              <div className='w-full' key={index}>
                <div className='inline-flex w-full items-center'>
                  <Icon className='mr-5 h-6 w-6' />
                  <span className=' font-Secondary'>{title}</span>
                </div>
                <div className='ml-6'>
                  {items.map(({ title, path }, index) => (
                    <NavLink
                      onClick={onClose}
                      state={{ from: pathname }}
                      key={index}
                      to={path}
                      className={({ isActive }) => linkStyle(isActive)}
                    >
                      <span className=' font-Secondary'>{title}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin() && (
          <div className='flex flex-col  gap-y-4'>
            {adminPage.map(({ title, path, Icon }, index) => (
              <NavLink
                onClick={onClose}
                state={{ from: pathname }}
                key={index}
                to={path}
                className={({ isActive }) => linkStyle(isActive)}
              >
                <Icon className='mr-5 h-6 w-6' />
                <span className=' font-Secondary'>{title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-initial items-center justify-center'>
        {user && (
          <button
            type='button'
            onClick={logOut}
            className=' inline-flex items-center'
          >
            <LogoutIcon className='mr-2 h-6 w-6 text-red-600' />
            <span className=' font-Secondary text-sm uppercase'>
              {LOGOUT_TEXT}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

const reportItems = [
  { title: 'Opérations', path: 'reports/operations' },
  { title: 'Inventaire', path: 'reports/inventory' },
];

const managementItems = [
  { title: 'Magasin', path: 'management/shop' },
  { title: 'Articles', path: 'management/products' },
  { title: 'Agents', path: 'management/agents' },
  { title: 'Transactions', path: 'management/transactions' },
  { title: 'Historique', path: 'management/history' },
];

const pages = [{ title: 'Accueil', path: '/', Icon: HomeIcon }];

const memberPages = [{ title: 'Caisse', path: '/order', Icon: CashIcon }];

const moderatorPages = [
  {
    title: 'Rapports',
    path: '',
    Icon: ViewListIcon,
    items: reportItems,
  },
  {
    title: 'Gestion',
    path: '',
    Icon: CogIcon,
    items: managementItems,
  },
];

const adminPage = [
  { title: 'Paramétrage', path: '/settings', Icon: AdjustmentsIcon },
];
