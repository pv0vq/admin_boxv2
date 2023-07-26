import { useState } from "react";
import SideSearchComp from "../common/search/SideSearchComp";
import SimpleListComp from "../common/list/SimpleListComp";
import API_USER from "../../api/code/user";
import { ISearchItem, IColumns } from "../../type/common";
import DefaultModal from "../common/modal/DefaultModal";
import UserDetailComp from "./UserDetailComp";
import React from "react";

const UserList = () => {
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

  const title = "유저 관리";
  const [columns] = useState<IColumns[]>([
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
    {
      id: "useYn",
      label: "사용여부",
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
      value: "checkBox",
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
  ]);

  return (
    <div className="relative h-[100vh]">
      {showModal ? (
        <DefaultModal setButtonClick={modalButtonHandler}>
          <UserDetailComp
            modalState={modalState}
            columId={columId}
            setButtonClick={modalButtonHandler}
          />
        </DefaultModal>
      ) : (
        <></>
      )}

      <SideSearchComp
        searchItem={searchItem}
        title={title}
        api={API_USER.USER_LIST}
        setAddButtonClick={modalButtonHandler}
      >
        <SimpleListComp columns={columns} setColumClick={modalButtonHandler} />
      </SideSearchComp>
    </div>
  );
};

export default UserList;
