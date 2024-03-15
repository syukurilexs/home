import { DeviceType } from '../enums/device-type.enum';
import { State } from '../enums/state.enum';

export type Device = {
  remark: string;
  id: number;
  name: string;
  type: DeviceType;
  state: State;
  topic: string;
  createdAt: string;
  updatedAt: string;
  suis?: Suis;
  deviceAction: DeviceAction[];
  action?: Action[];
  timers?: Timer[];
  selectedAction: SelectedAction[];
};

export type Suis = {
  id: number;
  name: string;
  type: number;
  state: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
};

export type DeviceAction = {
  id: number;
  name: string;
  type: number;
  state: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
};

export type Action = {
  id?: number;
  key: string;
  value: string;
  device?: Device;
};

export type Timer = {
  id: number;
  state: string;
  option: string;
  time: string;
};

export interface SelectedAction {
  id: number;
  createdAt: string;
  updatedAt: string;
  action: SelectedActionAction;
}

export interface SelectedActionAction {
  id: number
  key: string
  value: string
  device: DeviceSuis
}

export interface DeviceSuis {
  id: number
  name: string
  type: number
  state: string
  topic: string
  createdAt: string
  updatedAt: string
}