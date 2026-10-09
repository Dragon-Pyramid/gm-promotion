"use client";

import {FormEvent, KeyboardEvent, useRef, useState} from "react";

type Props = {
  disabled?: boolean;
  placeholder: string;
  sendLabel: string;
  onSend: (message: string) => void;
};

export function ChatComposer({
  disabled = false,
  placeholder,
  sendLabel,
  onSend
}: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, 96);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > 96 ? "auto" : "hidden";
  }

  function submitMessage() {
    const message = value.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);
    setValue("");

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "30px";
      textarea.style.overflowY = "hidden";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  }

  return (
    <form className="gm-chat-composer" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="gm-chat-composer__input"
        rows={1}
        maxLength={600}
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => {
          setValue(event.target.value);
          resizeTextarea(event.currentTarget);
        }}
        onKeyDown={handleKeyDown}
      />

      <button
        type="submit"
        className="gm-chat-composer__send"
        aria-label={sendLabel}
        disabled={disabled || !value.trim()}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="m4 10 11-5-3.6 10-2.1-3.2L4 10Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinejoin="round"
          />
          <path
            d="m9.3 11.8 2.7-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}
