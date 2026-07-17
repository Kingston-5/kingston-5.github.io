import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import deviceReducer from "@/features/devices/deviceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    devices: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
