interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: any;
}

export default function BasicButton ({
  type = 'button',
  onClick = () => {},
  children
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
      rounded-sm
        py-1 px-2
        hover:bg-gray-3
      "
    >
      {children}
    </button>
  )
}
