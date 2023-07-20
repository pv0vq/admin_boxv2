import React, { useEffect } from "react";
import { useState } from "react";

interface IProps {
  defaultValue?: string;
  setValue?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
}

const DefaultInput = ({
  defaultValue = "",
  setValue,
  disable = false,
  className = "",
  placeholder = "",
}: IProps) => {
  const [param, setParam] = useState<string>("");

  const changeParamHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParam(event.target.value);
    if (setValue) setValue(event.target.value, event);
  };

  useEffect(() => {
    if (defaultValue) setParam(defaultValue);
  }, [defaultValue]);

  return (
    <input
      className={
        className === ""
          ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          : className
      }
      type="text"
      placeholder={placeholder}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        changeParamHandler(event)
      }
      value={param}
      disabled={disable}
    />
  );
};
export default DefaultInput;
