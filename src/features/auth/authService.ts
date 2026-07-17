import axios from "axios";
import type { IRegisterInput, ILoginInput } from "@/features/auth/authSlice";
/** NOTE(06/01/25): please enseure module is set to "es2020" in compilerOptions,
 *  else : error TS1343
 *  - qhawe
 */
const API_URL: string =
  import.meta.env.VITE_AUTH_URL || "https://auth.ke-service.space/";
const TENANT_ID: string =
  import.meta.env.VITE_TENANT_ID || "690f857e551bc01902ba6e70";
axios.defaults.headers.common["x-tenant-id"] = TENANT_ID;

/**
 * Registers a new User
 *
 * @param {User} UserData - Users reistration details .
 * @returns {JSON} The
 */
const register = async (UserData: IRegisterInput | void) => {
  const response = await axios.post(API_URL + "v0/auth/register", UserData);
  console.log("REGISTER RES:", response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  return response.data;
};

/**
 * log in a User
 *
 * @param {User} UserData - Users login details .
 * @returns {JSON} The Http response
 */
const login = async (UserData: ILoginInput | void) => {
  const response = await axios.post(API_URL + "v0/auth/login", UserData, {
    withCredentials: true,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  console.log("SERVICE RES:", response);
  return response.data;
};

/**
 * logout User - by destroying localstorage item
 *
 * @returns {void}
 */
const logout = () => {
  console.log("LOGOUT SERVICE");

  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
