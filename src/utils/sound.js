// Simple sound utility for tactile feedback

// Using a short, pleasant "pop" or "click" sound
// Base64 encoded short click sound for immediate use without external assets
const CLICK_SOUND_B64 = 'data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='; 

// Since we can't easily guarantee a nice sound file exists, let's use the Web Audio API 
// to generate a subtle synthetic "click" which is more reliable and customizable.
export const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (error) {
    console.error("Audio feedback failed:", error);
  }
};

