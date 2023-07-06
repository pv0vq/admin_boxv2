import { useState } from "react";
import FreeBoardListComp from "../../../component/board/freeBoard/FreeBoardListComp";

const FreeBoard = () => {
  const [pageState, setPageState] = useState("list" || "detail");

  if (pageState === "list") {
    return <FreeBoardListComp />;
  } else {
    return <>상세</>;
  }
};

export default FreeBoard;
