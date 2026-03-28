export interface KeyCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const KEY_MAP: Record<string, KeyCoordinates> = {
    "C4": { x: 0.1, y: 0.8, width: 0.05, height: 0.2 },
    "D4": { x: 0.15, y: 0.8, width: 0.05, height: 0.2 },
};