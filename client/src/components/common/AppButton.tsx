interface Props extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
  iconStyle?: string;
  labelStyle?: string;
  type?: 'button' | 'submit' | 'reset';
  genre?: buttonGenre;
  customColors?: string;
}

export type buttonGenre =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'info'
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
  ...props
}: Props) {
  const buttonColorsStyle = () => {
    switch (genre) {
      case 'primary':
        return ' hover:shadow-lg hover:-translate-y-1 bg-indigo-600 border-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-700 ';
      case 'secondary':
        return ' hover:shadow-lg hover:-translate-y-1 bg-gray-700 border-gray-600 hover:bg-gray-500 hover:shadow-gray-700 ';
      case 'outline':
        return ' bg-transparent border-gray-500 hover:bg-gray-900 hover:text-white hover:shadow-none hover:translate-y-0 py-1 text-inherit ';
      case 'info':
        return ' hover:shadow-lg hover:-translate-y-1 bg-green-700 border-green-500 hover:bg-green-500 hover:shadow-green-700 ';
      case 'warning':
        return ' hover:shadow-lg hover:-translate-y-1 bg-orange-700 border-orange-500 hover:bg-orange-500 hover:shadow-orange-700 ';
      case 'error':
        return ' hover:shadow-lg hover:-translate-y-1 bg-red-700 border-red-500 hover:bg-red-500 hover:shadow-red-700 ';
      case 'none':
        return customColors;
    }
  };

  const buttonStateStyle = props.disabled
    ? ' opacity-60 bg-gray-400 '
    : ` opacity-100 cursor-pointer  ${buttonColorsStyle()} `;
  return (
    <button
      {...props}
      className={` ${className} ${buttonStyle} ${buttonStateStyle}  `}
    >
      {Icon && <Icon className={`h-5 w-5  ${iconStyle}`} />}
      {label && (
        <span className={`font-Secondary uppercase text-sm  ${labelStyle}`}>
          {label}
        </span>
      )}
    </button>
  );
}

const buttonStyle =
  'inline-flex items-center border  justify-center gap-x-2 text-white py-2 rounded px-4 transition-all duration-300';
