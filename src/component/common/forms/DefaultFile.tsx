import React, { useEffect } from "react";
import { useState } from "react";

interface IProps {
  defaultValue?: string;
  setValue: (value: File[], event: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  multiple?: boolean;
}

const DefaultFile = React.forwardRef(
  (
    {
      defaultValue = "",
      setValue,
      disable = false,
      className = "",
      placeholder = "",
      multiple = false,
    }: IProps,
    ref: any
  ) => {
    const [param, setParam] = useState<string>(defaultValue);

    const changeParamHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setParam(event.target.value);
      const files: File[] = [];
      if (event.target.files) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files.item(i);
          if (file instanceof File) {
            files.push(file);
          }
        }
      }
      setValue(files, event);
    };

    useEffect(() => {
      if (defaultValue) setParam(defaultValue);
    }, [defaultValue]);

    return (
      <input
        className={
          className === ""
            ? "text-sm block w-full h-7 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            : className
        }
        type="file"
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          changeParamHandler(event)
        }
        multiple={multiple}
        disabled={disable}
        ref={ref}
      />
    );
  }
);
export default DefaultFile;
