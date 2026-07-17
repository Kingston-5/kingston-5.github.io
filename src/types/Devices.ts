export interface IDevice {
_id: string;
  name: string;
  userId: string; // The owner (farmer)
  status: "online" | "offline" | "error";
  sensors: ISensor[];
  pumps: IPump[];
  lastSeen?: Date;
}

export interface ISensor {
_id: string;
  device: string;
  name: string;
  type: "temperature" | "humidity" | "soil_moisture" | "ph" | "custom";
  pin?: number;
  unit?: string; // e.g., "°C", "%"
  value?: number;
  lastUpdated?: Date;
}

export interface IPump extends Document {
_id: string;
  device: string;
  name: string;
  pin?: number;
  status: "on" | "off";
  lastToggled?: Date;
}
