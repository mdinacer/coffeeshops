import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

export default function PrivateRoute({
  children,
  roles,
  owner,
}: {
  children: JSX.Element;
  roles?: string[];
  owner?: boolean;
}) {
  const { user } = useAppSelector((state) => state.account);
  const { isOwner } = useAppSelector((state) => state.shop);
  let location = useLocation();

  if (!user) {
    return <Navigate to='/account/login' state={{ from: location }} />;
  }

  const userHasRequiredRole =
    user && roles && roles?.some((role) => user.roles?.includes(role));

  if (roles && !userHasRequiredRole) {
    //console.log('You are not allowed to go there');
    return <Navigate to='/' />;
  }

  if (owner && !isOwner) {
    //console.log('You are not allowed to go there');
    return <Navigate to='/' />;
  }

  return children;
}
