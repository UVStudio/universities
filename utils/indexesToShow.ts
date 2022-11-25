//determines which pagination indexes to show on screen
//mimicking google.com's behaviour
export const indexesToShow = (selectedPage: number, paginList: number[]) => {
  const indexesToShowArray = [];
  if (selectedPage < 8) {
    for (let i = 1; i < 11; i++) {
      indexesToShowArray.push(i);
    }
  } else {
    for (
      let i = selectedPage - 4;
      i < Math.min(selectedPage + 6, paginList.length + 1);
      i++
    ) {
      indexesToShowArray.push(i);
    }
  }
  return indexesToShowArray;
};
