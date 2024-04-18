interface IProps {
  placeholder: string;
  type?: string;
  id?: string;
  style?: string;
  value: string;
  setValue: (value: string) => void
}

function Input({ placeholder, type = "text", id, style, value, setValue }: IProps) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 p-2 ${style}`}
      id={id}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}

export default Input;
