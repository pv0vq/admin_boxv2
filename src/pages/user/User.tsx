import { useState } from "react";
import UserListComp from "../../component/user/UserListComp";
import UserDetailComp from "../../component/user/UserDetailComp";

const User = () => {
  const [pageState, setPageState] = useState("list" || "detail");

  if (pageState === "list") {
    return <UserListComp />;
  } else {
    return <UserDetailComp />;
  }
};

export default User;
