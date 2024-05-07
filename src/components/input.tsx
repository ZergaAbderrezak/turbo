export const Input = ({
  value,
  onChange,
  type,
  id,
  name,
  placeholder,
  className,
}: {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  className?: string;
}) => {
  return (
    <div className={`${className ? className : ""}`}>
      <label
        className="mb-2 block text-sm font-bold text-gray-700"
        htmlFor={id}
      >
        {name}
      </label>
      <input
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id={id}
        type={type}
        placeholder={placeholder}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
