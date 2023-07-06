import { useEffect, useState } from "react";
import useFreeBoardList from "../../../hooks/api/board/freeBoard/useFreeBoardList";
import { Spinner } from "@material-tailwind/react";
import SimpleList from "../../common/list/SimpleListComp";
import { IColumns, ISearchItem } from "../../../type/common";
import SideSearchComp from "../../common/search/SideSearchComp";

const FreeBoardListComp = () => {
  const [paramsSubmit, setParamsSubmit] = useState<{ [key: string]: string }>(
    {}
  );
  const [data, setData] = useState<any>({});

  useEffect(() => {
    console.log(data);
  }, [data]);
  const [searchState, setSearchState] = useState<boolean>(true);
  const title = "자유게시판";
  const [columns] = useState<IColumns[]>([
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

  const [searchItem] = useState<ISearchItem[]>([
    {
      type: "TEXT",
      value: "userName",
      label: "검색",
    },
    {
      type: "SELECT_BOX",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "사용자",
          value: "USER",
        },
        {
          label: "관리자",
          value: "ADMIN",
        },
      ],
    },
    {
      type: "RADIO",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "사용자",
          value: "USER",
        },
        {
          label: "관리자",
          value: "ADMIN",
        },
      ],
    },
    {
      type: "CHECK_BOX",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "사용자",
          value: "USER",
        },
        {
          label: "관리자",
          value: "ADMIN",
        },
      ],
    },
    {
      type: "SWITCH",
      value: "useYn",
      label: "사용여부",
    },
  ]);

  return (
    <SideSearchComp searchItem={searchItem} title={title}>
      <SimpleList columns={columns} />
    </SideSearchComp>
  );
};

export default FreeBoardListComp;
