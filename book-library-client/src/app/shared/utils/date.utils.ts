
export const DateUtil = {

  dateToString(date: Date = new Date()) {
    const month = date.getMonth() + 1;
    let strDate =  date.getFullYear()
      + '-' +  (month < 10 ? ('0'+ month) : month)
      + '-' + (date.getDate() < 10 ? ('0'+ date.getDate()) : date.getDate());
    return strDate;
  },
};
