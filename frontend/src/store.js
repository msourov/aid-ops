import { configureStore } from "@reduxjs/toolkit";
// import { userApi } from "./api/userSlice";
import { donationApi } from "./api/donationSlice";
import { crisisApi } from "./api/crisisSlice";
import { taskApi } from "./api/taskSlice";
import { financialApi } from "./api/financialsSlice.js";
import { userApi } from "./api/userSlice.js";
import { volunteerApi } from "./api/volunteerSlice.js";
import { inventoryApi } from "./api/inventorySlice.js";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [donationApi.reducerPath]: donationApi.reducer,
    [crisisApi.reducerPath]: crisisApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [financialApi.reducerPath]: financialApi.reducer,
    [volunteerApi.reducerPath]: volunteerApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      donationApi.middleware,
      crisisApi.middleware,
      taskApi.middleware,
      financialApi.middleware,
      inventoryApi.middleware,
      volunteerApi.middleware
    ),
});

export default store;
