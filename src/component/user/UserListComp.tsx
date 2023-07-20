import { useState } from "react";
import SideSearchComp from "../common/search/SideSearchComp";
import SimpleListComp from "../common/list/SimpleListComp";
import API_USER from "../../api/code/user";
import { ISearchItem, IColumns } from "../../type/common";
import DefaultModal from "../common/modal/DefaultModal";
import UserDetailComp from "./UserDetailComp";
import useUserDetailInfo from "../../hooks/api/user/useUserDetailInfo";

const UserList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [columId, setColumId] = useState<number>(0);

  const modalTogglehandle = () => {
    setShowModal((prevState) => !prevState);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const modalButtonHandler = (type: string) => {
    if (type === "close") {
      modalCloseHandler();
    } else if (type === "create") {
      setColumId(0);
      modalTogglehandle();
    } else if (type === "add") {
      modalTogglehandle();
    } else if (type === "detial") {
      modalTogglehandle();
    } else if (type === "edit") {
      modalTogglehandle();
    }
  };

  const showEditModalHandler = (row: any) => {
    setShowModal(true);
    setColumId(row.id);
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
          <UserDetailComp
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
        <SimpleListComp columns={columns} setColum={showEditModalHandler} />
      </SideSearchComp>
    </div>
  );
};

export default UserList;
