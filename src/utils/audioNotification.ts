let globalAudio: HTMLAudioElement | null = null;
let isAudioUnlocked = false;
let testButtonRef: HTMLButtonElement | null = null;

export const setAudioTestButtonRef = (buttonRef: HTMLButtonElement | null) => {
  testButtonRef = buttonRef;
};

const getAudioFilePath = (): string => {
  if (typeof window === "undefined") {
    console.log("🔍 Window is undefined, using default audio");
    return "/sounds/order-notification.mp3";
  }

  const { pathname } = window.location;
  console.log("🔍 Current pathname:", pathname);

  if (pathname.includes("/hall")) {
    console.log("🎵 Using order-notification.mp3 for hall");
    return "/sounds/order-notification.mp3";
  }
  if (pathname.includes("/waiting")) {
    console.log("🎵 Using waiting-notification.mp3 for waiting");
    return "/sounds/waiting-notification.mp3";
  }

  console.log("🎵 Using default order-notification.mp3");
  return "/sounds/order-notification.mp3";
};

export const unlockAudio = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  const audioPath = getAudioFilePath();
  console.log("🔓 Preparing audio with path:", audioPath);

  // 항상 새로운 오디오 객체 생성 (경로 변경 대응)
  globalAudio = new Audio(audioPath);
  globalAudio.volume = 1.0; // 바로 정상 볼륨으로 설정
  globalAudio.preload = "auto";

  // unlock을 위한 실제 재생은 playAudioDirectly에서 처리
  console.log("✅ Audio prepared with:", audioPath);
};

export const resetAudio = (): void => {
  globalAudio = null;
  isAudioUnlocked = false;
};

export const playNotificationSound = async (): Promise<void> => {
  if (testButtonRef) {
    testButtonRef.click();
    return;
  }

  if (
    globalAudio &&
    globalAudio.src !== window.location.origin + getAudioFilePath()
  ) {
    resetAudio();
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
  try {
    // 항상 새로운 오디오 준비
    await unlockAudio();

    if (globalAudio) {
      if (!isAudioUnlocked) {
        // 첫 번째 클릭: unlock을 위한 재생
        console.log("🔓 First click - unlocking audio");
        await globalAudio.play();
        globalAudio.pause();
        globalAudio.currentTime = 0;
        isAudioUnlocked = true;
        console.log("✅ Audio unlocked - ready for notifications!");
      } else {
        // 두 번째 클릭부터: 실제 소리 재생
        console.log("🔊 Playing audio notification");
        globalAudio.currentTime = 0;
        await globalAudio.play();
        console.log("✅ Audio played successfully!");
      }
    }
  } catch (error) {
    console.log("❌ Audio playback failed:", error);
  }
};
