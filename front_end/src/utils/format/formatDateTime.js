export const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split('T');
    const formattedTime = time.split('.')[0];
    const formattedDateTime = `${date} | ${formattedTime}`;
    return formattedDateTime;
}