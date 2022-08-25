import { Link, useLocation } from 'react-router-dom';
import { buttonGenre } from './AppButton';

interface Props {
  label?: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  toPath: string;
  state?: any;
  className?: string;
  iconStyle?: string;
  iconRight?: boolean;
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
  genre,
  customColors,
  iconRight = false,
}: Props) {
  const { pathname } = useLocation();
  const buttonColorsStyle = () => {
    switch (genre) {
      case 'primary':
        return ` bg-stone-700 text-stone-200 border-stone-700 hover:bg-stone-500 hover:text-stone-200 focus-visible:ring-stone-500 `;
      case 'secondary':
        return ` bg-transparent border-stone-400 border hover:text-stone-200 hover:bg-stone-400 focus-visible:ring-stone-500 `;
      case 'outline':
        return ' hover:text-stone-100 bg-transparent border-stone-500 hover:bg-transparent';
      case 'info':
        return ` bg-yellow-500 text-yellow-50 hover:bg-yellow-400 hover:text-yellow-800 focus-visible:ring-yellow-500 `;
      case 'success':
        return ` bg-green-700 text-green-200 border-green-700 hover:bg-green-500 hover:text-green-200 focus-visible:ring-green-500 `;
      case 'warning':
        return ` bg-orange-500 text-orange-50 hover:bg-orange-400 hover:text-orange-800 focus-visible:ring-orange-500 `;
      case 'error':
        return `  bg-red-500 text-red-50 hover:bg-red-400 hover:text-red-800 focus-visible:ring-red-500`;
      case 'none':
        return customColors;
    }
  };

  const buttonStateStyle = ` cursor-pointer  ${buttonColorsStyle()} `;
  return (
    <Link
      to={toPath}
      state={state || { from: pathname }}
      className={` ${buttonStyle} ${
        iconRight ? ' flex-row-reverse' : 'flex-row'
      } ${buttonStateStyle} ${className}  `}
    >
      <div className='flex h-full items-center justify-center'>
        {Icon && <Icon className={`h-5 w-5  ${iconStyle}`} />}
      </div>
      {label && (
        <span
          className={` font-Primary text-lg font-thin uppercase  ${labelStyle}`}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
const buttonStyle =
  ' flex justify-center gap-x-2 items-center  border transition-all duration-300 px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ';
