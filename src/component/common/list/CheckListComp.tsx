import { useEffect, useState } from "react";
import { IPageData } from "../../../type/common";
interface IProps {
  columns: {
    id: string;
    label: string;
  }[];
  data?: IPageData;
  setColumClick?: (
    type: "add" | "detail" | "edit" | "close",
    columId: number
  ) => void;
  setCheckColumn?: (columns: { [key: string]: any }[]) => void;
}

const CheckListComp = ({
  columns,
  data,
  setColumClick,
  setCheckColumn,
}: IProps): JSX.Element | null => {
  const [content, setContent] = useState<{ [key: string]: any }[]>([]);
  const [checkColumns, setCheckColumns] = useState<{ [key: string]: any }[]>(
    []
  );

  const allcheckColumnsHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // 전부 체크됨
    if (event.target.checked) {
      setCheckColumns(content);
    } else {
      setCheckColumns([]);
    }
  };

  const checkColumnHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: { [key: string]: any }
  ) => {
    if (event.target.checked) {
      setCheckColumns((prevColumns) => [...prevColumns, row]);
    } else {
      setCheckColumns(
        checkColumns.filter((item: { [key: string]: any }) => item !== row)
      );
    }
  };

  useEffect(() => {
    if (data) setContent(data.content);
  }, [data]);

  useEffect(() => {
    if (setCheckColumn) setCheckColumn(checkColumns);
  }, [checkColumns]);

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="p-4 border-b border-blue-gray-100">
            <input
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
              type="checkbox"
              checked={
                content.length > 0 && content.length === checkColumns.length
              }
              onChange={allcheckColumnsHandler}
            />
          </th>
          {columns.map((column, i) => (
            <th
              key={i}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      {data && data.content.length > 0 ? (
        <tbody>
          {data.content.map((row: any, index: number) => {
            const isLast = index === data.content.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const isChecked = !!checkColumns.find((item) => item === row);
            return (
              <tr key={index}>
                <td className={classes}>
                  <input
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      checkColumnHandler(event, row)
                    }
                  />
                </td>
                {columns.map((column, ii) => (
                  <td
                    className={classes}
                    key={ii}
                    onClick={() => {
                      if (setColumClick) setColumClick("detail", row.id);
                    }}
                  >
                    {(() => {
                      if (
                        row[column.id] !== null &&
                        row[column.id] !== undefined &&
                        row[column.id] !== "undefined"
                      ) {
                        return row[column.id];
                      } else return "";
                    })()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="text-center">
              검색한 목록이 없어요!
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default CheckListComp;
