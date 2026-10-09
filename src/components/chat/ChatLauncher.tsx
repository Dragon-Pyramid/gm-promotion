"use client";

import {forwardRef} from "react";

type Props = {
  controlsId: string;
  isOpen: boolean;
  label: string;
  onClick: () => void;
};

export const ChatLauncher = forwardRef<HTMLButtonElement, Props>(
  function ChatLauncher(
    {controlsId, isOpen, label, onClick},
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className="gm-chat-launcher"
        aria-label={label}
        aria-controls={controlsId}
        aria-expanded={isOpen}
        onClick={onClick}
      >
        <span className="gm-chat-launcher__halo" aria-hidden="true" />
        <svg
          className="gm-chat-launcher__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M6.8 5.5h10.4A2.8 2.8 0 0 1 20 8.3v5.4a2.8 2.8 0 0 1-2.8 2.8h-5.6L7.3 20v-3.5h-.5A2.8 2.8 0 0 1 4 13.7V8.3a2.8 2.8 0 0 1 2.8-2.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
          <path
            d="M8 10h8M8 13h5.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
          />
        </svg>
        <span className="gm-chat-launcher__label">{label}</span>
      </button>
    );
  }
);
