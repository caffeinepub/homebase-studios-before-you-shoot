import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactInformation {
    mail: string;
    address: string;
    phone: string;
}
export interface BookingInformation {
    text: string;
}
export interface backendInterface {
    getBookingInformation(): Promise<BookingInformation>;
    getContactInformation(): Promise<ContactInformation>;
}
