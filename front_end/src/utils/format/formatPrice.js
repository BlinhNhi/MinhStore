export const handleFormatPrice = (values) => {
    const formattedNumber = Intl.NumberFormat().format(values);
    return formattedNumber;

}