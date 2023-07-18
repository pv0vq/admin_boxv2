import { useEffect, useState } from "react";
import SimpleListComp from "../../common/list/SimpleListComp";
import { IColumns, ISearchItem } from "../../../type/common";
import SideSearchComp from "../../common/search/SideSearchComp";
import API_BOARD from "../../../api/code/board";

const FreeBoardListComp = () => {
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
      value: "searchText",
      label: "검색",
    },
    {
      type: "SELECT_BOX",
      value: "role",
      label: "권한",
      optin: [
        {
          label: "선택",
          value: "",
        },
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
    {
      type: "DATE_PIKER",
      value: "createDateFrom",
      label: "시작일",
    },
    {
      type: "DATE_PIKER",
      value: "createDateTo",
      label: "종료일",
    },
  ]);

  return (
    <SideSearchComp
      searchItem={searchItem}
      title={title}
      api={API_BOARD.FREE_BOARD_LIST}
    >
      <SimpleListComp columns={columns} />
    </SideSearchComp>
  );
};

export default FreeBoardListComp;
