interface Props extends React.HTMLProps<HTMLButtonElement> {
  label?: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
  iconStyle?: string;
  labelStyle?: string;
  type?: 'button' | 'submit' | 'reset';
  genre?: buttonGenre;
  customColors?: string;
  noHover?: boolean;
  rounded?: boolean;
}

export type buttonGenre =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'none';

export default function AppButton({
  label,
  Icon,
  genre = 'primary',
  className,
  iconStyle,
  labelStyle,
  customColors,
  noHover,
  rounded,
  ...props
}: Props) {
  const buttonColorsStyle = () => {
    switch (genre) {
      case 'primary':
        return ` hover:text-white border-indigo-500 border-2 text-indigo-600  hover:bg-indigo-500 hover:border-indigo-400 hover:shadow-indigo-700 ${
          !noHover && buttonHoverStyle
        } `;
      case 'secondary':
        return ` hover:text-white border-gray-400 border-2 text-gray-600 hover:bg-gray-400 hover:border-gray-400 hover:shadow-gray-700 ${
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

  const buttonStateStyle = props.disabled
    ? ' opacity-60 bg-gray-400 '
    : ` opacity-100 cursor-pointer  ${buttonColorsStyle()} `;
  return (
    <button
      title={label}
      {...props}
      className={` ${className} ${
        rounded && ' rounded-xl '
      }  ${buttonStyle} ${buttonStateStyle} `}
    >
      <div className='h-full'>
        {Icon && <Icon className={`h-6 w-6  ${iconStyle}`} />}
      </div>
      {label && (
        <span
          className={` font-Secondary text-sm font-medium uppercase  ${labelStyle}`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

const buttonStyle =
  ' inline-flex items-center border justify-center gap-x-2 text-white py-2  px-4 transition-all duration-300 ';

const buttonHoverStyle = ' hover:shadow-md hover:-translate-y-1  ';
