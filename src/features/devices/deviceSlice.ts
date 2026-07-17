import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import deviceService from "@/features/devices/deviceService";
import type { IDevice } from "@/types";

export type deviceState = {
  devices: any;//IDevice[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

export interface IDeviceInput {
name?: string;
  userId?: string;
}
const initialState: deviceState = {
  devices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

interface ServerResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
/**
 * create a new Device
 *
 * /
 */
export const createDevice = createAsyncThunk<
  ServerResponse<IDevice>,
  IDeviceInput,
  { rejectValue: ServerResponse<{ error: string; message: string }> }
>("devices/createDevice", async (device, thunkAPI) => {
  try {
    const responseData = await deviceService.createDevice(device); // response.data

    // Soft API error returned by backend
    if (!responseData.success) {
      return thunkAPI.rejectWithValue({
        success: false,
        data: responseData.data, // { error, message }
        message: responseData.message,
      });
    }

    // Success case
    return responseData;
  } catch (_error: unknown) {
    // Hard error: network/server/unknown
    return thunkAPI.rejectWithValue({
      success: false,
      data: {
        error: "HardError",
        message: "A network or server error occurred",
      },
      message: "A network or server error occurred",
    });
  }
});

/**
 * get devices by user ID
 *
 */
export const getDevicesByUserId = createAsyncThunk<
  ServerResponse<IDevice>,
  string,
  { rejectValue: ServerResponse<{ error: string; message: string }> }
>("devices/getDevicesByUserId", async (userId, thunkAPI) => {
  try {
    const responseData = await deviceService.getDevicesByUserId(userId); // response.data

    // Soft API error returned by backend
    if (!responseData.success) {
      return thunkAPI.rejectWithValue({
        success: false,
        data: responseData.data, // { error, message }
        message: responseData.message,
      });
    }

    // Success case
    return responseData;
  } catch (_error: unknown) {
    // Hard error: network/server/unknown
    return thunkAPI.rejectWithValue({
      success: false,
      data: {
        error: "HardError",
        message: "A network or server error occurred",
      },
      message: "A network or server error occurred",
    });
  }
});

export const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // create Device
      .addCase(createDevice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDevice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.devices?.push(action.payload?.data);
        state.message = action.payload?.message || "";
      })
      .addCase(createDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Create Device failed";
      })
      // get Devices By ID
      .addCase(getDevicesByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDevicesByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("RECEIVED DEVICES:", action.payload.data);
        state.devices = action.payload?.data;
        state.message = action.payload?.message || "";
      })
      .addCase(getDevicesByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Create Device failed";
      });
  },
});

export const { reset } = deviceSlice.actions;
export default deviceSlice.reducer;
