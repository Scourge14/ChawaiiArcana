import { useMemo, useState } from "react";
import type { TarotReading } from "../types";
import { clearReadings, getSavedReadings } from "../utils/storage";

type HistoryScreenProps = {
  onBack: () => void;
  onStart: () => void;
};

const formatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short"
});

export function HistoryScreen({ onBack, onStart }: HistoryScreenProps) {
  const [readings, setReadings] = useState<TarotReading[]>(() => getSavedReadings());
  const hasReadings = readings.length > 0;
  const cardCount = useMemo(() => readings.reduce((total, reading) => total + reading.cards.length, 0), [readings]);

  function handleClear() {
    clearReadings();
    setReadings([]);
  }

  return (
    <section className="screen-enter mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-5xl flex-col justify-center px-5 py-8 sm:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Arşiv</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">Geçmiş fallarım</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="secondary-button" type="button" onClick={onStart}>
            Yeni Fal
          </button>
          <button className="ghost-button" type="button" onClick={onBack}>
            Ana Sayfa
          </button>
        </div>
      </div>

      <div className="glass-panel p-5 sm:p-7">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="mini-stat">
            <span>Kayıt</span>
            <strong>{readings.length}</strong>
          </div>
          <div className="mini-stat">
            <span>Kart</span>
            <strong>{cardCount}</strong>
          </div>
          <button className="ghost-button min-h-[64px]" type="button" disabled={!hasReadings} onClick={handleClear}>
            Geçmişi Temizle
          </button>
        </div>

        {hasReadings ? (
          <div className="space-y-4">
            {readings.map((reading) => (
              <article key={reading.id} className="history-item">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-champagne">
                      {formatter.format(new Date(reading.createdAt))}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-ink">
                      {reading.selection.topic} · {reading.selection.spreadType}
                    </h3>
                  </div>
                  <p className="rounded-full border border-champagne/30 px-4 py-2 text-sm text-ink-soft">
                    {reading.selection.birthSign} / {reading.selection.risingSign}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {reading.cards.map((card) => (
                    <span key={`${reading.id}-${card.id}`} className="card-chip">
                      {card.symbol} {card.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="font-display text-4xl text-ink">Henüz kayıtlı fal yok.</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-ink-soft/75">
              İlk açılımını kaydettiğinde tarih, konu, açılım türü ve seçtiğin kartlar burada görünecek.
            </p>
            <button className="primary-button mt-6" type="button" onClick={onStart}>
              Falına Bak
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
