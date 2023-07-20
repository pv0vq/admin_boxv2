import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import utillFormat from "../../../utill/utillFormat";

interface IProps {
  defaultValue?: string;
  setValue: (value: string) => void;
  disable?: boolean;
  className?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DefaultDatePicker = ({
  defaultValue = "",
  setValue,
  disable = false,
  placeholder = "날짜 선택",
  minDate,
  maxDate,
}: IProps) => {
  const { formatDateToyyyyMMdd, parseDateFromyyyyMMdd } = utillFormat();

  const [param, setParam] = useState<string>(defaultValue);

  const changeParamHandler = (date: string) => {
    setParam(date);
    setValue(date);
  };

  useEffect(() => {
    if (defaultValue) setParam(defaultValue);
  }, [defaultValue]);

  return (
    <DatePicker
      locale={ko} // 언어설정 기본값은 영어
      dateFormat="yyyy-MM-dd" // 날짜 형식 설정
      // minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
      closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
      placeholderText={placeholder} // placeholder
      minDate={minDate}
      maxDate={maxDate}
      selected={param ? parseDateFromyyyyMMdd(param) : undefined} // value
      onChange={(date: Date) => changeParamHandler(formatDateToyyyyMMdd(date))} // 날짜를 선택하였을 때 실행될 함수
      disabled={disable}
    />
  );
};

export default DefaultDatePicker;
