interface Props extends React.HTMLProps<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
  loadingLabel?: string;
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
  loading,
  loadingLabel = 'En cours',
  Icon,
  genre = 'info',
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
        return ` bg-indigo-600 text-indigo-900 hover:text-indigo-700 hover:bg-indigo-200 focus-visible:ring-indigo-500 `;
      case 'secondary':
        return ` bg-gray-400 text-gray-100 hover:text-gray-600 hover:bg-gray-300 focus-visible:ring-gray-500} `;
      case 'outline':
        return ' hover:text-white bg-transparent border-gray-500 hover:bg-transparent';
      case 'info':
        return ` bg-sky-600 text-sky-100 hover:bg-sky-400 focus-visible:ring-blue-500 `;
      case 'success':
        return ` bg-green-800 text-green-100 hover:text-green-100 hover:bg-green-500 focus-visible:ring-green-500 `;
      case 'warning':
        return ` bg-orange-100 text-orange-900 hover:text-orange-700 hover:bg-orange-200 focus-visible:ring-orange-500 `;
      case 'error':
        return ` bg-red-100 text-red-900 hover:text-red-700 hover:bg-red-200 focus-visible:ring-red-500 `;
      case 'none':
        return customColors;
    }
  };

  const buttonStateStyle = props.disabled
    ? ' opacity-60 bg-gray-300 '
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
          className={` font-Secondary text-base font-medium uppercase  ${labelStyle}`}
        >
          {loading ? loadingLabel : label}
        </span>
      )}
    </button>
  );
}

const buttonStyle =
  ' inline-flex justify-center items-center gap-x-2 border border-transparent transition-all duration-300 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ';
