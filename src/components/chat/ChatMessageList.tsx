"use client";

import {useEffect, useRef} from "react";

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type Props = {
  assistantLabel: string;
  isTyping: boolean;
  messages: ChatMessage[];
  typingLabel: string;
  userLabel: string;
};

export function ChatMessageList({
  assistantLabel,
  isTyping,
  messages,
  typingLabel,
  userLabel
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;

    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div
      ref={listRef}
      className="gm-chat-messages"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {messages.map((message) => {
        const isAssistant = message.role === "assistant";
        const speaker = isAssistant ? assistantLabel : userLabel;

        return (
          <div
            className={`gm-chat-message gm-chat-message--${message.role}`}
            key={message.id}
          >
            {isAssistant ? (
              <span className="gm-chat-panel__avatar" aria-hidden="true">
                GM
              </span>
            ) : null}

            <div className="gm-chat-message__bubble">
              <span className="gm-chat-sr-only">{speaker}: </span>
              <p>{message.text}</p>
            </div>
          </div>
        );
      })}

      {isTyping ? (
        <div
          className="gm-chat-message gm-chat-message--assistant"
          aria-label={typingLabel}
        >
          <span className="gm-chat-panel__avatar" aria-hidden="true">
            GM
          </span>
          <div className="gm-chat-message__bubble gm-chat-message__bubble--typing">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
