import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useLogin from "../../hooks/api/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

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
interface ILongin {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const onSubmit = (data: ILongin) => {
    mutate(data);
  };

  const isLoginCheck = () => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "true") {
      navigate("/dashBoard");
    }
  };

  useEffect(() => {
    isLoginCheck();
  }, []);

  return (
    // <>
    //   {/*
    //     This example requires updating your template:

    //     ```
    //     <html class="h-full bg-white">
    //     <body class="h-full">
    //     ```
    //   */}
    //   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //         Bitte 어드민
    //       </h2>
    //     </div>

    //     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //       <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             E-mail
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               {...register("email")}
    //               name="email"
    //               placeholder="이메일"
    //               required
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //             <span>{errors.email && errors.email.message}</span>
    //           </div>
    //         </div>

    //         <div>
    //           <div className="flex items-center justify-between">
    //             <label
    //               htmlFor="password"
    //               className="block text-sm font-medium leading-6 text-gray-900"
    //             >
    //               비밀번호
    //             </label>
    //             {/* <div className="text-sm">
    //               <a
    //                 href="#"
    //                 className="font-semibold text-indigo-600 hover:text-indigo-500"
    //               >
    //                 Forgot password?
    //               </a>
    //             </div> */}
    //           </div>
    //           <div className="mt-2">
    //             <input
    //               id="password"
    //               type="password"
    //               placeholder="비밀번호"
    //               {...register("password")}
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //             <span>{errors.password && errors.password.message}</span>
    //           </div>
    //         </div>

    //         <div>
    //           <button
    //             type="submit"
    //             className="flex w-full justify-center rounded-md bg-violet-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //           >
    //             로그인
    //           </button>
    //         </div>
    //       </form>

    //       <p className="mt-10 text-center text-sm text-gray-500">
    //         비밀번호를 잊어버리셨나요?{" "}
    //         <a
    //           href="#"
    //           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    //         >
    //           비밀번호 찾기
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="container relative h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-violet-400" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* <Image
            src="/images/logo/ionvertical.png"
            width={1000}
            height={200}
            alt="ion"
            style={{ width: "25%" }}
          /> */}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">BITTE</p>
              <footer className="text-sm">BITTE.SOTOE</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 lg:flex-none grid grid-rows-3 p-10 h-full w-screen lg:w-auto">
          <div></div>
          <div className="max-h-full flex w-full flex-col justify-center space-y-6">
            <div className="lg:hidden ">
              {/* <Image
              className="w-auto"
              src="/images/logo/ionvertical.png"
              width={1000}
              height={200}
              alt="ion"
            /> */}
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                BITTE LOGIN
              </h1>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    name="email"
                    placeholder="이메일"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <span>{errors.email && errors.email.message}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    비밀번호
                  </label>
                  {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    {...register("password")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <span>{errors.password && errors.password.message}</span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Login;
