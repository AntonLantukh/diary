export const getDefaultDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = Number(date.getMonth()) + 1;
    const fromattedMonth = month < 10 ? `0${month}` : month;
    const day = date.getDate();

    return `${year}-${fromattedMonth}-${day}`;
};
