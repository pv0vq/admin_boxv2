import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DefaultInput from "../../common/forms/DefaultInput";
import DefaultSwich from "../../common/forms/DefaultSwich";
import DefaultDatePicker from "../../common/forms/DefaultDatePicker";
import { useEffect, useState } from "react";
import utillFormat from "../../../utill/utillFormat";
import DefaultButton from "../../common/forms/DefaultButton";
import useVendorAdd from "../../../hooks/api/vendor/useVendorAdd";
import useVendorEdit from "../../../hooks/api/vendor/useVendorEdit";
import { useInspectionDetailInfo } from "../../../hooks/api/inspection/useInspectionDetailInfo";
import useInspectionAdd from "../../../hooks/api/inspection/useInspectionAdd";
import { useVendorList } from "../../../hooks/api/vendor/useVendorList";
import { IIdOptions, IOptions } from "../../../type/common";
import DefaultSelect from "../../common/forms/DefaultSelect";
import DefaultTextarea from "../../common/forms/DefaultTextarea";
import DefaultFile from "../../common/forms/DefaultFile";
import axios from "axios";

interface IProps {
  modalState: "add" | "detail" | "edit" | "close";
  columId: number;
  setButtonClick: (type: "add" | "detail" | "edit" | "close") => void;
}

// yub 유효성 검증
const schema = yup.object({
  id: yup.number(),
  code: yup.string().required("코드를 확인해주세요."),
  checkAction: yup.string().required("점검 사항을 확인해주세요."),
  useYn: yup.string().required("사용여부를 확인해주세요."),
  vendorId: yup.number().required("제조사를 확인해주세요."),
  createDate: yup.string(),
  modifiedDate: yup.string(),
  creatorName: yup.string(),
  creatorEmail: yup.string(),
  imagePath: yup.string(),
});

const InspectionModalComp = ({
  columId,
  setButtonClick,
  modalState,
}: IProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const title = "점검 코드 상세";

  const { data: detail, isLoading } = useInspectionDetailInfo(columId || 0);
  const { localDateFormatDateToYYYYMMDD, imagePathFormateStringArray } =
    utillFormat();
  const [state, setState] = useState<"add" | "edit" | "detail" | "close">(
    modalState
  );
  const { mutate: edit } = useVendorEdit();
  const { mutate: add } = useInspectionAdd();
  const { data: vendorList } = useVendorList();
  const [vendorOptions, setVendorOptions] = useState<IIdOptions[]>([]);
  const [disableState, setDisableState] = useState<boolean>(false);

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
      const {
        id,
        code,
        checkAction,
        useYn,
        vendorId,
        imagePath,
        createDate,
        modifiedDate,
        creatorName,
        creatorEmail,
      } = detail;
      reset({
        id,
        code,
        checkAction,
        useYn,
        vendorId,
        imagePath,
        creatorName,
        creatorEmail,
      });
    }
  }, [detail]);

  // 디폴트 설정 및 데이터 폼에 set
  useEffect(() => {
    if (vendorList) {
      const options: IIdOptions[] = [
        {
          value: 0,
          label: "선택",
        },
      ];
      vendorList.forEach((vendor: any) => {
        options.push({
          value: vendor.id,
          label: vendor.vendorName,
        });
      });
      setVendorOptions(options);
    }
  }, [vendorList]);

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
                점검 코드 번호
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
              코드
            </label>
            <Controller
              name="code" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultInput
                  defaultValue={value}
                  setValue={onChange}
                  disable={disableState}
                />
              )}
            />
            <span>{errors.code && errors.code.message}</span>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              제조사
            </label>
            <Controller
              name="vendorId" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultSelect
                  defaultValue={value}
                  setValue={(value) => onChange(Number(value))}
                  options={vendorOptions}
                  disable={disableState}
                />
              )}
            />
            <span>{errors.vendorId && errors.vendorId.message}</span>
          </div>
          <div className="col-span-2">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              점검사항
            </label>
            <Controller
              name="checkAction" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultTextarea
                  defaultValue={value}
                  setValue={onChange}
                  rows={10}
                />
              )}
            />
            <span>{errors.checkAction && errors.checkAction.message}</span>
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
          <div>
            <Controller
              name="imagePath" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <DefaultFile
                  defaultValue={value}
                  multiple={true}
                  setValue={(val: string[]) => {
                    if (val.length === 1) {
                      return onChange(val[0]);
                    } else if (val.length > 1) {
                      const stringArr = val.join(",");
                      return onChange(stringArr);
                    }
                  }}
                  ref={ref}
                  type={"inspection"}
                />
              )}
            />

            <span>{errors.imagePath && errors.imagePath.message}</span>
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
              <span>{errors.createDate && errors.createDate.message}</span>
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
              <span>{errors.modifiedDate && errors.modifiedDate.message}</span>
            </div>
          ) : (
            <div></div>
          )}
          {detail && detail.creatorName ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                생성자
              </label>
              <Controller
                name="createDate" // yup 걸린 데이터명
                control={control}
                defaultValue={detail?.creatorName}
                render={({ field: { value, onChange } }) => (
                  <Controller
                    name="checkAction" // yup 걸린 데이터명
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DefaultInput
                        defaultValue={value}
                        setValue={onChange}
                        disable={true}
                      />
                    )}
                  />
                )}
              />
              <span>{errors.createDate && errors.createDate.message}</span>
            </div>
          ) : (
            <div></div>
          )}
          {detail && detail.creatorEmail ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                생성자 이메일
              </label>
              <Controller
                name="createDate" // yup 걸린 데이터명
                control={control}
                defaultValue={detail?.creatorEmail}
                render={({ field: { value, onChange } }) => (
                  <Controller
                    name="checkAction" // yup 걸린 데이터명
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <DefaultInput
                        defaultValue={value}
                        setValue={onChange}
                        disable={true}
                      />
                    )}
                  />
                )}
              />
              <span>{errors.creatorEmail && errors.creatorEmail.message}</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex items-center  space-x-2 rounded-b dark:border-gray-600">
        {state === "add" ? (
          <>
            <DefaultButton buttonTitle="저장" type="submit" />
            <DefaultButton
              buttonTitle="닫기"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setButtonClick("close")}
            />
          </>
        ) : state === "detail" ? (
          <>
            <DefaultButton
              buttonTitle="수정"
              type="button"
              onClick={() => setState("edit")}
            />
            <DefaultButton
              buttonTitle="닫기"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setButtonClick("close")}
            />
          </>
        ) : (
          <>
            <DefaultButton buttonTitle="저장" type="submit" />
            <DefaultButton
              buttonTitle="닫기"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setButtonClick("close")}
            />
          </>
        )}
      </div>
    </form>
  );
};
export default InspectionModalComp;
