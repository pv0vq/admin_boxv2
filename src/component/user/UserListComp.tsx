import { useState } from "react";
import SimpleList from "../common/list/SimpleListComp";
import useUserList from "../../hooks/api/useUserList";

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

  if (isLoading) {
    <>잠시만</>;
  } else {
    return <SimpleList columns={columns} data={data.content} />;
  }
};

export default UserList;
