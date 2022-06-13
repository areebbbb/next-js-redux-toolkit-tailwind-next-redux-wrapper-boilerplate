import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import counterReducer from "./feature/CounterSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
export const wrapper = createWrapper(makeStore);
