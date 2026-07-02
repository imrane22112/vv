@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --animate-shimmer: shimmer 2s infinite linear;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
}

/* Custom scrollbar behaviors */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0f0f0f;
}

::-webkit-scrollbar-thumb {
  background: #272727;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3f3f3f;
}

/* YouTube style Custom Range Slider */
.yt-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  outline: none;
  transition: height 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.yt-slider:hover {
  height: 6px;
}

/* Webkit browser slider thumb styling */
.yt-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ef4444; /* Bright Red */
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.yt-slider:hover::-webkit-slider-thumb,
.yt-slider:active::-webkit-slider-thumb,
.yt-slider:focus-within::-webkit-slider-thumb {
  transform: scale(1);
}

.yt-slider::-webkit-slider-runnable-track {
  background: transparent;
  border: none;
}

/* Firefox browser slider thumb styling */
.yt-slider::-moz-range-thumb {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #ef4444;
  border: none;
  cursor: pointer;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

.yt-slider:hover::-moz-range-thumb,
.yt-slider:active::-moz-range-thumb,
.yt-slider:focus-within::-moz-range-thumb {
  transform: scale(1);
}

.yt-slider::-moz-range-track {
  background: transparent;
  border: none;
}

