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
        return ` hover:text-white border-indigo-500 border-2 text-indigo-600  hover:bg-indigo-500 hover:border-indigo-400 hover:shadow-indigo-700 ${
          !noHover && buttonHoverStyle
        } `;
      case 'secondary':
        return ` hover:text-white border-gray-500 border-2 text-gray-600  hover:bg-gray-500 hover:border-gray-400 hover:shadow-gray-700 ${
          !noHover && buttonHoverStyle
        } `;
      case 'outline':
        return ' hover:text-white bg-transparent border-gray-500 hover:bg-transparent';

      case 'info':
        return ` hover:text-white border-sky-500 border-2 text-sky-600  hover:bg-sky-500 hover:border-sky-400 hover:shadow-sky-700 ${
          !noHover && buttonHoverStyle
        } `;
      case 'success':
        return ` hover:text-white border-green-500 border-2 text-green-600  hover:bg-green-500 hover:border-green-400 hover:shadow-green-700 ${
          !noHover && buttonHoverStyle
        } `;
      case 'warning':
        return ` hover:text-white border-orange-500 border-2 text-orange-600  hover:bg-orange-500 hover:border-orange-400 hover:shadow-orange-700 ${
          !noHover && buttonHoverStyle
        } `;
      case 'error':
        return ` hover:text-white border-red-500 border-2 text-red-600  hover:bg-red-500 hover:border-red-400 hover:shadow-red-700 ${
          !noHover && buttonHoverStyle
        } `;
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
  ' inline-flex items-center border  justify-center gap-x-2 md:py-2  px-4 transition-all duration-300 ';

const buttonHoverStyle = ' hover:shadow-md hover:-translate-y-1 text-white ';
