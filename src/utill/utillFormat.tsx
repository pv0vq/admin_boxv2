const utillFormat = () => {
  function formatDateToyyyyMMdd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  function parseDateFromyyyyMMdd(date: string) {
    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(4, 6)) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
    const day = Number(date.slice(6, 8));

    return new Date(year, month, day);
  }

  function localDateFormatDateToYYYYMMDD(localDate: string) {
    const dateObject = new Date(localDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  return {
    formatDateToyyyyMMdd,
    parseDateFromyyyyMMdd,
    localDateFormatDateToYYYYMMDD,
  };
};

export default utillFormat;
