import { useEffect, useState } from "react";
import UserListComp from "../../component/user/UserListComp";
import UserDetailComp from "../../component/user/UserDetailComp";

const User = () => {
  const [pageState, setPageState] = useState<string>("list" || "detail");
  const [columsId, setColumsId] = useState<number>(0);

  const pageHandler = (colum: any) => {
    setColumsId(colum.id);
    setPageState("detail");
  };

  if (pageState === "list") {
    return <UserListComp setColum={pageHandler} />;
  } else {
    return <UserDetailComp columsId={columsId} />;
  }
};

export default User;
