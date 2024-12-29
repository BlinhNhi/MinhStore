export const getCodeProduct = (value) => {
    const getCode = value?.split("-")[0] + value?.split("-")[1];
    return getCode;
}