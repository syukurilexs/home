import { Action, Device } from './device.type';

export type SceneDto = {
  name: string;
  data: SceneData[];
  actions: Number[];
};

export type SceneData = {
  status: boolean;
  device: Device;
};
