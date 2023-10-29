import { Device } from './device.type';

export type SceneDto = {
  name: string;
  data: SceneData[];
};

export type SceneData = {
  status: boolean;
  device: Device;
};
