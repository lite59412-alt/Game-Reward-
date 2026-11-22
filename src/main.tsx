import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Har tab/modal click par browser history mein state push karein
window.history.pushState({ page: 'home' }, '', window.location.href);

window.addEventListener('popstate', () => {
  // Pehle check karein agar koi modal/popup/back button screen par hai to use click karein
  const closeBtn = document.querySelector(
    '[aria-label="Close"], [data-close-modal="true"], button[title="Close"]'
  ) as HTMLElement | null;

  if (closeBtn) {
    closeBtn.click();
    window.history.pushState({ page: 'modal-closed' }, '', window.location.href);
    return;
  }

  // Agar koi screen-level "Back" button (jaise "Back to User List" ya "<- App") dikh raha hai
  const buttons = Array.from(document.querySelectorAll('button'));
  const backBtn = buttons.find(
    (btn) =>
      btn.textContent?.trim().startsWith('←') ||
      btn.textContent?.toLowerCase().includes('back to')
  );

  if (backBtn) {
    backBtn.click();
    window.history.pushState({ page: 'sub-back' }, '', window.location.href);
    return;
  }

  // App ko achanak band hone se rokne ke liye state wapas push karein
  window.history.pushState({ page: 'home' }, '', window.location.href);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
