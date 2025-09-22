const getAudioFilePath = (): string => {
  const { pathname } = window.location;

  if (pathname.includes("/hall")) {
    return "/sounds/order-notification.mp3";
  }
  if (pathname.includes("/waiting")) {
    return "/sounds/waiting-notification.mp3";
  }

  return "/sounds/order-notification.mp3";
};

export const playNotificationSound = async (): Promise<void> => {
  try {
    const audioPath = getAudioFilePath();

    const audio = new Audio(audioPath);
    audio.volume = 0.8;
    await audio.play();
  } catch (error) {
    // 진동으로 대체
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }
};
