import { Recording } from "./recordings";

export interface Meeting {
    idmeeting: number;
    brand: string;
    model: string;
    plate: string;
    date_meeting: string;
    active: boolean;
    recordings?: Recording[]
}