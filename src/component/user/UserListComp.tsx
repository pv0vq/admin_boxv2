import { useState } from "react";
import SideSearchComp from "../common/search/SideSearchComp";
import SimpleListComp from "../common/list/SimpleListComp";
import API_USER from "../../api/code/user";
import { ISearchItem, IColumns } from "../../type/common";
import DefaultModal from "../common/modal/DefaultModal";
import UserDetailComp from "./UserDetailComp";

const UserList = () => {
  const [showModal, setShowModal] = useState(false);

  const modalTogglehandle = () => {
    console.log(111);
    setShowModal((prevState) => !prevState);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const modalButtonHandler = (type: string) => {
    if ("close") {
      modalCloseHandler();
    } else {
    }
  };

  const title = "유저게시판";
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
      type: "SWITCH",
      value: "useYn",
      label: "사용여부",
    },
  ]);

  return (
    <div className="relative h-[100vh]">
      {showModal ? (
        <DefaultModal setButtonClick={modalButtonHandler}>
          <UserDetailComp />
        </DefaultModal>
      ) : (
        <></>
      )}

      <SideSearchComp
        searchItem={searchItem}
        title={title}
        api={API_USER.USER_LIST}
        setOpenModal={modalTogglehandle}
      >
        <SimpleListComp columns={columns} />
      </SideSearchComp>
    </div>
  );
};

export default UserList;
