import { useState } from "react";
import { IColumns, ISearchItem } from "../../../type/common";
import SideSearchComp from "../../common/search/SideSearchComp";
import API_BOARD from "../../../api/code/board/freeBoard/board";
import CheckListComp from "../../common/list/CheckListComp";
import DefaultModal from "../../common/modal/DefaultModal";
import FreeBoardModalComp from "./FreeBoardModalComp";

const FreeBoardListComp = () => {
  const title = "자유게시판 관리";
  const [showModal, setShowModal] = useState<boolean>(false);
  const [columId, setColumId] = useState<number>(0);
  const [modalState, setModalStat] = useState<
    "add" | "detail" | "edit" | "close"
  >("add");

  // 모달 상태 반전
  const modalTogglehandle = () => {
    setShowModal((prevState) => !prevState);
  };

  /**
   * 모달 핸들러 (추가, 닫기)
   *
   * @param type
   */
  const modalButtonHandler = (
    type: "add" | "detail" | "edit" | "close",
    id: number = 0
  ) => {
    if (type === "close") {
      return modalTogglehandle();
    }
    setModalStat(type);
    setColumId(id);
    modalTogglehandle();
  };
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
      type: "CHECK_BOX",
      value: "useYn",
      label: "사용여부",
      optin: [
        {
          label: "사용",
          value: "Y",
        },
        {
          label: "미사용",
          value: "N",
        },
      ],
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
    <div className="relative h-[100vh]">
      {showModal ? (
        <DefaultModal setButtonClick={modalButtonHandler}>
          <FreeBoardModalComp
            modalState={modalState}
            columId={columId}
            setButtonClick={modalButtonHandler}
          />
          <></>
        </DefaultModal>
      ) : (
        <></>
      )}

      <SideSearchComp
        searchItem={searchItem}
        title={title}
        api={API_BOARD.FREE_BOARD_LIST}
        setAddButtonClick={modalButtonHandler}
      >
        <CheckListComp columns={columns} setColumClick={modalButtonHandler} />
      </SideSearchComp>
    </div>
  );
};

export default FreeBoardListComp;
