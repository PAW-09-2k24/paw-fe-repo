import { inputProps } from "@/types/types";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";

export const InputForm: React.FC<inputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-start text-sm text-netral-600 relative">
      <label htmlFor={id} className="text-start w-full ">
        {label}
      </label>
      <input
        type={type === 'password' ? showConfirmPassword ? 'text' : 'password' : type}
        name={id}
        id={id}
        placeholder={placeholder}
        className="w-full border-[1px] py-1 px-3 font-normal text-lg rounded-md border-gray-400 text-netral-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {type === 'password' ? showConfirmPassword ? (
        <IoEyeSharp
          className="absolute top-[28px] right-2 text-xl text-gray-400 cursor-pointer"
          onClick={() => setShowConfirmPassword(false)}
        />
      ) : (
        <BsEyeSlashFill
          className="absolute top-[28px] right-2 text-xl text-gray-400 cursor-pointer"
          onClick={() => setShowConfirmPassword(true)}
        />
      ) : null}
    </div>
  );
};
