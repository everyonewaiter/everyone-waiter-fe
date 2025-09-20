let globalAudio: HTMLAudioElement | null = null;
let isAudioUnlocked = false;
let testButtonRef: HTMLButtonElement | null = null;

export const setAudioTestButtonRef = (buttonRef: HTMLButtonElement | null) => {
  testButtonRef = buttonRef;
};

export const unlockAudio = async (): Promise<void> => {
  if (isAudioUnlocked || typeof window === "undefined") return;

  if (!globalAudio) {
    globalAudio = new Audio("/sounds/order-notification.mp3");
    globalAudio.volume = 0;
    globalAudio.preload = "auto";
  }

  await globalAudio.play();
  globalAudio.pause();
  globalAudio.currentTime = 0;

  globalAudio.volume = 1.0;
  isAudioUnlocked = true;
};

export const playNotificationSound = async (): Promise<void> => {
  if (testButtonRef) {
    testButtonRef.click();
    return;
  }

  if (!globalAudio || !isAudioUnlocked) return;

  try {
    globalAudio.currentTime = 0;
    await globalAudio.play();
  } catch (error) {
    isAudioUnlocked = false;
  }
};

export const playAudioDirectly = async (): Promise<void> => {
  if (!globalAudio || !isAudioUnlocked) {
    await unlockAudio();
    return;
  }

  if (globalAudio && isAudioUnlocked) {
    globalAudio.currentTime = 0;
    await globalAudio.play();
  }
};
