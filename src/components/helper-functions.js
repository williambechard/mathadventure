export const responsiveSize = (number, width, height) => {
  return number - ((height / width) * number) / 4;
};
