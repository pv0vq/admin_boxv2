import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
interface IProps {
  columns: {
    id: string;
    label: string;
  }[];
  data: Array<{ [key: string]: any }>;
}

const SimpleList = ({ columns, data }: IProps) => {
  return (
    <>
      <CardBody className="overflow-scroll px-0 ">
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
            {data.map((row, index) => {
              const isLast = index === data.length - 1;
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
                          return row[column.id];
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
    </>
  );
};

export default SimpleList;
