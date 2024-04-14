import { CommonDeviceType } from "./common-device.type";

export type ContactType = CommonDeviceType & {
    key: string;
}