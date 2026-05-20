type HomeScreenProps = {
  onStart: () => void;
  onHistory: () => void;
};

export function HomeScreen({ onStart, onHistory }: HomeScreenProps) {
  return (
    <section className="screen-enter screen-grid min-h-[calc(100svh-12rem)] items-center px-5 py-10 sm:px-10">
      <div className="relative z-10 max-w-xl">
        <h1 className="font-display text-7xl leading-[0.88] text-ink sm:text-8xl">Tarot</h1>
        <p className="mt-5 max-w-md text-xl leading-8 text-ink-soft">Evrenin mesajını dinle</p>
        <p className="mt-5 max-w-lg text-base leading-7 text-ink-soft/75">
          Burcunu, yükselenini ve niyetini seç. Kartların arasından sezgine dokunanları al; yorumu tamamen cihazında oluşsun.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button className="primary-button" type="button" onClick={onStart}>
            Falına Bak
          </button>
          <button className="secondary-button" type="button" onClick={onHistory}>
            Geçmiş Fallarım
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[480px] w-full max-w-lg items-center justify-center">
        <div className="celestial-ring size-[360px]" />
        <div className="hero-card tilt-card">
          <div className="absolute inset-4 rounded-[26px] border border-champagne/45" />
          <div className="absolute left-1/2 top-10 h-20 w-px -translate-x-1/2 bg-champagne/50" />
          <div className="grid size-32 place-items-center rounded-full border border-champagne/60 bg-pearl/70 font-display text-7xl text-ink shadow-inner">
            ☼
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-ink">Chawaii Arcana</p>
          </div>
        </div>
      </div>
    </section>
  );
}
