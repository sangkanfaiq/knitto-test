import { emptySplitApi } from "./api/apislice";
import { reducer } from "./reducer";

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(emptySplitApi.middleware)
})