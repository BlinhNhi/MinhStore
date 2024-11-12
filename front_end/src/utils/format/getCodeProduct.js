export const getCodeProduct = (value) => {
    const getCode = value?.split("-")[0];
    return getCode;
}