import {ITEMS_PER_PAGE} from '../App';

export const paginationIndexes = (sortedFullListLength: number): number[] => {
  const pageCountArray = [];
  const pageCount = Math.ceil(sortedFullListLength / ITEMS_PER_PAGE) + 1;
  for (let i = 1; i < pageCount; i++) {
    pageCountArray.push(i);
  }
  return pageCountArray;
};
