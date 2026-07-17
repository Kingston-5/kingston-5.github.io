import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/features/auth/authService";
import type { IUser } from "@/types";

// Get itesms from localStorage
const userItem = localStorage.getItem("user");
const user: IUser | null = userItem ? JSON.parse(userItem) : null;

/**
 * @type Redux state representing an user
 */
export type userState = {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

/**
 * @type Register state representind user data during processing
 */
export interface IRegisterInput {
  name: string;
  phone_number: string;
  role: string;
  email: string;
  password: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

/**
 * initial userState
 */
const initialState: userState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * register user function for "auth/register"
 *
 * @param user  - user
 * @param thunkAPI  - GetThunkAPI
 *
 * @returns Promise<any> | AsyncThunk<any, user, any>
 */
export const register = createAsyncThunk<
  {
    success: boolean;
    data: IUser;
    message?: string;
  },
  IRegisterInput,
  {
    rejectValue: {
      success: boolean;
      data: { error: string; message: string };
      message?: string;
    };
  }
>("auth/register", async (user, thunkAPI) => {
  try {
    const responseData = await authService.register(user); // response.data

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
 * login user function for "auth/login"
 *
 * @param user  - user
 * @param thunkAPI  - GetThunkAPI
 *
 * @returns Promise<any> | AsyncThunk<any, user, any>
 */
export const login = createAsyncThunk<
  {
    success: boolean;
    data: IUser;
    message?: string;
  },
  ILoginInput,
  {
    rejectValue: {
      success: boolean;
      data: { error: string; message: string };
      message?: string;
    };
  }
>("auth/login", async (user, thunkAPI) => {
  try {
    const responseData = await authService.login(user); // response.data

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
 * logout user function for "auth/logout"
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
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
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.data;
        state.message = action.payload?.message || "";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Registration failed";
        state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("ACTION: ", action);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload?.data;
        state.message = action.payload?.message || "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Login failed";
        state.user = null;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        
        state.message = "";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
