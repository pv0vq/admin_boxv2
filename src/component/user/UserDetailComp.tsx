import useUserDetailInfo from "../../hooks/api/user/useUserDetailInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IProps {
  columsId: number;
}

// yub 유효성 검증
const schema = yup
  .object({
    email: yup
      .string()
      .required("아이디를 확인해주세요. ")
      .min(4, "4자 이상 입력해주세요!"),
    password: yup.string().required("패스워드를 입력해주세요"),
  })
  .required();

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // const { mutate } = useLogin();

  const onSubmit = (data: any) => {
    // mutate(data);
    console.log(111);
  };

  const title = "유저 상세";

  const { data } = useUserDetailInfo(columsId);
  console.log("data:", data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg shadow-lg w-full h-full">
        <div className="bg-violet-500 text-white py-2 rounded-t-lg opacity-80">
          <div className="grid grid-cols-5 items-center text-blue-gray-900 py-2 p-4 ">
            {title}
          </div>
        </div>
        <div className="p-4">바디</div>

        <div className="bg-gray-100 py-2 px-4 rounded-b-lg">푸터</div>
      </div>
    </form>
  );
};

export default UserDetailComp;
