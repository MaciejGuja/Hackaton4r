import { Note, KeyboardCoord } from '../store/useStore';

const BASE_URL = 'http://YOUR_BACKEND';

export async function uploadPDF(file: { uri: string; name: string; type: string }) {
  try {
    const body = new FormData();
    body.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);

    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`Backend uploadPDF error: ${res.status}`);
    }

    const data = await res.json();
    return data as { notes: Note[] };
  } catch (error) {
    console.warn('uploadPDF failed', error);
    // Fallback sample data to keep UI flow
    return {
      notes: [
        { pitch: 'C4', time: 1 },
        { pitch: 'E4', time: 2.2 },
        { pitch: 'G4', time: 3.5 },
      ],
    };
  }
}

export async function getFishjamToken() {
  const res = await fetch(`${BASE_URL}/token`);
  return res.json();
}

export async function sendFrameToAI(frame: string) {
  try {
    const res = await fetch(`${BASE_URL}/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frame }),
    });

    if (!res.ok) {
      throw new Error(`sendFrameToAI error: ${res.status}`);
    }

    const data = await res.json();

    return data as { coords: KeyboardCoord[] };
  } catch (error) {
    console.warn('sendFrameToAI failed, returning sample coords', error);
    return {
      coords: [
        { x: 60, y: 90, width: 40, height: 100, pitch: 'C4' },
        { x: 108, y: 90, width: 36, height: 100, pitch: 'D4' },
      ],
    };
  }
}
