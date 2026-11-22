import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App as CapacitorApp } from '@capacitor/app';
import App from './App.tsx';
import './index.css';

// Android Back Button Handling
let lastBackPress = 0;

CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  // 1. Pehle check karein ki koi modal ya popup khula hai to uska close button click ho jaye
  const closeBtn = document.querySelector(
    '[aria-label="Close"], [data-close-modal="true"], button[title="Close"]'
  ) as HTMLElement | null;

  if (closeBtn) {
    closeBtn.click();
    return;
  }

  // 2. Agar browser history mein piche jane ka page hai to piche jaye
  if (canGoBack || window.history.length > 1) {
    window.history.back();
    return;
  }

  // 3. Home screen par double-press back se hi app exit ho
  const now = Date.now();
  if (now - lastBackPress < 2000) {
    CapacitorApp.exitApp();
  } else {
    lastBackPress = now;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
