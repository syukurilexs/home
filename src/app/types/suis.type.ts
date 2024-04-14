import { ActionType } from "./action.type";
import { CommonDeviceType } from "./common-device.type";

export type SuisType = CommonDeviceType & {
    action: ActionType[];
}
