"use client";

import {useEffect, useId, useRef, useState} from "react";
import {useTranslations} from "next-intl";

import {usePathname} from "@/i18n/navigation";

import {ChatLauncher} from "./ChatLauncher";
import {type ChatMessage} from "./ChatMessageList";
import {ChatPanel} from "./ChatPanel";

export function ChatAssistant() {
  const t = useTranslations("Chat");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const replyTimerRef = useRef<number | null>(null);
  const messageSequenceRef = useRef(0);
  const panelId = useId();
  const headingId = `${panelId}-heading`;
  const isDemo = pathname === "/demo" || pathname.endsWith("/demo");

  function nextMessageId(role: ChatMessage["role"]) {
    messageSequenceRef.current += 1;
    return `${role}-${messageSequenceRef.current}`;
  }

  function closePanel({restoreFocus = true} = {}) {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => launcherRef.current?.focus());
    }
  }

  function handleSend(message: string) {
    const trimmed = message.trim();

    if (!trimmed || isTyping) {
      return;
    }

    const mockReply = t("mockReply");

    setMessages((current) => [
      ...current,
      {
        id: nextMessageId("user"),
        role: "user",
        text: trimmed
      }
    ]);
    setIsTyping(true);

    if (replyTimerRef.current !== null) {
      window.clearTimeout(replyTimerRef.current);
    }

    replyTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId("assistant"),
          role: "assistant",
          text: mockReply
        }
      ]);
      setIsTyping(false);
      replyTimerRef.current = null;
    }, 420);
  }

  function handleDemoAction() {
    closePanel({restoreFocus: false});

    window.requestAnimationFrame(() => {
      const form = document.querySelector<HTMLElement>(".gm-demo-form");

      if (!form) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      form.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        window.requestAnimationFrame(() => launcherRef.current?.focus());
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current !== null) {
        window.clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="gm-chat-assistant" data-open={isOpen ? "true" : "false"}>
      {isOpen ? (
        <ChatPanel
          panelId={panelId}
          headingId={headingId}
          eyebrow={t("eyebrow")}
          title={t("title")}
          welcomeText={isDemo ? t("welcome.demo") : t("welcome.landing")}
          closeLabel={t("close")}
          messages={messages}
          isTyping={isTyping}
          isDemo={isDemo}
          onClose={() => closePanel()}
          onSend={handleSend}
          onSuggestion={handleSend}
          onDemoAction={handleDemoAction}
        />
      ) : null}

      <ChatLauncher
        ref={launcherRef}
        controlsId={panelId}
        isOpen={isOpen}
        label={isOpen ? t("close") : t("open")}
        onClick={() => {
          if (isOpen) {
            closePanel({restoreFocus: false});
          } else {
            setIsOpen(true);
          }
        }}
      />
    </div>
  );
}
