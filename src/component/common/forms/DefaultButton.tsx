import React, { useEffect } from "react";
import { useState } from "react";

interface IProps {
  buttonTitle: string;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  type: "submit" | "reset" | "button" | undefined;
  buttonState?: string;
  onClick?: (buttonState?: string) => void;
}

const DefaultButton = ({
  buttonTitle = "",
  disable = false,
  className = "",
  placeholder = "",
  type = "button",
  buttonState,
  onClick,
}: IProps) => {
  return (
    <button
      type={type}
      className={
        className === ""
          ? "mr-2 text-white bg-violet-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          : className
      }
      placeholder={placeholder}
      disabled={disable}
      onClick={() => {
        if (onClick) onClick(buttonState || "close");
      }}
    >
      {buttonTitle}
    </button>
  );
};
export default DefaultButton;
