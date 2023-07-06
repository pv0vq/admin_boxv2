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
  title: string;
}

const SimpleList = ({ columns, data, title }: IProps) => {
  if (data && data.content.length > 0) {
    return (
      <Card className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="flex-row rounded-none"
        >
          <div className="flex flex-wrap items-center text-blue-gray-900 py-2 p-4 justify-center">
            <Typography variant="h2" className="t">
              {title}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-0 ">
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
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
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
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" color="blue-gray" size="sm">
              1
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              2
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              3
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              8
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              9
            </IconButton>
            <IconButton variant="text" color="blue-gray" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    return <>잠시만</>;
  }
};

export default SimpleList;
