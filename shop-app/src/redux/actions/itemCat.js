import { GET_ITEMCAT } from "../constant";

export const createItemCatAction = (cid) => ({
  type: GET_ITEMCAT,
  cid
});