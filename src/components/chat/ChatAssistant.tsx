"use client";

import {
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import {
  useLocale,
  useTranslations
} from "next-intl";

import {usePathname} from "@/i18n/navigation";

import {ChatLauncher} from "./ChatLauncher";
import {type ChatMessage} from "./ChatMessageList";
import {ChatPanel} from "./ChatPanel";

type ChatApiSuccess = {
  ok: true;
  answer: string;
  commercialIntent: boolean;
};

function isChatApiSuccess(
  value: unknown
): value is ChatApiSuccess {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as {
    ok?: unknown;
    answer?: unknown;
    commercialIntent?: unknown;
  };

  return (
    candidate.ok === true &&
    typeof candidate.answer === "string" &&
    candidate.answer.trim().length > 0 &&
    typeof candidate.commercialIntent === "boolean"
  );
}

export function ChatAssistant() {
  const t = useTranslations("Chat");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [commercialIntent, setCommercialIntent] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const messageSequenceRef = useRef(0);
  const panelId = useId();
  const headingId = `${panelId}-heading`;
  const isDemo = pathname === "/demo" || pathname.endsWith("/demo");
  const pageLocale = locale === "en" ? "en" : "es";

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

  async function handleSend(message: string) {
    const trimmed = message.trim();

    if (!trimmed || isTyping) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: nextMessageId("user"),
        role: "user",
        text: trimmed
      }
    ]);
    setCommercialIntent(false);
    setIsTyping(true);

    const controller = new AbortController();
    activeRequestRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmed,
          pageLocale
        }),
        signal: controller.signal
      });

      const payload: unknown = await response.json();

      if (!response.ok || !isChatApiSuccess(payload)) {
        throw new Error("Chat API returned an invalid response");
      }

      setCommercialIntent(payload.commercialIntent);
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId("assistant"),
          role: "assistant",
          text: payload.answer.trim()
        }
      ]);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      setCommercialIntent(false);
      console.error("[chat-ui] Request failed.", error);

      setMessages((current) => [
        ...current,
        {
          id: nextMessageId("assistant"),
          role: "assistant",
          text: t("errorReply")
        }
      ]);
    } finally {
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
      }

      if (!controller.signal.aborted) {
        setIsTyping(false);
      }
    }
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
      activeRequestRef.current?.abort();
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
          commercialIntent={commercialIntent}
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
