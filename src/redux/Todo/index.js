import { emptySplitApi } from "../api/apislice";

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getTodo: build.query({
      query: (query) => {
        return `/todos?_start=${query.start}&_limit=${query.limit}}`;
      },
    }),
    postTodo: build.mutation({
      query: (title) => ({
        url: `/todos`,
        method: "POST",
        body: {
          title: title,
        },
      }),
    }),
    updateTodo: build.mutation({
      query: (data) => ({
        url: `/todos/${data.id}`,
        method: "PATCH",
        body: {
          completed: data.completed,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetTodoQuery, usePostTodoMutation, useUpdateTodoMutation } = extendedApi;
