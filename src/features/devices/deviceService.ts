import axios from "axios";
import type { IDeviceInput } from "@/features/devices/deviceSlice";
/** NOTE(06/01/25): please enseure module is set to "es2020" in compilerOptions,
 *  else : error TS1343
 *  - qhawe
 */
const API_URL: string =
  import.meta.env.VITE_KWAKHANYA_BACKEND_URL || "http://localhost:5005/";
const TENANT_ID: string =
  import.meta.env.VITE_TENANT_ID || "690f857e551bc01902ba6e70";
axios.defaults.headers.common["x-tenant-id"] = TENANT_ID;
/**
 * Create a new Device
 *
 * @param {IDevice} DeviceData - Device creation details .
 * @returns {JSON} The Http response
 */
const createDevice = async (DeviceData: IDeviceInput | void) => {
  const response = await axios.post(API_URL + "v1/devices/device", DeviceData);

  return response.data;
};

/** Get List Of Devices By User ID
 *
 * @param {string} userId - user ID
 * @returns {JSON} the Http response
 */
const getDevicesByUserId = async (userId: string) => {
  const response = await axios.get(
    API_URL + `v1/devices/device?userId=${userId}`
  );

  return response.data;
};

const deviceService = {
  createDevice,
  getDevicesByUserId,
};

export default deviceService;
