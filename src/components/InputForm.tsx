import { inputProps } from "@/types/types";

export const InputForm: React.FC<inputProps> = ({id, label, type, placeholder}) => {
  return (
    <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600">
      <label htmlFor={id} className="text-start w-full ">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400"
      />
    </div>
  );
};
