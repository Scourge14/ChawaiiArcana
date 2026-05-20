import { useEffect, useState } from "react";
import { CardShuffleScreen } from "./components/CardShuffleScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { HomeScreen } from "./components/HomeScreen";
import { ResultScreen } from "./components/ResultScreen";
import { SelectionScreen } from "./components/SelectionScreen";
import type { ReadingSelection, Screen, TarotCardData, TarotReading } from "./types";
import { assignPositions, buildGeneralReading, buildReadingNarrative } from "./utils/readingEngine";

type ThemeMode = "light" | "dark";
const THEME_STORAGE_KEY = "premium-tarot-theme";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selection, setSelection] = useState<ReadingSelection | null>(null);
  const [currentReading, setCurrentReading] = useState<TarotReading | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      return;
    }
  }, [theme]);

  function handleSelectionComplete(nextSelection: ReadingSelection) {
    setSelection(nextSelection);
    setCurrentReading(null);
    setScreen("shuffle");
  }

  function handleCardsSelected(cards: TarotCardData[]) {
    if (!selection) return;

    const selectedCards = assignPositions(cards, selection.spreadType);
    const narrative = buildReadingNarrative(selection, selectedCards);
    const reading: TarotReading = {
      id: createReadingId(),
      createdAt: new Date().toISOString(),
      selection,
      cards: selectedCards,
      generalReading: buildGeneralReading(selection, selectedCards),
      narrative
    };

    setCurrentReading(reading);
    setScreen("result");
  }

  return (
    <main data-theme={theme} className="relative min-h-svh overflow-x-hidden bg-ivory px-3 py-3 text-ink sm:px-5 sm:py-5">
      <div className="paper-grain" />
      <div className="background-moon" />
      <div className="background-line left-[6%] top-[16%]" />
      <div className="background-line right-[7%] top-[70%]" />

      <div className="app-frame relative z-10 mx-auto w-full max-w-7xl">
        <AppHeader
          screen={screen}
          theme={theme}
          onHome={() => setScreen("home")}
          onHistory={() => setScreen("history")}
          onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
        />
        <StepProgress screen={screen} />

        {screen === "home" && <HomeScreen onStart={() => setScreen("selection")} onHistory={() => setScreen("history")} />}

        {screen === "selection" && (
          <SelectionScreen onBack={() => setScreen("home")} onContinue={handleSelectionComplete} />
        )}

        {screen === "shuffle" && selection && (
          <CardShuffleScreen
            selection={selection}
            onBack={() => setScreen("selection")}
            onComplete={handleCardsSelected}
          />
        )}

        {screen === "result" && currentReading && (
          <ResultScreen
            reading={currentReading}
            onNewReading={() => setScreen("selection")}
            onHistory={() => setScreen("history")}
          />
        )}

        {screen === "history" && <HistoryScreen onBack={() => setScreen("home")} onStart={() => setScreen("selection")} />}
      </div>
    </main>
  );
}

function AppHeader({
  screen,
  theme,
  onHome,
  onHistory,
  onToggleTheme
}: {
  screen: Screen;
  theme: ThemeMode;
  onHome: () => void;
  onHistory: () => void;
  onToggleTheme: () => void;
}) {
  return (
    <header className="app-header">
      <button className="brand-lockup" type="button" onClick={onHome} aria-label="Ana sayfa">
        <span className="brand-sun">☼</span>
        <span>Tarot</span>
      </button>

      <nav className="header-nav" aria-label="Uygulama menüsü">
        <button type="button" className={screen === "home" ? "nav-active" : ""} onClick={onHome}>
          Ana Sayfa
        </button>
        <button type="button" className={screen === "history" ? "nav-active" : ""} onClick={onHistory}>
          Fallarım
        </button>
        <button type="button">Hakkımda</button>
      </nav>

      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "light" ? "Dark mode aç" : "Light mode aç"}
          title={theme === "light" ? "Dark mode" : "Light mode"}
        >
          {theme === "light" ? "☾" : "☼"}
        </button>
        <span>♙</span>
      </div>
    </header>
  );
}

function StepProgress({ screen }: { screen: Screen }) {
  const steps: { label: string; screen: Screen }[] = [
    { label: "Niyet", screen: "selection" },
    { label: "Kart Seçimi", screen: "shuffle" },
    { label: "Yorum", screen: "result" },
    { label: "Sonuç", screen: "history" }
  ];
  const activeIndex = steps.findIndex((step) => step.screen === screen);

  if (activeIndex === -1) {
    return null;
  }

  return (
    <div className="step-progress" aria-label="Fal adımları">
      {steps.map((step, index) => (
        <div key={step.screen} className={index <= activeIndex ? "step-item step-active" : "step-item"}>
          <span>{index + 1}</span>
          <strong>{step.label}</strong>
        </div>
      ))}
    </div>
  );
}

function createReadingId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `reading-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}
