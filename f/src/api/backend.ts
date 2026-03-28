import { BASE_URL } from './config';

export async function uploadPDF(file: any) {
  const formData = new FormData();

  formData.append('file', {
    uri: file.uri,
    type: 'application/pdf',
    name: 'score.pdf'
  } as any);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Upload failed');

  return res.json();
}

export async function startSession(fileId: string, delay: number) {
  const res = await fetch(`${BASE_URL}/session/start-piano`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, userDelay: delay })
  });

  if (!res.ok) throw new Error('Session failed');

  return res.json();
}

export async function stopSession() {
  await fetch(`${BASE_URL}/session/stop`, {
    method: 'POST'
  });
}
