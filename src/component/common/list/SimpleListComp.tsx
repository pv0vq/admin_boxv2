import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Card,
  CardHeader,
  Tooltip,
} from "@material-tailwind/react";
import { pageData } from "../../../type/common";
interface IProps {
  columns: {
    id: string;
    label: string;
  }[];
  data?: pageData;
}

const SimpleList = ({ columns, data }: IProps) => {
  if (data && data.content.length > 0) {
    return (
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {column.label}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.content.map((row: any, index: number) => {
            const isLast = index === data.content.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={index}>
                {columns.map((column, ii) => (
                  <td className={classes} key={ii}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
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
                    </Typography>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};

export default SimpleList;
