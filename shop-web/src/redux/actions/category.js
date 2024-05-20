import { GET_CATEGORY } from "../constant";

export const createCategoryAction = (cid, pageNum) => ({
  type: GET_CATEGORY,
  cid,
  pageNum
});