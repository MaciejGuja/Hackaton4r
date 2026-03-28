export interface Note {
    pitch: string;
    timestamp: number;
    duration: number;
}

export interface SyncConfig {
    userDelay: number;
    roomId: string;
}