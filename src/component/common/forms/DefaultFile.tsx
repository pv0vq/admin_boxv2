import axios from "axios";
import { error } from "console";
import React, { useEffect } from "react";
import { useState } from "react";
import fetcher from "../../../api/fetcher";
import API_COMMON from "../../../api/code/common";

interface IProps {
  defaultValue?: string[];
  setValue: (value: File[], event: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  multiple?: boolean;
  type: string;
}

const DefaultFile = React.forwardRef(
  (
    {
      defaultValue = [],
      setValue,
      disable = false,
      className = "",
      placeholder = "",
      multiple = false,
      type = "",
    }: IProps,
    ref: any
  ) => {
    const [param, setParam] = useState<Array<string>>(defaultValue);

    const changeParamHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files: File[] = [];
      if (event.target.files) {
        for (let i = 0; i < event.target.files.length; i++) {
          putPreSignUrlHandler(event.target.files[i]);
          const file = event.target.files.item(i);
          if (file instanceof File) {
            files.push(file);
          }
        }
      }
      setValue(files, event);
    };

    const putPreSignUrlHandler = async (file: File) => {
      const params = {
        type: type,
        fileName: file.name,
      };
      await fetcher({
        api: API_COMMON.GET_PRE_SIGNED_URL,
        options: params,
      })
        .then(({ data }) => {
          putAwsImageHandler(data, file);
        })
        .catch((error: any) => {
          console.log("error:", error);
        });
    };

    const putAwsImageHandler = async (url: string, file: File) => {
      const formData = new FormData();
      formData.append("Content-Type", file.type);
      formData.append(file.name, file);
      await fetch(url, {
        method: "PUT",
        body: formData,
      })
        .then((res: any) => {
          console.log("res:", res);
          setParam((prevParam) => [...prevParam, res.url + "/" + file.name]);
        })
        .catch((error: any) => {
          console.log("error:", error);
        });
    };

    useEffect(() => {
      console.log("param:", param);
    }, [param]);

    return (
      <>
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
        {param.length > 0 ? (
          param.map((src: string, index: number) => (
            <img key={index} src={src} />
          ))
        ) : (
          <></>
        )}
      </>
    );
  }
);
export default DefaultFile;
