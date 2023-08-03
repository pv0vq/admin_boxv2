import axios from "axios";
import { error } from "console";
import React, { useEffect } from "react";
import { useState } from "react";
import fetcher from "../../../api/fetcher";
import API_COMMON from "../../../api/code/common/common";
import classNames from "classnames";

interface IProps {
  defaultValue?: string;
  setValue: (value: string) => void;
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
          const arrParam = param;
          arrParam.push(url.origin + url.pathname);
          setParam(arrParam);
          setValueHandler(arrParam);
        })
        .catch((error: any) => {
          console.log("error:", error);
        });
    };

    const deleteImageHandler = (src: string) => {
      if (!disable) {
        const arrParam = param.filter((val) => val !== src);
        setParam(arrParam);
        console.log(arrParam, "arrParam");
        setValueHandler(arrParam);
      }
    };

    const setValueHandler = (arr: string[]) => {
      if (arr.length === 1) {
        return setValue(arr[0]);
      } else if (arr.length > 1) {
        const stringArr = arr.join(",");
        return setValue(stringArr);
      } else {
        return setValue("");
      }
    };

    useEffect(() => {
      if (defaultValue) {
        setParam(defaultValue.split(","));
      }
    }, [defaultValue]);

    return (
      <div>
        <label className="relative inline-flex items-center cursor-pointer">
          <div
            className={classNames(
              !disable
                ? "mr-2 text-white bg-violet-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  cursor-pointer"
                : "mr-2 text-white bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            )}
          >
            파일첨부
          </div>
          <input
            // className={
            //   className === ""
            //     ? "text-sm block w-full h-7 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            //     : className
            // }
            className="sr-only"
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              changeParamHandler(event)
            }
            multiple={multiple}
            disabled={disable}
            ref={ref}
          />
        </label>
        <div>
          {param && param.length > 0 ? (
            param.map((src: string, index: number) => (
              <div
                className="bg-gray-400 flex justify-center relative mt-3 rounded-lg "
                key={index}
              >
                <img className="object-cover h-max" src={src} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute w-16 h-16 right-0 z-10"
                  onClick={() => deleteImageHandler(src)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
);
export default DefaultFile;
