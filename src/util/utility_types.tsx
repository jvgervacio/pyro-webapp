import { GeoPoint } from "@firebase/firestore-types";
export type Establishment = {
    id: string
    location: GeoPoint
    status: number
}