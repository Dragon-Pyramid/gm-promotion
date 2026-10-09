"use client";

import {useEffect, useId, useRef, useState} from "react";
import {useTranslations} from "next-intl";

import {usePathname} from "@/i18n/navigation";

import {ChatLauncher} from "./ChatLauncher";
import {ChatPanel} from "./ChatPanel";

export function ChatAssistant() {
  const t = useTranslations("Chat");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const headingId = `${panelId}-heading`;
  const isDemo = pathname === "/demo" || pathname.endsWith("/demo");

  function closePanel({restoreFocus = true} = {}) {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => launcherRef.current?.focus());
    }
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

  return (
    <div className="gm-chat-assistant" data-open={isOpen ? "true" : "false"}>
      {isOpen ? (
        <ChatPanel
          panelId={panelId}
          headingId={headingId}
          eyebrow={t("eyebrow")}
          title={t("title")}
          body={isDemo ? t("welcome.demo") : t("welcome.landing")}
          closeLabel={t("close")}
          onClose={() => closePanel()}
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
