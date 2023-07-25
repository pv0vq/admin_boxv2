import axios from "axios";
import { error } from "console";
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
        console.log(event.target.files[0], "event.target.files");
        putPreSignUrlHandler(event.target.files[0]);
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files.item(i);
          if (file instanceof File) {
            files.push(file);
          }
        }
      }
      setValue(files, event);
    };

    const putPreSignUrlHandler = async (file: any) => {
      console.log("file:", file);
      // await fetch(
      //   new Request(
      //     "https://bittebucket.s3.ap-northeast-2.amazonaws.com/notice/a7876c8d-1dd6-4ce3-8959-c91b5a07c4fdtest?x-amz-acl=public-read&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230725T075256Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1199&X-Amz-Credential=AKIA3ZP4CLRE5MZ73PFF%2F20230725%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=5ad2feaac5176eb055d6bd311a3a0e455f521032828a8eeb6486ac5e4d660c18",
      //     {
      //       method: "POST",
      //       body: file,
      //       headers: new Headers({
      //         "Content-Type": "image/*",
      //       }),
      //     }
      //   )
      // )
      // await axios
      //   .put(
      //     "https://bittebucket.s3.ap-northeast-2.amazonaws.com/notice/a7876c8d-1dd6-4ce3-8959-c91b5a07c4fdtest?x-amz-acl=public-read&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230725T075256Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1199&X-Amz-Credential=AKIA3ZP4CLRE5MZ73PFF%2F20230725%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=5ad2feaac5176eb055d6bd311a3a0e455f521032828a8eeb6486ac5e4d660c18",
      //     file,
      //     {
      //       headers: {
      //         "Content-Type": "image/*",
      //       },
      //     }
      //   )
      await fetch(
        "https://bittebucket.s3.ap-northeast-2.amazonaws.com/notice/0d0db01e-c5f7-4b55-a78f-d78d47ea164btest?x-amz-acl=public-read&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230725T080400Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Credential=AKIA3ZP4CLRE5MZ73PFF%2F20230725%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=c163a3d329f19261f0dfec695928c14e659901751894bb3411ecee1cdce4c2c5",
        {
          method: "POST",
          body: file,
        }
      )
        .then((res: any) => {
          console.log("res:", res);
        })
        .catch((error: any) => {
          console.log("error:", error);
        });
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
