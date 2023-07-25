
export type Establishment = {
    id: string | null
    establishment_name: string
    location: GeoPoint
    status: "LOW" | "MODERATE" | "EXTREME" | "IDLE" | "OFFLINE"
}

export type GeoPoint = {
    latitude: number,
    longitude: number
}


export type Sensor = {
    id: string,
    zone: number,
    floor: number,
    flame: boolean,
    smoke: number,
    timestamp: number,
    description: string,
    status: "LOW" | "MODERATE" | "EXTREME" | "IDLE" | "OFFLINE",
}