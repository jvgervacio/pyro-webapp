
export type Establishment = {
    id: string | null
    establishment_name: string
    location: GeoPoint
    status: "LOW" | "MEDIUM" | "HIGH" | "IDLE"
}

export type GeoPoint = {
    latitude: number,
    longitude: number
}


export type Sensor = {
    alert_level: "LOW" | "MEDIUM" | "HIGH" | "IDLE",
    flame_sensor: boolean,
    smoke_sensor: number,
    triggered: boolean,
    zone: number,
    floor: number,
    description: string,
}