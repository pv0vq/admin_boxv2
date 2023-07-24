import { ReactNode, useEffect, useState } from "react";

interface IProps {
  state?: string;
  setButtonClick: (type: "add" | "detail" | "edit" | "close") => void;
  children: ReactNode;
}

const DefaultModal = ({ setButtonClick, children, state = "add" }: IProps) => {
  const [modalState] = useState<string>(state || "add" || "detail" || "edit");

  const [modalTitle, setModalTitle] = useState<string>("저장하기");

  useEffect(() => {
    if (modalState === "detail") {
      setModalTitle("상세");
    } else if (modalState === "edit") {
      setModalTitle("수정하기");
    }
  }, [modalState]);

  return (
    <>
      <div
        className="fixed left-0 right-0 z-40 top-0 bottom-0 bg-black bg-opacity-50"
        onClick={() => setButtonClick("close")}
      ></div>
      <div
        id="defaultModal"
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-50 w-full p-4 overflow-x-hidden overflow-y-auto max-h-full -translate-x-1/2 -translate-y-1/2 "
      >
        <div className="relative w-11/12 max-w-full max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {modalTitle}
              </h3>
              <button
                onClick={() => setButtonClick("close")}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6">{children}</div>
            {/* Modal footer */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultModal;
