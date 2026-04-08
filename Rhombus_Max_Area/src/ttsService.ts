const TTS_PROXY_URL = '/api/tts';

export interface TtsResult {
  audioUrl: string;
  revoke: () => void;
}

let currentAudio: HTMLAudioElement | null = null;
let currentRevoke: (() => void) | null = null;

export function stopCurrentTts() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentRevoke) {
    currentRevoke();
    currentRevoke = null;
  }
}

export async function generateAndPlayTts(
  text: string,
  onTimeUpdate?: (currentTime: number, duration: number) => void,
  onEnded?: () => void
): Promise<HTMLAudioElement> {
  stopCurrentTts();

  const response = await fetch(TTS_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`TTS API error ${response.status}: ${errText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
  const audioUrl = URL.createObjectURL(blob);

  const revoke = () => URL.revokeObjectURL(audioUrl);
  currentRevoke = revoke;

  const audio = new Audio(audioUrl);
  currentAudio = audio;

  if (onTimeUpdate) {
    audio.addEventListener('timeupdate', () => {
      onTimeUpdate(audio.currentTime, audio.duration || 0);
    });
  }

  if (onEnded) {
    audio.addEventListener('ended', () => {
      onEnded();
      revoke();
      currentRevoke = null;
    });
  }

  await audio.play();
  return audio;
}
