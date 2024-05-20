import { GET_CATEGORY } from "../constant";

export const createCategoryAction = (cid) => ({
  type: GET_CATEGORY,
  cid
  // pageNum
});