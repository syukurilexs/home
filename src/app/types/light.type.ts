import { ActionType } from "./action.type";
import { CommonDeviceType } from "./common-device.type";

export type LightType = CommonDeviceType & {
    selectedAction: ActionType[];
}