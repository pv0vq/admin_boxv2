import React from "react";
import { useState } from "react";

interface IProps {
  defaultValue?: string;
  setValue: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
}

const DefaultTextarea = ({
  defaultValue = "",
  setValue,
  disable = false,
  className = "",
  placeholder = "",
  rows = 4,
}: IProps) => {
  const [param, setParam] = useState<string>(defaultValue);

  const changeParamHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setParam(event.target.value);
    setValue(event.target.value, event);
  };

  return (
    <textarea
      rows={rows}
      className={
        className === ""
          ? "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          : className
      }
      placeholder={placeholder}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
        changeParamHandler(event)
      }
      value={param}
      disabled={disable}
    ></textarea>
  );
};
export default DefaultTextarea;
