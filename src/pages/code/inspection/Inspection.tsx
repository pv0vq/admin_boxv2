import { useEffect, useState } from "react";
import { IColumns, IOptions, ISearchItem } from "../../../type/common";
import SideSearchComp from "../../../component/common/search/SideSearchComp";
import SimpleListComp from "../../../component/common/list/SimpleListComp";
import API_INSPECTION from "../../../api/code/inspection";
import DefaultModal from "../../../component/common/modal/DefaultModal";
import { useVendorList } from "../../../hooks/api/vendor/useVendorList";
import InspectionModalComp from "../../../component/code/inspection/InspectionModalComp";

const Inspection = () => {
  const title = "점검 사항 관리";
  const [showModal, setShowModal] = useState<boolean>(false);
  const [columId, setColumId] = useState<number>(0);
  const [modalState, setModalStat] = useState<
    "add" | "detail" | "edit" | "close"
  >("add");

  // 모달 상태 반전
  const modalTogglehandle = () => {
    setShowModal((prevState) => !prevState);
  };

  const { data: vendorList } = useVendorList();

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
      id: "code",
      label: "코드",
    },
    {
      id: "checkAction",
      label: "점검 사항",
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

  const [searchItem, setSearchItem] = useState<ISearchItem[]>([
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
  ]);

  useEffect(() => {
    if (vendorList) {
      const vendorOption: IOptions[] = [
        {
          label: "선택",
          value: "",
        },
      ];
      vendorList.forEach((vendor: any) => {
        vendorOption.push({
          label: vendor.vendorName,
          value: vendor.vendorName,
        });
      });
      setSearchItem((prevValue) => [
        ...prevValue,
        {
          type: "SELECT_BOX",
          value: "vendorName",
          label: "제조사 이름",
          optin: vendorOption,
        },
      ]);
    }

    // {
    //   type: "SELECT_BOX",
    //   value: "code",
    //   label: "코드",
    //   optin: [
    //     {
    //       label: "선택",
    //       value: "",
    //     },
    //     {
    //       label: "사용자",
    //       value: "USER",
    //     },
    //     {
    //       label: "관리자",
    //       value: "ADMIN",
    //     },
    //   ],
    // },
  }, [vendorList]);

  return (
    <div className="relative h-[100vh]">
      {showModal ? (
        <DefaultModal setButtonClick={modalButtonHandler}>
          <InspectionModalComp
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
        api={API_INSPECTION.INSPECTION_PAGE}
        setAddButtonClick={modalButtonHandler}
        searchItem={searchItem}
      >
        <SimpleListComp columns={columns} setColumClick={modalButtonHandler} />
      </SideSearchComp>
    </div>
  );
};

export default Inspection;
