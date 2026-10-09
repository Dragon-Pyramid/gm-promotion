"use client";

import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";

import {ChatComposer} from "./ChatComposer";
import {
  ChatMessageList,
  type ChatMessage
} from "./ChatMessageList";

type Props = {
  closeLabel: string;
  eyebrow: string;
  headingId: string;
  commercialIntent: boolean;
  isDemo: boolean;
  isTyping: boolean;
  messages: ChatMessage[];
  panelId: string;
  title: string;
  welcomeText: string;
  onClose: () => void;
  onDemoAction: () => void;
  onSend: (message: string) => void;
  onSuggestion: (message: string) => void;
};

export function ChatPanel({
  closeLabel,
  eyebrow,
  headingId,
  commercialIntent,
  isDemo,
  isTyping,
  messages,
  panelId,
  title,
  welcomeText,
  onClose,
  onDemoAction,
  onSend,
  onSuggestion
}: Props) {
  const t = useTranslations("Chat");
  const visibleMessages: ChatMessage[] = [
    {
      id: "welcome",
      role: "assistant",
      text: welcomeText
    },
    ...messages
  ];

  const suggestions = [
    t("suggestions.members"),
    t("suggestions.operations"),
    t("suggestions.training")
  ];

  return (
    <section
      id={panelId}
      className="gm-chat-panel"
      role="region"
      aria-labelledby={headingId}
    >
      <div className="gm-chat-panel__ambient" aria-hidden="true" />

      <header className="gm-chat-panel__header">
        <div className="gm-chat-panel__identity">
          <span className="gm-chat-panel__mark" aria-hidden="true">
            GM
          </span>
          <div>
            <p>{eyebrow}</p>
            <h2 id={headingId}>{title}</h2>
          </div>
        </div>

        <button
          type="button"
          className="gm-chat-panel__close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="m5.5 5.5 9 9m0-9-9 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div className="gm-chat-panel__content">
        <ChatMessageList
          assistantLabel={t("assistantLabel")}
          userLabel={t("userLabel")}
          typingLabel={t("typing")}
          messages={visibleMessages}
          isTyping={isTyping}
        />

        <footer className="gm-chat-panel__footer">
          <div
            className="gm-chat-suggestions"
            aria-label={t("suggestionsLabel")}
          >
            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => onSuggestion(suggestion)}
                disabled={isTyping}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="gm-chat-panel__commercial">
            {isDemo ? (
              <button
                type="button"
                className="gm-chat-panel__demo-action"
                onClick={onDemoAction}
              >
                <span>{commercialIntent ? t("cta.contactForm") : t("cta.goToForm")}</span>
                <i aria-hidden="true">↓</i>
              </button>
            ) : (
              <Link
                className="gm-chat-panel__demo-action"
                href="/demo"
                onClick={onClose}
              >
                <span>{commercialIntent ? t("cta.salesRequest") : t("cta.requestDemo")}</span>
                <i aria-hidden="true">↗</i>
              </Link>
            )}
          </div>

          <ChatComposer
            disabled={isTyping}
            placeholder={t("composer.placeholder")}
            sendLabel={t("composer.send")}
            onSend={onSend}
          />

          <p className="gm-chat-panel__preview-note">
            {t("previewNote")}
          </p>
        </footer>
      </div>
    </section>
  );
}
