import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DefaultInput from "../../common/forms/DefaultInput";
import DefaultSwich from "../../common/forms/DefaultSwich";
import DefaultDatePicker from "../../common/forms/DefaultDatePicker";
import { useEffect, useState } from "react";
import utillFormat from "../../../utill/utillFormat";
import DefaultButton from "../../common/forms/DefaultButton";
import { useVendorDetailInfo } from "../../../hooks/api/code/vendor/useVendorDetailInfo";
import useVendorAdd from "../../../hooks/api/code/vendor/useVendorAdd";
import useVendorEdit from "../../../hooks/api/code/vendor/useVendorEdit";
import React from "react";

interface IVendorDetailInfo {
  id: number;
  vendorName: string;
  useYn: string;
  createDate?: Date;
  modifiedDate?: Date;
}

interface IProps {
  modalState: "add" | "detail" | "edit" | "close";
  columId: number;
  setButtonClick: (type: "add" | "detail" | "edit" | "close") => void;
}

// yub 유효성 검증
const schema = yup.object({
  id: yup.number(),
  vendorName: yup.string().required("제조사 을 확인해주세요. "),
  useYn: yup.string().required("사용여부를 확인해주세요. "),
  createDate: yup.string(),
  modifiedDate: yup.string(),
});

const VendorModalComp = ({ columId, setButtonClick, modalState }: IProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const title = "제조사 상세";

  const { data: detail, isLoading } = useVendorDetailInfo(columId || 0);
  const { localDateFormatDateToYYYYMMDD } = utillFormat();
  const [state, setState] = useState<"add" | "edit" | "detail" | "close">(
    modalState
  );
  const [disableState, setDisableState] = useState<boolean>(false);
  const { mutate: edit } = useVendorEdit();
  const { mutate: add } = useVendorAdd();

  const onSubmit = (data: any) => {
    // 수정
    if (state === "edit") {
      return edit(data);
    } else {
      // 추가
      return add(data);
    }
  };

  // 디폴트 설정 및 데이터 폼에 set
  useEffect(() => {
    if (detail) {
      const { id, vendorName, useYn } = detail;
      reset({
        id,
        vendorName,
        useYn,
      });
    }
  }, [detail]);

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  useEffect(() => {
    if (state === "detail") setDisableState(true);
    else setDisableState(false);
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg shadow-lg w-full h-full">
        <div className="bg-violet-500 text-white py-2 rounded-t-lg opacity-80">
          <div className="grid grid-cols-5 items-center text-blue-gray-900 py-2 p-4 ">
            {title}
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
          {detail && detail.id ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                제조사 번호
              </label>
              <Controller
                name="id" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DefaultInput defaultValue={String(value)} disable={true} />
                )}
              />
              <span>{errors.id && errors.id.message}</span>
            </div>
          ) : (
            <></>
          )}
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              제조사 이름
            </label>
            <Controller
              name="vendorName" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultInput
                  defaultValue={value}
                  setValue={onChange}
                  disable={disableState}
                />
              )}
            />
            <span>{errors.vendorName && errors.vendorName.message}</span>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              사용여부
            </label>
            <Controller
              name="useYn" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultSwich
                  setValue={(value: boolean) => {
                    onChange(value ? "Y" : "N");
                  }}
                  disable={disableState}
                />
              )}
            />
            <span>{errors.useYn && errors.useYn.message}</span>
          </div>
          {detail && detail.createDate ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                생성일
              </label>
              <Controller
                name="createDate" // yup 걸린 데이터명
                control={control}
                defaultValue={
                  detail
                    ? detail?.createDate
                      ? localDateFormatDateToYYYYMMDD(
                          String(detail?.createDate)
                        )
                      : undefined
                    : undefined
                }
                render={({ field: { value, onChange } }) => (
                  <DefaultDatePicker
                    defaultValue={value}
                    setValue={onChange}
                    disable={true}
                  />
                )}
              />
              <span>{errors.useYn && errors.useYn.message}</span>
            </div>
          ) : (
            <div></div>
          )}
          {detail && detail.modifiedDate ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                수정일
              </label>
              <Controller
                name="modifiedDate" // yup 걸린 데이터명
                control={control}
                defaultValue={
                  detail
                    ? detail?.modifiedDate
                      ? localDateFormatDateToYYYYMMDD(
                          String(detail?.modifiedDate)
                        )
                      : undefined
                    : undefined
                }
                render={({ field: { value, onChange } }) => (
                  <DefaultDatePicker
                    defaultValue={value}
                    setValue={onChange}
                    disable={true}
                  />
                )}
              />
              <span>{errors.useYn && errors.useYn.message}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex items-center  space-x-2 rounded-b dark:border-gray-600">
        {state === "add" || state === "edit" ? (
          <DefaultButton buttonTitle="저장" type="submit" />
        ) : (
          <></>
        )}
        {state === "detail" ? (
          <DefaultButton
            buttonTitle="수정"
            type="button"
            onClick={() => setState("edit")}
          />
        ) : (
          <></>
        )}
        <DefaultButton
          buttonTitle="닫기"
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={() => setButtonClick("close")}
        />
      </div>
    </form>
  );
};
export default VendorModalComp;
