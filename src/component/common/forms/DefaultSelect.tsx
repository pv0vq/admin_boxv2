import { useState } from "react";
import { IOptions } from "../../../type/common";

interface IProps {
  defaultValue?: string;
  setValue: (
    value: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  options: IOptions[];
}

const DefaultSelect = ({
  defaultValue = "",
  setValue,
  disable = false,
  className = "",
  placeholder = "",
  options,
}: IProps) => {
  const [param, setParam] = useState<string>(defaultValue);

  const changeParamHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParam(event.target.value);
    setValue(event.target.value, event);
  };

  return (
    <select
      className={
        className === ""
          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          : className
      }
      placeholder={placeholder}
      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
        changeParamHandler(event)
      }
      value={param}
      disabled={disable}
    >
      {options.map((option: IOptions, index: number) => {
        return (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default DefaultSelect;
