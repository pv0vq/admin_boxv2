import { useState } from "react";
import { IColumns, ISearchItem } from "../../../type/common";
import SideSearchComp from "../../../component/common/search/SideSearchComp";
import SimpleListComp from "../../../component/common/list/SimpleListComp";
import DefaultModal from "../../../component/common/modal/DefaultModal";
import UserDetailComp from "../../../component/user/UserDetailComp";
import API_VENDOR from "../../../api/code/vendor";
import VendorModalComp from "../../../component/vendor/vendorModalComp";

const Vendor = () => {
  const title = "제조사 관리";
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

  /**
   * 리스트 목록
   *
   */
  const [columns] = useState<IColumns[]>([
    {
      id: "id",
      label: "번호",
    },
    {
      id: "vendorName",
      label: "제조사 이름",
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

  return (
    <div className="relative h-[100vh]">
      {showModal ? (
        <DefaultModal setButtonClick={modalButtonHandler}>
          <VendorModalComp
            modalState={modalState}
            columId={columId}
            setButtonClick={modalButtonHandler}
          />
        </DefaultModal>
      ) : (
        <></>
      )}

      <SideSearchComp
        title={title}
        api={API_VENDOR.VENDOR_PAGE}
        setAddButtonClick={modalButtonHandler}
      >
        <SimpleListComp columns={columns} setColumClick={modalButtonHandler} />
      </SideSearchComp>
    </div>
  );
};

export default Vendor;
