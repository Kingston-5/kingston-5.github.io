export interface IUser {
  _id: string;
  tenantId: string; // Tenant reference
  email: string;
  password?: string; // Optional if using OAuth
  name: string;
  role: string;
  provider: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>; // Flexible extension field
}
