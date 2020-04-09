export const GET_SWATCH_LIST = "GET_SWATCH_LIST";
export const GET_SWATCH = "GET_SWATCH";
export const CLEAR_CURRENT_SWATCH = "CLEAR_CURRENT_SWATCH";


export function GetSwatchListAction() { return { type: GET_SWATCH_LIST } };
export function GetSwatchAction(fileName) { return { type: GET_SWATCH, payload: fileName } };
export function ClearCurrentSwatchAction(fileName) { return { type: CLEAR_CURRENT_SWATCH, payload: fileName } };
