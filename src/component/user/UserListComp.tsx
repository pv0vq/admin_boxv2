import { useState } from "react";
import SimpleList from "../common/list/SimpleListComp";
import SimpleSearchComp from "../common/search/SimpleSearchComp";
import { Spinner } from "@material-tailwind/react";
import useUserList from "../../hooks/api/user/useUserList";

interface IColumns {
  id: string;
  label: string;
}

const UserList = () => {
  const { data, isLoading } = useUserList();
  const [columns] = useState<any[]>([
    {
      id: "id",
      label: "번호",
    },
    {
      id: "email",
      label: "이메일",
    },
    {
      id: "name",
      label: "이름",
    },
    {
      id: "role",
      label: "권한",
    },
  ]);
  // const [data] = useState<any>([
  //   {
  //     createDate: null,
  //     modifiedDate: null,
  //     id: 1,
  //     email: "user",
  //     password: null,
  //     name: "재후야",
  //     role: "ADMIN",
  //     roleKey: "ROLE_ADMIN",
  //   },
  //   {
  //     createDate: null,
  //     modifiedDate: null,
  //     id: 2,
  //     email: "admin",
  //     password: null,
  //     name: "관리자",
  //     role: "ADMIN",
  //     roleKey: "ROLE_ADMIN",
  //   },
  // ]);

  console.log("data:", data);

  if (isLoading) {
    return (
      <div className="flex items-end justify-center gap-8">
        <Spinner className="h-64 w-64" />
      </div>
    );
  } else {
    return (
      <SimpleSearchComp>
        <SimpleList columns={columns} data={data.content} />
      </SimpleSearchComp>
    );
  }
};

export default UserList;
