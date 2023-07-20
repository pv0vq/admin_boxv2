import { useEffect, useState } from "react";
import { IOptions } from "../../../type/common";

interface IProps {
  defaultValue?: string[];
  setValue: (
    value: string[],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  options: IOptions[];
}

const DefaultCheckBox = ({
  defaultValue = [],
  setValue,
  disable = false,
  className = "",
  placeholder = "",
  options,
}: IProps) => {
  const [param, setParam] = useState<string[]>(defaultValue);

  const changeParamHandler = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let arr: string[] = param;
    console.log(arr);
    if (arr.includes(value)) {
      const filter: string[] = param.filter((val: string) => val !== value);
      setParam(filter);
      arr = filter;
    } else {
      setParam((prevParam) => [...prevParam, value]);
      arr.push(value);
    }

    setValue(arr, event);
  };

  useEffect(() => {
    if (defaultValue) setParam(defaultValue);
  }, [defaultValue]);

  if (options && options.length > 0) {
    return (
      <div className="flex flex-row w-full">
        {options.map((option: IOptions, index: number) => {
          return (
            <div className="p-0" key={index}>
              <label className="flex w-full cursor-pointer items-center px-3 py-2">
                <div className="mr-3">
                  <input
                    type="checkbox"
                    checked={param.includes(option.value)}
                    className={
                      className === ""
                        ? "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        : className
                    }
                    placeholder={placeholder}
                    disabled={disable}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      changeParamHandler(option.value, event);
                    }}
                  />
                </div>
                <div color="blue-gray" className="font-medium">
                  {option.label}
                </div>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
};

export default DefaultCheckBox;
