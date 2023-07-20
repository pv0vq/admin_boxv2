import React, { useEffect } from "react";
import { useState } from "react";

interface IProps {
  defaultValue?: boolean;
  setValue: (
    value: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  title?: string;
}

const DefaultSwich = ({
  defaultValue = false,
  setValue,
  disable = false,
  className = "",
  placeholder = "",
  title = "",
}: IProps) => {
  const [param, setParam] = useState<boolean>(defaultValue);

  const changeParamHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParam(event.target.checked);
    setValue(event.target.checked, event);
  };

  useEffect(() => {
    if (defaultValue) setParam(defaultValue);
  }, [defaultValue]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        placeholder={placeholder}
        checked={param}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          changeParamHandler(event)
        }
        disabled={disable}
      />
      <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
      <div
        className={
          param === true
            ? "absolute left-1 top-1 w-6 h-6 rounded-full transition translate-x-full bg-violet-400 "
            : "absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
        }
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </span>
    </label>
  );
};
export default DefaultSwich;
