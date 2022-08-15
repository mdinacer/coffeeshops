import {
  AdjustmentsIcon,
  ArrowLeftIcon,
  CashIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import {Link, useLocation} from 'react-router-dom';
import {Shop} from '../../app/models/shop';
import {User} from '../../app/models/user';
import {signOut} from '../../app/slices/accountSlice';
import {useAppDispatch} from '../../app/store/configureStore';

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

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  function logOut() {
    dispatch(signOut());
  }
  return (
    <div className='  w-full h-full flex flex-col p-5'>
      <div className=' flex flex-row justify-between items-center flex-initial border-b border-b-gray-200 pb-5'>
        <Link
          to={'/'}
          className=' flex md:justify-center w-full items-center md:gap-x-5 gap-x-2'
        >
          <div className=' h-14 w-14 md:h-28 md:w-28 overflow-hidden '>
            <img
              src='/assets/logo.png'
              alt='Logo'
              className=' object-cover h-full w-full'
            />
          </div>
          <div className='w-'>
            <small className='uppercase font-Primary font-thin text-base'>
              Cafétéria
            </small>
            <p className=' font-Bebas text-3xl md:text-3xl lg:text-4xl font-  first-letter:text-red-500'>
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

      <div className='flex-auto flex flex-col  gap-y-4 mt-20 font-Secondary'>
        <div className='flex flex-col  gap-y-4'>
          {pages.map(({ title, path, Icon }, index) => (
            <Link
              onClick={onClose}
              key={index}
              to={path}
              state={{ from: pathname }}
              className={` ${linkStyle}  ${
                isActive(path)
                  ? 'opacity-100 font-semibold'
                  : 'opacity-60 font-normal'
              }`}
            >
              <Icon className='h-6 w-6 mr-5' />
              <span className=' font-Secondary'>{title}</span>
            </Link>
          ))}
        </div>

        {user && shop && (
          <div className='flex flex-col  gap-y-4'>
            {memberPages.map(({ title, path, Icon }, index) => (
              <Link
                onClick={onClose}
                key={index}
                to={path}
                state={{ from: pathname }}
                className={` ${linkStyle}  ${
                  isActive(path)
                    ? 'opacity-100 font-semibold'
                    : 'opacity-60 font-normal'
                }`}
              >
                <Icon className='h-6 w-6 mr-5' />
                <span className=' font-Secondary'>{title}</span>
              </Link>
            ))}
          </div>
        )}

        {isModerator() && (
          <div className='flex flex-col  gap-y-4 py-1 px-4'>
            {moderatorPages.map(({ title, Icon, items }, index) => (
              <div className='w-full' key={index}>
                <div className='inline-flex items-center w-full'>
                  <Icon className='h-6 w-6 mr-5' />
                  <span className=' font-Secondary'>{title}</span>
                </div>
                <div className='ml-6'>
                  {items.map(({ title, path }, index) => (
                    <Link
                      onClick={onClose}
                      state={{ from: pathname }}
                      key={index}
                      to={path}
                      className={` ${linkStyle}  ${
                        isActive(path)
                          ? 'opacity-100 font-semibold'
                          : 'opacity-60 font-normal'
                      }`}
                    >
                      <span className=' font-Secondary'>{title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin() && (
          <div className='flex flex-col  gap-y-4'>
            {adminPage.map(({ title, path, Icon }, index) => (
              <Link
                onClick={onClose}
                state={{ from: pathname }}
                key={index}
                to={path}
                className={` ${linkStyle}  ${
                  isActive(path)
                    ? 'opacity-100 font-semibold'
                    : 'opacity-60 font-normal'
                }`}
              >
                <Icon className='h-6 w-6 mr-5' />
                <span className=' font-Secondary'>{title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className='flex-initial flex items-center justify-center'>
        {user && (
          <button
            type='button'
            onClick={logOut}
            className=' inline-flex items-center'
          >
            <LogoutIcon className='h-6 w-6 mr-2 text-red-600' />
            <span className=' font-Secondary text-sm uppercase'>
              {LOGOUT_TEXT}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

const linkStyle =
  'inline-flex items-center w-full hover:bg-indigo-400 hover:opacity-100 hover:text-white py-1 px-4 rounded ';

const reportItems = [
  { title: 'Opérations', path: 'reports/operations' },
  { title: 'Inventaire', path: 'reports/inventory' },
];

const managementItems = [
  { title: 'Magasin', path: 'management/shop' },
  { title: 'Articles', path: 'management/products' },
  { title: 'Agents', path: 'management/agents' },
  { title: 'Transactions', path: 'management/transactions' },
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
