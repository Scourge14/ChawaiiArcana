import { useState } from "react";
import { spreadTypes, topics } from "../data/readingTexts";
import { zodiacSigns } from "../data/zodiacSigns";
import type { ReadingSelection } from "../types";

type SelectionScreenProps = {
  onBack: () => void;
  onContinue: (selection: ReadingSelection) => void;
};

export function SelectionScreen({ onBack, onContinue }: SelectionScreenProps) {
  const [selection, setSelection] = useState<ReadingSelection>({
    birthSign: "",
    risingSign: "",
    topic: "Aşk",
    spreadType: "3 Kart"
  });
  const canContinue = Boolean(selection.birthSign && selection.risingSign && selection.topic && selection.spreadType);

  const updateSelection = <Key extends keyof ReadingSelection>(key: Key, value: ReadingSelection[Key]) => {
    setSelection((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="screen-enter mx-auto flex min-h-[calc(100svh-12rem)] w-full max-w-5xl flex-col justify-center px-5 py-8 sm:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Niyetini Belirle</p>
          <h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">Fal bilgilerin</h2>
        </div>
        <button className="ghost-button" type="button" onClick={onBack}>
          Ana Sayfa
        </button>
      </div>

      <div className="glass-panel p-5 sm:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="field-card">
            <span>Doğum burcu</span>
            <select value={selection.birthSign} onChange={(event) => updateSelection("birthSign", event.target.value)}>
              <option value="" disabled>
                Burcunu seç
              </option>
              {zodiacSigns.map((sign) => (
                <option key={sign.name} value={sign.name}>
                  {sign.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field-card">
            <span>Yükselen burç</span>
            <select value={selection.risingSign} onChange={(event) => updateSelection("risingSign", event.target.value)}>
              <option value="" disabled>
                Yükselenini seç
              </option>
              {zodiacSigns.map((sign) => (
                <option key={sign.name} value={sign.name}>
                  {sign.name}
                </option>
              ))}
            </select>
          </label>

          <div className="field-card">
            <span>Konu</span>
            <div className="segmented-grid">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={selection.topic === topic ? "segment-active" : ""}
                  onClick={() => updateSelection("topic", topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="field-card">
            <span>Açılım türü</span>
            <div className="segmented-grid">
              {spreadTypes.map((spreadType) => (
                <button
                  key={spreadType}
                  type="button"
                  className={selection.spreadType === spreadType ? "segment-active" : ""}
                  onClick={() => updateSelection("spreadType", spreadType)}
                >
                  {spreadType}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="primary-button continue-button mt-6 w-full disabled:cursor-not-allowed disabled:opacity-45" type="button" disabled={!canContinue} onClick={() => onContinue(selection)}>
          Devam Et
        </button>
      </div>
    </section>
  );
}
