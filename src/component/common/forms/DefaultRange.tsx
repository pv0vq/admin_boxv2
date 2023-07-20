import React, { useEffect } from "react";
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
    setParam(Number(event.target.value));
    setValue(Number(event.target.value), event);
  };

  useEffect(() => {
    if (defaultValue) setParam(defaultValue);
  }, [defaultValue]);

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
