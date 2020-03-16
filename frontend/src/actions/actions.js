// Actions for Redux part of the page
import { INCREMENT, DECREASE, MAIN } from "./actionTypes";

export function incrementAction() {
  return {
    type: INCREMENT,
  };
}
export function decreaseAction() {
  return{
    type: DECREASE,
  };
}

export function mainAction() {
  return{
    type: MAIN,

  };
}