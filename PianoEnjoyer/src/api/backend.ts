import { KeyboardCoord } from '../store/useStore';
import { BASE_URL } from './config';

export async function uploadPDF(file: any) {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: 'application/pdf',
    name: 'score.pdf',
  } as any);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!res.ok) {
    throw new Error(`uploadPDF failed: ${res.status}`);
  }

  return res.json(); // { fileId }
}

export async function startSession(fileId: string, delay: number) {
  const res = await fetch(`${BASE_URL}/session/start-piano`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, userDelay: delay }),
  });

  if (!res.ok) {
    throw new Error(`startSession failed: ${res.status}`);
  }

  return res.json(); // fishjam + notesCount + roomId
}

export async function stopSession() {
  await fetch(`${BASE_URL}/session/stop`, {
    method: 'POST',
  });
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
