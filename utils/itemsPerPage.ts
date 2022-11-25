import {ITEMS_PER_PAGE, IUniversity} from '../App';

export const itemPerPage = (
  selectedPage: number,
  sortedFullList: IUniversity[],
) => {
  const pageListing = [];
  const indexStart = selectedPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  for (
    let i = indexStart;
    i < Math.min(indexStart + ITEMS_PER_PAGE, sortedFullList.length);
    i++
  ) {
    pageListing.push(sortedFullList[i]);
  }
  return pageListing;
};
