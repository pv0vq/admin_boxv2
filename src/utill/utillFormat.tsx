const utillFormat = () => {
  /**
   * Date -> '19990212'
   *
   * @param date
   * @returns
   */
  function formatDateToyyyyMMdd(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  /**
   * "19990212" -> Date
   *
   * @param date
   * @returns
   */
  function parseDateFromyyyyMMdd(date: string) {
    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(4, 6)) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
    const day = Number(date.slice(6, 8));

    return new Date(year, month, day);
  }

  /**
   * 	2023-07-26T11:30:55.590063 -> 20230726
   *
   * @param localDate
   * @returns
   */
  function localDateFormatDateToYYYYMMDD(localDate: string) {
    const dateObject = new Date(localDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  function imagePathFormateStringArray(imagePath: string) {
    return imagePath.split(",");
  }

  return {
    formatDateToyyyyMMdd,
    parseDateFromyyyyMMdd,
    localDateFormatDateToYYYYMMDD,
    imagePathFormateStringArray,
  };
};

export default utillFormat;
