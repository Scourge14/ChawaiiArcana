import type { TarotCardData } from "../types";

type TarotCardProps = {
  card?: TarotCardData;
  position?: string;
  isOpen?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
  index?: number;
  onSelect?: () => void;
};

export function TarotCard({
  card,
  position,
  isOpen = false,
  isSelected = false,
  disabled = false,
  index = 0,
  onSelect
}: TarotCardProps) {
  const content = (
    <div
      className={[
        "tarot-card-shell",
        isOpen ? "tarot-card-open" : "tarot-card-closed",
        isSelected ? "tarot-card-selected" : "",
        disabled ? "opacity-70" : ""
      ].join(" ")}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="tarot-corner left-3 top-3" />
      <div className="tarot-corner bottom-3 right-3 rotate-180" />

      {isOpen && card ? (
        <div className="relative z-10 flex h-full flex-col items-center justify-between text-center">
          <div className="space-y-1">
            <span className="block font-display text-lg leading-none text-champagne">{card.roman}</span>
            <span className="block text-[9px] uppercase tracking-[0.24em] text-ink-soft/70">{position}</span>
          </div>
          <CardIllustration card={card} />
          <div>
            <h3 className="font-display text-2xl leading-none text-ink">{card.trName ?? card.name}</h3>
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ink-soft/70">
              {card.keywords.slice(0, 2).join(" / ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 text-champagne">
          <div className="card-back-orbit">
            <span>☾</span>
          </div>
          <div className="h-px w-16 bg-champagne/60" />
          <span className="text-[10px] uppercase tracking-[0.32em]">Tarot</span>
        </div>
      )}
    </div>
  );

  if (!onSelect) {
    return content;
  }

  return (
    <button
      type="button"
      className="touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-champagne/45"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      {content}
    </button>
  );
}

function CardIllustration({ card }: { card: TarotCardData }) {
  const visual = {
    className: card.visualType || cardVisuals[card.id]?.className || "sun",
    mark: card.symbol,
    accent: cardVisuals[card.id]?.accent || "✦"
  };

  return (
    <div className={`card-illustration card-illustration-${visual.className}`} aria-hidden="true">
      <span className="illustration-accent">{visual.accent}</span>
      <span className="illustration-mark">{visual.mark}</span>
      <span className="illustration-ground" />
    </div>
  );
}

const cardVisuals: Record<string, { className: string; mark: string; accent: string }> = {
  "the-fool": { className: "path", mark: "✦", accent: "↟" },
  "the-magician": { className: "sun", mark: "☉", accent: "✧" },
  "the-high-priestess": { className: "moon", mark: "☾", accent: "✦" },
  "the-empress": { className: "garden", mark: "✿", accent: "☉" },
  "the-emperor": { className: "crown", mark: "♔", accent: "✧" },
  "the-hierophant": { className: "temple", mark: "✥", accent: "☽" },
  "the-lovers": { className: "lovers", mark: "♡", accent: "✦" },
  "the-chariot": { className: "path", mark: "✧", accent: "➝" },
  strength: { className: "lion", mark: "♌", accent: "∞" },
  "the-hermit": { className: "lantern", mark: "✺", accent: "☾" },
  "wheel-of-fortune": { className: "wheel", mark: "◎", accent: "✦" },
  justice: { className: "scales", mark: "⚖", accent: "✧" },
  "the-hanged-man": { className: "temple", mark: "◇", accent: "☊" },
  death: { className: "path", mark: "♆", accent: "✦" },
  temperance: { className: "water", mark: "☊", accent: "✧" },
  "the-devil": { className: "crown", mark: "♄", accent: "◆" },
  "the-tower": { className: "tower", mark: "⌁", accent: "✦" },
  "the-star": { className: "star", mark: "✶", accent: "☾" },
  "the-moon": { className: "moon", mark: "☽", accent: "✦" },
  "the-sun": { className: "sun", mark: "☀", accent: "✦" },
  judgement: { className: "star", mark: "✷", accent: "☉" },
  "the-world": { className: "wheel", mark: "⊕", accent: "✦" }
};
