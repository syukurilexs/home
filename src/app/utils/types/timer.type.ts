import { Option } from '../enums/option.enum';
import { State } from '../enums/state.enum';

export type CreateTimer = {
  deviceId: number;
  time: string;
  state: State;
  option: Option;
};

export type Timer = {
  id: number;
  time: string;
  state: State;
  option: Option;
};
