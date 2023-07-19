import React from "react";
import { useState } from "react";

interface IProps {
  defaultValue?: number;
  setValue: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
}

const DefaultRange = ({
  defaultValue = 50,
  setValue,
  disable = false,
  className = "",
  placeholder = "",
}: IProps) => {
  const [param, setParam] = useState<number>(defaultValue);

  const changeParamHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParam(event.target.value);
    setValue(event.target.value, event);
  };

  return (
    <input
      className={
        className === ""
          ? "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          : className
      }
      type="range"
      placeholder={placeholder}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        changeParamHandler(event)
      }
      value={param}
      disabled={disable}
    />
  );
};
export default DefaultRange;
