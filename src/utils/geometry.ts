import { IPoint } from "./types";



export function distanceBetweenPoints(point1: IPoint, point2: IPoint): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy)
}