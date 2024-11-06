import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseApi";
import { tagTypes } from "./tags";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQuery,
  tagTypes: [tagTypes.TASK],

  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ limit, offset }) => `tasks/all?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Task",
                id,
              })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),

    getUserTask: builder.query({
      query: () => ({
        url: "tasks/my-tasks", // Assuming it automatically filters by logged-in user
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Task",
                id,
              })),
              { type: "Task", id: "USER_TASKS" },
            ]
          : [{ type: "Task", id: "USER_TASKS" }],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: "tasks/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: "tasks/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, _error, { id }) => [{ type: "Task", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetUserTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
