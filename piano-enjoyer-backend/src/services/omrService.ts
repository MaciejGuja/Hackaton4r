export interface Note {
    pitch: string;
    timestamp: number;
    duration: number;
}

export const parseSheetMusic = async (filePath: string): Promise<Note[]> => {
    console.log(`[OMR] Parsing file: ${filePath}`);

    return [
        { pitch: "C4", timestamp: 1000, duration: 500 },
        { pitch: "E4", timestamp: 1500, duration: 500 },
    ];
};