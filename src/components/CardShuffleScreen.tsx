import { useEffect, useMemo, useState } from "react";
import { tarotCards } from "../data/tarotCards";
import type { ReadingSelection, TarotCardData } from "../types";
import { drawDeck, getPositions } from "../utils/readingEngine";
import { TarotCard } from "./TarotCard";

type CardShuffleScreenProps = {
  selection: ReadingSelection;
  onBack: () => void;
  onComplete: (cards: TarotCardData[]) => void;
};

export function CardShuffleScreen({ selection, onBack, onComplete }: CardShuffleScreenProps) {
  const positions = useMemo(() => getPositions(selection.spreadType), [selection.spreadType]);
  const [deck, setDeck] = useState(() => drawDeck(tarotCards));
  const [selectedCards, setSelectedCards] = useState<TarotCardData[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const requiredCount = positions.length;
  const canSeeReading = selectedCards.length === requiredCount;

  useEffect(() => {
    setDeck(drawDeck(tarotCards));
    setSelectedCards([]);
  }, [selection.spreadType, selection.topic, selection.birthSign, selection.risingSign]);

  function shuffleCards() {
    setIsShuffling(true);
    setSelectedCards([]);

    window.setTimeout(() => {
      setDeck(drawDeck(tarotCards));
      setIsShuffling(false);
    }, 760);
  }

  function toggleCard(card: TarotCardData) {
    if (isShuffling) return;

    setSelectedCards((current) => {
      const exists = current.some((item) => item.id === card.id);

      if (exists) {
        return current.filter((item) => item.id !== card.id);
      }

      if (current.length >= requiredCount) {
        return current;
      }

      return [...current, card];
    });
  }

  return (
    <section className="screen-enter mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-6xl flex-col justify-center px-5 py-8 sm:px-8">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Kart Seçimi</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">Desteyi dinle</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-soft/75">
            {selection.topic} için {selection.spreadType.toLowerCase()} açılımı. Sezginin çağırdığı {requiredCount} kartı seç.
          </p>
        </div>
        <button className="ghost-button" type="button" onClick={onBack}>
          Bilgileri Düzenle
        </button>
      </div>

      <div className={["glass-panel overflow-hidden p-5 sm:p-7", isShuffling ? "shuffle-pulse" : ""].join(" ")}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Seçilen kartlar</p>
            <p className="text-2xl font-semibold text-champagne">
              {selectedCards.length}/{requiredCount}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="secondary-button shuffle-button" type="button" onClick={shuffleCards}>
              Kartları Karıştır
            </button>
            <button
              className="primary-button see-reading-button disabled:cursor-not-allowed disabled:opacity-45"
              type="button"
              disabled={!canSeeReading}
              onClick={() => onComplete(selectedCards)}
            >
              Yorumu Gör
            </button>
          </div>
        </div>

        <div className="tarot-grid">
          {deck.map((card, index) => {
            const isSelected = selectedCards.some((item) => item.id === card.id);
            const disabled = !isSelected && selectedCards.length >= requiredCount;

            return (
              <TarotCard
                key={card.id}
                card={card}
                index={index}
                isSelected={isSelected}
                disabled={disabled}
                onSelect={() => toggleCard(card)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
