import { GeoPoint } from "@firebase/firestore-types";
export type Establishment = {
    id: string
    location: GeoPoint
    status: number
}

export type Sensor = {
    alert_level: number,
    flame_sensor: boolean,
    smoke_sensor: number,
    triggered: boolean,
    zone: number,
    floor: number,
    description: string,
}