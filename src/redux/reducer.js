const { combineReducers } = require("@reduxjs/toolkit");
const { emptySplitApi } = require("./api/apislice");

export const reducer = combineReducers({
    [emptySplitApi.reducerPath]: emptySplitApi.reducer
})