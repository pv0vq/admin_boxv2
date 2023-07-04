import { useState } from "react";
import SimpleList from "../common/list/SimpleListComp";
import useUserList from "../../hooks/api/useUserList";
interface IColumns {
  id: string;
  label: string;
}

const { data } = useUserList();
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

const UserList = () => {
  return <SimpleList columns={columns} data={data} />;
};

export default UserList;
