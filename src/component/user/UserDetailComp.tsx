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
import DefaultDatePicker from "../common/forms/DefaultDatepicker";
import DefaultFile from "../common/forms/DefaultFile";
import { useEffect } from "react";
import DefaultTextarea from "../common/forms/DefaultTextarea";
import DefaultRange from "../common/forms/DefaultRange";

interface IProps {
  columsId: number;
}

// yub 유효성 검증
const schema = yup.object({
  // email: yup
  //   .string()
  //   .required("아이디를 확인해주세요. ")
  //   .min(4, "4자 이상 입력해주세요!"),
  // password: yup.string().required("패스워드를 입력해주세요"),\
  text: yup.string().required("텍스트를 확인해주세요. "),
  select: yup.string().required("셀렉트를 확인해주세요. "),
  radio: yup.string().required("라디오를 확인해주세요. "),
  checkbox: yup.array().required("체크박스를 확인해주세요. "),
  swich: yup.boolean().required("체크박스를 확인해주세요. "),
  date: yup.string().required("날짜를 확인해주세요. "),
  file: yup.array().required("파일을 선택해주세요"),
  textarea: yup.string().required("텍스트에리어를 확인해주세요. "),
  range: yup.number().required("랭지를 확인해주세요. "),
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

const UserDetailComp = ({ columsId }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // const { mutate } = useLogin();

  const onSubmit = (data: any) => {
    // mutate(data);

    // 체크박스
    // let val = "";
    // if (value.length > 1) {
    //   val = value.join(",");
    // } else if (value.length === 1) {
    //   val = value[0];
    // }
    console.log("data:", data);
  };

  let data = {};

  const title = "유저 상세";
  if (true) {
    data = useUserDetailInfo(columsId);
  }

  const aaaa: IOptions[] = [
    { label: "1번", value: "1" },
    { label: "2번", value: "2" },
    { label: "3번", value: "3" },
  ];

  useEffect(() => {
    console.log("errors:", errors);
  }, [errors]);

  return (
    <div className="relative bg-white rounded-lg shadow">
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900">
          유저관리
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
          유저상세
        </h3>
        <form>
          <div className="bg-white rounded-lg shadow-lg w-full h-full">
            <div className="bg-violet-500 text-white py-2 rounded-t-lg opacity-80">
              <div className="grid grid-cols-5 items-center text-blue-gray-900 py-2 p-4 ">
                {title}
              </div>
            </div>
            <div className="p-4 grid grid-cols-4">
              <Controller
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
              <span>{errors.date && errors.date.message}</span>
            </div>
          </div>
        </form>
        <div className="mt-4  py-2 px-2 rounded-lg flex justify-end">
          <button onClick={handleSubmit(onSubmit)} type="submit">
            수정
          </button>
          <button>목록</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailComp;
