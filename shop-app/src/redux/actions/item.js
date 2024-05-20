import { GET_ITEM } from "../constant";

export const createItemAction = (id) => ({
  type: GET_ITEM,
  id
});