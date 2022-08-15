import {Link} from 'react-router-dom';
import {buttonGenre} from './AppButton';

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
}

export default function AppLink({
  label,
  Icon,
  toPath,
  state,
  className,
  iconStyle,
  labelStyle,
  genre = 'primary',
  customColors,
}: Props) {
  const buttonColorsStyle = () => {
    switch (genre) {
      case 'primary':
        return ' bg-indigo-600 border-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-700 ';
      case 'secondary':
        return ' bg-gray-700 border-gray-600 hover:bg-gray-500 hover:shadow-gray-700 ';
      case 'outline':
        return ' bg-transparent border-gray-500 hover:bg-gray-900 hover:text-white hover:shadow-none hover:translate-y-1 py-1 text-inherit ';
      case 'info':
        return ' bg-green-700 border-green-500 hover:bg-green-500 hover:shadow-green-700 ';
      case 'warning':
        return ' bg-orange-700 border-orange-500 hover:bg-orange-500 hover:shadow-orange-700 ';
      case 'error':
        return ' bg-red-700 border-red-500 hover:bg-red-500 hover:shadow-red-700 ';
      case 'none':
        return customColors;
    }
  };

  const buttonStateStyle = ` ${buttonColorsStyle()} opacity-100 cursor-pointer hover:shadow-lg hover:-translate-y-1 `;
  return (
    <Link
      to={toPath}
      state={{ state }}
      className={` ${buttonStyle} ${buttonStateStyle} ${className} `}
    >
      {Icon && <Icon className={`h-5 w-5  ${iconStyle}`} />}
      {label && (
        <span className={` font-Secondary uppercase text-sm  ${labelStyle}`}>
          {label}
        </span>
      )}
    </Link>
  );
}
const buttonStyle =
  'inline-flex items-center border  justify-center gap-x-2 text-white py-2 rounded px-4 transition-all duration-300';
