import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import Cookies from "js-cookie";
const initialState = {
  counterValue: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.counterValue += 1;
      Cookies.set("counterValue", state.counterValue);
    },
    decrementCounter: (state) => {
      state.counterValue -= 1;
      Cookies.set("counterValue", state.counterValue);
    },
    addInCounter: (state, action) => {
      state.counterValue += action.payload;
      Cookies.set("counterValue", state.counterValue);
    },
    setCounterValue: (state, action) => {
      state.counterValue = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.counter.counterValue) {
        return state;
      }

      state.counterValue = action.payload.counter.counterValue;
    },
  },
});
export const counterActions = counterSlice.actions;

export const selectCounter = (state) => state.counter;

export default counterSlice.reducer;
