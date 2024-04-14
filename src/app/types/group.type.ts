import { DeviceOld } from './device-old.type';

export type GroupType = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  devices: DeviceOld[];
};
