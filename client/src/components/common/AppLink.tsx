import { Link, useLocation } from 'react-router-dom';
import { buttonGenre } from './AppButton';

interface Props {
  label?: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  toPath: string;
  state?: any;
  className?: string;
  iconStyle?: string;
  labelStyle?: string;
  genre?: buttonGenre;
  customColors?: string;
  noHover?: boolean;
  rounded?: boolean;
}

export default function AppLink({
  label,
  Icon,
  toPath,
  state,
  className,
  iconStyle,
  labelStyle,
  genre,
  customColors,
  noHover,
  rounded,
}: Props) {
  const { pathname } = useLocation();
  const buttonColorsStyle = () => {
    switch (genre) {
      case 'primary':
        return ` bg-indigo-100 text-indigo-900 hover:bg-indigo-200 focus-visible:ring-indigo-500 `;
      case 'secondary':
        return ` bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500} `;
      case 'outline':
        return ' hover:text-white bg-transparent border-gray-500 hover:bg-transparent';

      case 'info':
        return ` bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500 `;
      case 'success':
        return ` bg-green-100 text-green-900 hover:bg-green-200 focus-visible:ring-green-500 `;
      case 'warning':
        return ` bg-orange-100 text-orange-900 hover:bg-orange-200 focus-visible:ring-orange-500 `;
      case 'error':
        return ` bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500 `;
      case 'none':
        return customColors;
    }
  };

  const buttonStateStyle = ` cursor-pointer ${buttonColorsStyle()} `;
  return (
    <Link
      to={toPath}
      state={state || { from: pathname }}
      className={`   ${
        rounded && ' rounded-xl '
      }  ${buttonStyle} ${buttonStateStyle} ${className}  `}
    >
      <div className='h-full'>
        {Icon && <Icon className={`h-6 w-6  ${iconStyle}`} />}
      </div>
      {label && (
        <span
          className={` ${labelStyle} font-Secondary text-sm font-normal uppercase  `}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
const buttonStyle =
  ' inline-flex justify-center rounded-md border border-transparent transition-all duration-300 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ';
