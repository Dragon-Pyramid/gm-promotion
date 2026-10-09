"use client";

type Props = {
  body: string;
  closeLabel: string;
  eyebrow: string;
  headingId: string;
  panelId: string;
  title: string;
  onClose: () => void;
};

export function ChatPanel({
  body,
  closeLabel,
  eyebrow,
  headingId,
  panelId,
  title,
  onClose
}: Props) {
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
        <div className="gm-chat-panel__status">
          <span aria-hidden="true" />
          <strong>{eyebrow}</strong>
        </div>

        <div className="gm-chat-panel__welcome">
          <span className="gm-chat-panel__avatar" aria-hidden="true">
            GM
          </span>
          <div className="gm-chat-panel__bubble">
            <p>{body}</p>
          </div>
        </div>

        <div className="gm-chat-panel__placeholder" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
