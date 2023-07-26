import axios from "axios";
import { error } from "console";
import React, { useEffect } from "react";
import { useState } from "react";
import fetcher from "../../../api/fetcher";
import API_COMMON from "../../../api/code/common";

interface IProps {
  defaultValue?: string;
  setValue: (value: string[]) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  multiple?: boolean;
  type: string;
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
      type = "",
    }: IProps,
    ref: any
  ) => {
    const [param, setParam] = useState<string[]>([]);
    const changeParamHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        for (let i = 0; i < event.target.files.length; i++) {
          putPreSignUrlHandler(event.target.files[i]);
        }
      }
    };

    /**
     * PreSignUrl get 와 put 요청
     *
     * @param file
     */
    const putPreSignUrlHandler = async (file: File) => {
      const params = {
        type: type, // 테이블 명
        fileName: file.name,
      };

      // 서버에 PreSignUrl 발급요청
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

    /**
     * S3에 put 요청 (S3이미지 저장)
     *
     * @param url
     * @param file
     */
    const putAwsImageHandler = async (url: string, file: File) => {
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: new Headers({
          "Content-Type": "image/*",
        }),
      })
        .then((res: any) => {
          console.log("res:", res);
          // url 파싱
          const url = new URL(res.url);
          setParam((prevParam) => [...prevParam, url.origin + url.pathname]);
        })
        .catch((error: any) => {
          console.log("error:", error);
        });
    };

    useEffect(() => {
      if (defaultValue) {
        setParam(defaultValue.split(","));
      }
    }, [defaultValue]);

    useEffect(() => {
      setValue(param);
    }, [param, setValue]);

    return (
      <>
        <input
          className={
            className === ""
              ? "text-sm block w-full h-7 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              : className
          }
          type="file"
          accept="image/*"
          placeholder={placeholder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeParamHandler(event)
          }
          multiple={multiple}
          disabled={disable}
          ref={ref}
        />
        <div>
          {param && param.length > 0 ? (
            param.map((src: string, index: number) => (
              <img key={index} src={src} />
            ))
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
);
export default DefaultFile;
