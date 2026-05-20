import { useState } from "react";
import type { TarotReading } from "../types";
import { saveReading } from "../utils/storage";
import { TarotCard } from "./TarotCard";

type ResultScreenProps = {
  reading: TarotReading;
  onNewReading: () => void;
  onHistory: () => void;
};

export function ResultScreen({ reading, onNewReading, onHistory }: ResultScreenProps) {
  const [saved, setSaved] = useState(false);
  const { narrative } = reading;

  function handleSave() {
    saveReading(reading);
    setSaved(true);
  }

  return (
    <section className="screen-enter mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-6xl flex-col justify-center px-5 py-8 sm:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Açılım Sonucu</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">Kartların mesajı</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-soft/75">{narrative.intensityLabel} bir açılım. Enerji yoğunluğu: {narrative.intensityScore}/10</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="secondary-button" type="button" onClick={onNewReading}>
            Yeni Fal
          </button>
          <button className="ghost-button" type="button" onClick={onHistory}>
            Geçmiş Fallarım
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-5 sm:p-7">
          <div className="result-card-grid">
            {reading.cards.map((card, index) => (
              <div key={`${card.id}-${card.position}`} className="card-reveal space-y-4" style={{ animationDelay: `${index * 150}ms` }}>
                <TarotCard card={card} index={index} isOpen position={card.position} />
                <div className="rounded-2xl border border-champagne/25 bg-pearl/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{card.position}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{card.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.shortMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel flex flex-col justify-between p-5 sm:p-7">
          <div>
            <p className="eyebrow">{narrative.title}</p>
            <div className="reading-panel mt-5">
              <p className="font-display text-3xl leading-tight text-champagne">{narrative.energyTitle}</p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{narrative.introduction}</p>
            </div>

            <div className="mt-4 space-y-3">
              {narrative.cardReadings.map((card, index) => (
                <article key={`${card.cardName}-${card.position}`} className="interpretation-card" style={{ animationDelay: `${220 + index * 120}ms` }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne">
                    {card.position} · {card.cardName}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{card.topicMeaning}</p>
                  <p className="mt-3 text-sm leading-6 text-mauve">
                    Gölge: {card.shadowMessage}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-champagne/90">
                    Tavsiye: {card.advice}
                  </p>
                </article>
              ))}
            </div>

            <div className="reading-panel mt-4">
              <p className="eyebrow">Genel Yorum</p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{narrative.generalReading}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-champagne">Evrenin Sana Mesajı</p>
              <p className="mt-2 font-display text-2xl leading-tight text-ink">{narrative.cosmicMessage}</p>
              <div className="universe-note mt-5">
                <span>Evrenin Notu</span>
                <p>{narrative.universeNote}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="mini-stat">
                <span>Konu</span>
                <strong>{reading.selection.topic}</strong>
              </div>
              <div className="mini-stat">
                <span>Açılım</span>
                <strong>{reading.selection.spreadType}</strong>
              </div>
            </div>
            <button className="primary-button save-button w-full" type="button" onClick={handleSave}>
              {saved ? "Fal Kaydedildi" : "Falımı Kaydet"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
