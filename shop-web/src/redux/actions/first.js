import { ISFIRST,NOFIRST } from "../constant";

export const isFirst = () => ({
    type: ISFIRST,
});

export const noFirst = () => ({
    type: NOFIRST,
});