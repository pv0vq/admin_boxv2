import { useState } from "react";
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

  if (isLoading) {
    return (
      <div className="flex items-end justify-center gap-8">
        <Spinner className="h-64 w-64" />
      </div>
    );
  } else {
    return <>대기</>;
  }
};

export default UserList;
