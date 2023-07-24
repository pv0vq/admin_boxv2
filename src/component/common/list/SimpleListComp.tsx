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
}

const SimpleListComp = ({
  columns,
  data,
  setColumClick,
}: IProps): JSX.Element | null => {
  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
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
            return (
              <tr key={index}>
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

export default SimpleListComp;
