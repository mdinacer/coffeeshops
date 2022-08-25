interface Props {
  children: React.ReactNode;
  className?: string;
  dialogVisible?: boolean;
  dialogTitle?: string;
  dialogContent?: React.ReactNode;
  dialogOnClose?: () => void;
}

export default function Layout({ children, className }: Props) {
  return (
    <div
      className={` ${className} relative mx-auto h-full w-full select-none border bg-stone-200 md:p-6  2xl:container`}
    >
      {children}
    </div>
  );
}
