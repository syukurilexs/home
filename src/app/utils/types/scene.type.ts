import { State } from '../enums/state.enum';
import { Device } from './device.type';

export type Scene = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  sceneDevice: SceneDevice[];
};

export type SceneDevice = {
  sceneId: number;
  deviceId: number;
  state: State;
  createdAt: string;
  updatedAt: string;
  device: Device;
};
