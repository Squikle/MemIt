import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.ts";

export default function () {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware(),
  });
}
