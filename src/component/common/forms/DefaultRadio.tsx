import { useState } from "react";
import { IOptions } from "../../../type/common";

interface IProps {
  defaultValue: string;
  setValue: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  options: IOptions[];
}

const DefaultRadio = ({
  defaultValue = "",
  setValue,
  disable = false,
  className = "",
  placeholder = "",
  options,
}: IProps) => {
  const [param, setParam] = useState<string>(defaultValue);

  const changeParamHandler = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParam(value);
    setValue(value, event);
  };
  if (options && options.length > 0) {
    return (
      <div className="flex flex-row w-full">
        {options.map((option: IOptions, index: number) => {
          return (
            <div className="mr-3" key={index}>
              <label className="flex flex-row w-full">
                <div className="mr-3">
                  <input
                    className={
                      className === ""
                        ? "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        : className
                    }
                    type="radio"
                    placeholder={placeholder}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      changeParamHandler(option.value, event)
                    }
                    checked={param === option.value}
                    disabled={disable}
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

export default DefaultRadio;
