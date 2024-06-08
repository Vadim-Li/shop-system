import {ISERROR} from '../constant'

export const createError = (data) =>({
  type: ISERROR,
  data:data
});
