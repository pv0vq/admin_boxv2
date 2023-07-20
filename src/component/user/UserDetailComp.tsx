import useUserDetailInfo from "../../hooks/api/user/useUserDetailInfo";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DefaultInput from "../common/forms/DefaultInput";
import DefaultSelect from "../common/forms/DefaultSelect";
import { IOptions } from "../../type/common";
import DefaultRadio from "../common/forms/DefaultRadio";
import DefaultCheckBox from "../common/forms/DefaultCheckBox";
import { join } from "path";
import DefaultSwich from "../common/forms/DefaultSwich";
import DefaultDatePicker from "../common/forms/DefaultDatePicker";
import DefaultFile from "../common/forms/DefaultFile";
import { forwardRef, useEffect, useRef, useState } from "react";
import DefaultTextarea from "../common/forms/DefaultTextarea";
import DefaultRange from "../common/forms/DefaultRange";
import utillFormat from "../../utill/utillFormat";
import useUserAdd from "../../hooks/api/user/useUserAdd";
import DefaultButton from "../common/forms/DefaultButton";
import useUserEdit from "../../hooks/api/user/useUserEdit";

interface IUserDetailInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  useYn: string;
  createDate?: Date;
  modifiedDate?: Date;
}

interface IProps {
  modalState: "add" | "detail" | "edit";
  columId: number;
  setButtonClick: (type: string) => void;
}

// yub 유효성 검증
const schema = yup.object({
  // email: yup
  //   .string()
  //   .required("아이디를 확인해주세요. ")
  //   .min(4, "4자 이상 입력해주세요!"),
  // password: yup.string().required("패스워드를 입력해주세요"),\
  // text: yup.string().required("텍스트를 확인해주세요. "),
  // select: yup.string().required("셀렉트를 확인해주세요. "),
  // radio: yup.string().required("라디오를 확인해주세요. "),
  // checkbox: yup.array().required("체크박스를 확인해주세요. "),
  // swich: yup.boolean().required("체크박스를 확인해주세요. "),
  // date: yup.string().required("날짜를 확인해주세요. "),
  // file: yup.array().required("파일을 선택해주세요"),
  // textarea: yup.string().required("텍스트에리어를 확인해주세요. "),
  // range: yup.number().required("랭지를 확인해주세요. "),
  id: yup.number(),
  email: yup.string().required("이메일을 확인해주세요. "),
  name: yup.string().required("이름을 확인해주세요. "),
  password: yup.string(),
  role: yup.string().required("권한을 확인해주세요. "),
  useYn: yup.boolean().required("사용여부를 확인해주세요. "),
  createDate: yup.string(),
  modifiedDate: yup.string(),
});

// yub 기본 형식
// let schema = yup.object().shape({
//   name: yup.string().required(),
//   age: yup.number().required().positive().integer(),
//   email: yup.string().email(),
//   website: yup.string().url(),
//   createdOn: yup.date().default(function () {
//     return new Date();
//   }),
// });

const UserDetailComp = ({ columId, setButtonClick, modalState }: IProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const title = "유저 상세";

  const roleOptions: IOptions[] = [
    { label: "선택", value: "" },
    { label: "회원", value: "USER" },
    { label: "관리자", value: "ADMIN" },
  ];

  const { data, isLoading } = useUserDetailInfo(columId || 0);
  const { localDateFormatDateToYYYYMMDD } = utillFormat();
  const [state, setState] = useState<"add" | "edit" | "detail">(modalState);
  const { mutate } = useUserEdit();
  const { mutateAsync } = useUserAdd();
  // const { mutate } = useUserAdd();
  //
  const onSubmit = (data: any) => {
    if (state === "edit") {
      return mutate(data);
    } else {
      return mutateAsync(data);
    }
    console.log(1);
  };

  // 디폴트 설정 및 데이터 폼에 set
  useEffect(() => {
    if (data) {
      const { id, email, name, role, useYn } = data;
      reset({
        id,
        email,
        name,
        role,
        password: !!data ? "*******" : "",
        useYn: useYn === "Y",
      });
    }
  }, [data]);

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg shadow-lg w-full h-full">
        <div className="bg-violet-500 text-white py-2 rounded-t-lg opacity-80">
          <div className="grid grid-cols-5 items-center text-blue-gray-900 py-2 p-4 ">
            {title}
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 p-4">
          {data && data.id ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                회원 번호
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
              E-mail
            </label>
            <Controller
              name="email" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultInput defaultValue={value} setValue={onChange} />
              )}
            />
            <span>{errors.email && errors.email.message}</span>
          </div>

          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <Controller
              name="name" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultInput defaultValue={value} setValue={onChange} />
              )}
            />
            <span>{errors.name && errors.name.message}</span>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              비밀번호
            </label>
            <Controller
              name="password" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultInput
                  defaultValue={value}
                  setValue={onChange}
                  disable={data ? true : false}
                />
              )}
            />
            <span>{errors.password && errors.password.message}</span>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Role
            </label>
            <Controller
              name="role" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultSelect
                  defaultValue={value}
                  setValue={onChange}
                  options={roleOptions}
                />
              )}
            />
            <span>{errors.role && errors.role.message}</span>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              사용여부
            </label>
            <Controller
              name="useYn" // yup 걸린 데이터명
              control={control}
              render={({ field: { value, onChange } }) => (
                <DefaultSwich defaultValue={value} setValue={onChange} />
              )}
            />
            <span>{errors.useYn && errors.useYn.message}</span>
          </div>
          {data && data.createDate ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                생성일
              </label>
              <Controller
                name="createDate" // yup 걸린 데이터명
                control={control}
                defaultValue={
                  data
                    ? data?.createDate
                      ? localDateFormatDateToYYYYMMDD(String(data?.createDate))
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
          {data && data.modifiedDate ? (
            <div>
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                수정일
              </label>
              <Controller
                name="modifiedDate" // yup 걸린 데이터명
                control={control}
                defaultValue={
                  data
                    ? data?.modifiedDate
                      ? localDateFormatDateToYYYYMMDD(
                          String(data?.modifiedDate)
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

          {/* <Controller
                name="text" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DefaultInput
                    defaultValue={value}
                    setValue={(value) => onChange(value)}
                  />
                )}
              />
              <span>{errors.text && errors.text.message}</span>
              <Controller
                name="select" // yup 걸린 데이터명
                control={control}
                defaultValue="1" // 디폴트 설정은 배열의 첫값을 하는게 좋음
                render={({ field: { value, onChange } }) => (
                  <DefaultSelect
                    defaultValue={value}
                    setValue={onChange}
                    options={aaaa}
                  />
                )}
              />
              <span>{errors.select && errors.select.message}</span>
              <Controller
                name="radio" // yup 걸린 데이터명
                control={control}
                defaultValue="1"
                render={({ field: { value, onChange } }) => (
                  <DefaultRadio
                    defaultValue={value}
                    setValue={onChange}
                    options={aaaa}
                  />
                )}
              />
              <span>{errors.radio && errors.radio.message}</span>
              <Controller
                name="checkbox" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DefaultCheckBox setValue={onChange} options={aaaa} />
                )}
              />
              <span>{errors.checkbox && errors.checkbox.message}</span>
              <Controller
                name="swich" // yup 걸린 데이터명
                control={control}
                defaultValue={true}
                render={({ field: { value, onChange } }) => (
                  <DefaultSwich
                    defaultValue={value}
                    setValue={onChange}
                    title="사용여부"
                  />
                )}
              />
              <span>{errors.swich && errors.swich.message}</span>
              <Controller
                name="date" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DefaultDatePicker defaultValue={value} setValue={onChange} />
                )}
              />
              <span>{errors.date && errors.date.message}</span>
              <Controller
                name="file" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange, ref } }) => (
                  <DefaultFile multiple={true} setValue={onChange} ref={ref} />
                )}
              />
              <span>{errors.date && errors.date.message}</span>
              <Controller
                name="textarea" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DefaultTextarea setValue={onChange} />
                )}
              />
              <span>{errors.date && errors.date.message}</span>
              <Controller
                name="range" // yup 걸린 데이터명
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DefaultRange setValue={onChange} />
                )}
              />
              <span>{errors.date && errors.date.message}</span> */}
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
              onClick={(buttonState: string) => setButtonClick(buttonState)}
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
              onClick={(buttonState: string) => setButtonClick(buttonState)}
            />
          </>
        ) : (
          <>
            <DefaultButton buttonTitle="저장" type="submit" />
            <DefaultButton
              buttonTitle="닫기"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={(buttonState: string) => setButtonClick(buttonState)}
            />
          </>
        )}
      </div>
    </form>
  );
};
export default UserDetailComp;
