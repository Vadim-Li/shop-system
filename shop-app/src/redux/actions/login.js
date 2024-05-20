import { VERIFY_USER } from "../constant";

export const createVerifyAction = (username, password) => ({
  type: VERIFY_USER,
  username,
  password
});
