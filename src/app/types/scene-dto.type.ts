import { Action, DeviceOld } from './device-old.type';

export type SceneDto = {
  name: string;
  data: SceneData[];
  actions: Number[];
};

export type SceneData = {
  status: boolean;
  device: DeviceOld;
};
