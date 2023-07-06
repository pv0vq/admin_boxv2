import { useState } from "react";
import useFreeBoardList from "../../../hooks/api/board/freeBoard/useFreeBoardList";
import { Spinner } from "@material-tailwind/react";
import SimpleSearchComp from "../../common/search/SimpleSearchComp";
import SimpleList from "../../common/list/SimpleListComp";

const FreeBoardListComp = () => {
  const { data, isLoading } = useFreeBoardList();
  const [columns] = useState<any[]>([
    {
      id: "id",
      label: "번호",
    },
    {
      id: "title",
      label: "제목",
    },
    {
      id: "content",
      label: "내용",
    },
    {
      id: "useYn",
      label: "사용여부",
    },
    {
      id: "creatorName",
      label: "생성자",
    },
    {
      id: "creatorEmail",
      label: "생성자이메일",
    },
    {
      id: "createDate",
      label: "생성일",
    },
    {
      id: "modifiedDate",
      label: "수정일",
    },
  ]);

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

export default FreeBoardListComp;
