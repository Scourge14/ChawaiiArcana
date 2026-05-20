import { spreadPositions } from "../data/readingTexts";
import { zodiacSigns } from "../data/zodiacSigns";
import type { ReadingNarrative, ReadingSelection, SelectedTarotCard, TarotCardData, Topic } from "../types";

const topicMeaningKey: Record<Topic, keyof Pick<TarotCardData, "loveMeaning" | "careerMeaning" | "moneyMeaning" | "generalMeaning">> = {
  Aşk: "loveMeaning",
  Kariyer: "careerMeaning",
  Para: "moneyMeaning",
  Genel: "generalMeaning"
};

const intensityLabels = [
  { min: 8.5, label: "Yoğun" },
  { min: 7, label: "Net" },
  { min: 5.5, label: "Dengeli" },
  { min: 0, label: "Hafif" }
];

const cosmicMessages: Record<Topic, string[]> = {
  Aşk: [
    "Kalbin cevabı biliyor; sadece biraz netlik bekliyor.",
    "Bir mesaj ya da küçük bir hareket düşündüğünden fazla şey anlatabilir.",
    "Geri dönüş ihtimali var; ama bu kez şartları sen belirlemelisin.",
    "Aşk tarafında kararsızlık bitmeden huzur tam gelmez.",
    "Biri seni düşündüğünden daha fazla aklında tutuyor olabilir."
  ],
  Kariyer: [
    "Kapı kapalı değil; sadece doğru zamanı bekliyor.",
    "Bugün küçük bir hamle, yarın görünür bir fırsata dönebilir.",
    "Kariyerde sabır var ama boşa bekleme yok.",
    "Birinin emeğini fark etmesi an meselesi gibi.",
    "Planını sadeleştir; en güçlü hareketin netlik olacak."
  ],
  Para: [
    "Para tarafında küçük ama önemli bir fırsat görünebilir.",
    "Bugün ani harcama değil, akıllı bekleyiş kazandırır.",
    "Bir ödeme ya da teklif enerjisi var; detayını iyi oku.",
    "Maddi rahatlama için önce gereksiz yükü azalt.",
    "Evren burada plansız riski değil, kontrollü adımı destekliyor."
  ],
  Genel: [
    "Bugün bir işaret var; görmezden gelme.",
    "Enerjin değişiyor, ama acele karar istemiyor.",
    "Beklenmedik bir haber planını değiştirebilir.",
    "Kararsızlık uzarsa cevap senden uzaklaşır.",
    "Küçük bir tesadüf sandığından fazla anlam taşıyabilir."
  ]
};

const universeNotes: Record<Topic, string[]> = {
  Aşk: [
    "Bugün acele karar verme, ama gelen bakışı ya da mesajı da hafife alma.",
    "Birinin sessizliği ilgisizlik değil, kendi içinde toparlanma hali olabilir.",
    "Kalbin bir şeyi çoktan seçmiş gibi; sadece gururun biraz geç ikna oluyor.",
    "Geri dönüş olursa hemen koşma; önce niyetini gör.",
    "Bugün flört enerjisi hafif ama etkisi büyük."
  ],
  Kariyer: [
    "Kariyerde biraz sabır istiyor ama kapı tamamen kapalı değil.",
    "Bugün küçük görünen bir konuşma, ileride daha büyük bir kapının anahtarı olabilir.",
    "Kendini fazla geri çekme; görünür olduğun yerde şansın da seni buluyor.",
    "Bir fırsat sessiz gelebilir; hazırlıksız yakalanma.",
    "Bugün iddianı büyütme, duruşunu netleştir."
  ],
  Para: [
    "Para konusunda evren sana küçük ama önemli bir fırsat gösterebilir.",
    "Bugün gelen teklifin parıltısına değil, sürdürülebilir olup olmadığına bak.",
    "Bir harcamayı ertelemek, yakında daha rahat nefes aldırabilir.",
    "Küçük kazançları küçümseme; yol oradan açılıyor.",
    "Bugün para konusunda iç sesin hesap makinesinden daha hızlı çalışabilir."
  ],
  Genel: [
    "Bugün acele karar verme, ama gelen işareti de görmezden gelme.",
    "Bir mesaj, bir bakış ya da küçük bir tesadüf sandığından fazla anlam taşıyabilir.",
    "Kanka bugün sende biraz beklenmedik haber enerjisi var; sakin kalıp gözlemle.",
    "Bir şey netleşmek üzere; sen sadece dağılma.",
    "Bugün cevabı zorlamadan, işareti yakalamaya bak."
  ]
};

const friendlyOpeners: Record<Topic, string[]> = {
  Aşk: [
    "Aşk tarafında net mesaj:",
    "Kalp mevzusu biraz hareketli:",
    "Kanka burada biri aklını karıştırabilir:",
    "Bu kart flört enerjisini açıyor:",
    "Burada konuşulmayan bir duygu var:"
  ],
  Kariyer: [
    "İş tarafında kısa mesaj:",
    "Kariyerde kapı tam kapanmamış:",
    "Kanka burada sabır lazım:",
    "Bu kart görünürlük istiyor:",
    "Bugün profesyonel tarafta şunu bil:"
  ],
  Para: [
    "Para tarafında dikkat:",
    "Kanka burada fırsat kokusu var:",
    "Maddi konuda kısa uyarı:",
    "Evren burada hesabı seviyor:",
    "Bu kart harcama kontrolü diyor:"
  ],
  Genel: [
    "Bugünün mesajı net:",
    "Kanka burada küçük bir işaret var:",
    "Genel enerjide şunu gör:",
    "Bu kart sana direkt konuşuyor:",
    "Bugün akış biraz değişebilir:"
  ]
};

const topicPunchlines: Record<Topic, string[]> = {
  Aşk: [
    "Biri seni düşündüğünden fazla kafasına takmış olabilir.",
    "Geri dönüş enerjisi var ama hemen teslim olma.",
    "Kararsızlık uzarsa senin enerjini yer.",
    "Bir mesaj gelebilir; tonu sözlerinden daha önemli.",
    "Kalbinin bildiği şeyi aklın hâlâ tartıyor."
  ],
  Kariyer: [
    "Bir kapı yavaş açılıyor; zorlamadan hazır dur.",
    "Emek görünür olacak ama biraz strateji istiyor.",
    "Bugün sabır, yarın fırsat gibi duruyor.",
    "Bir konuşma işin yönünü değiştirebilir.",
    "Kendini küçük gösterme; alanın genişliyor."
  ],
  Para: [
    "Küçük fırsatı küçümseme.",
    "Bir ödeme ya da teklif detayı önemli olabilir.",
    "Acele harcama bugün iyi fikir değil.",
    "Para enerjisi kontrollü adımı seviyor.",
    "Bir şeyi ertelemek sana nefes aldırabilir."
  ],
  Genel: [
    "Beklenmedik bir haber dengeni değiştirebilir.",
    "İşaret küçük, etkisi büyük olabilir.",
    "Bugün netlik için biraz sakinlik lazım.",
    "Kararsızlık azalınca yol kendini gösterecek.",
    "Evren seni hafifçe dürtüyor; görmezden gelme."
  ]
};

export function getPositions(spreadType: ReadingSelection["spreadType"]) {
  return spreadPositions[spreadType];
}

export function shuffleArray<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function drawDeck(cards: TarotCardData[]) {
  return shuffleArray(cards);
}

export function assignPositions(cards: TarotCardData[], spreadType: ReadingSelection["spreadType"]): SelectedTarotCard[] {
  const positions = spreadPositions[spreadType];

  return cards.slice(0, positions.length).map((card, index) => ({
    ...card,
    position: positions[index]
  }));
}

export function buildReadingNarrative(selection: ReadingSelection, cards: SelectedTarotCard[]): ReadingNarrative {
  const birth = zodiacSigns.find((sign) => sign.name === selection.birthSign);
  const rising = zodiacSigns.find((sign) => sign.name === selection.risingSign);
  const averageIntensity = cards.reduce((total, card) => total + card.intensity, 0) / Math.max(cards.length, 1);
  const strongestCard = [...cards].sort((left, right) => right.intensity - left.intensity)[0];
  const keyThemes = Array.from(new Set(cards.flatMap((card) => card.keywords))).slice(0, 5);
  const cardReadings = cards.map((card, index) => ({
    position: card.position,
    cardName: card.name,
    cardTrName: card.trName ?? "",
    topicMeaning: buildCardMessage(selection.topic, card, index),
    shadowMessage: buildShortShadow(selection.topic, card, index),
    advice: buildShortAdvice(selection.topic, card, index),
    intensity: card.intensity
  }));

  return {
    title: "Falının Ana Enerjisi",
    introduction: buildIntroduction(selection, birth, rising),
    energyTitle: buildEnergyTitle(selection, birth, rising, cards),
    cardReadings,
    generalReading: buildTopicReading(selection, cards, strongestCard, keyThemes),
    cosmicMessage: pickBySignature(cosmicMessages[selection.topic], cards),
    universeNote: pickBySignature(universeNotes[selection.topic], cards),
    intensityScore: Math.round(averageIntensity * 10) / 10,
    intensityLabel: intensityLabels.find((item) => averageIntensity >= item.min)?.label ?? "Dengeli"
  };
}

export function buildGeneralReading(selection: ReadingSelection, cards: SelectedTarotCard[]) {
  const narrative = buildReadingNarrative(selection, cards);
  const cardDetails = narrative.cardReadings
    .map((card) => `${card.position} pozisyonundaki ${card.cardName}: ${card.topicMeaning}`)
    .join(" ");

  return `${narrative.introduction} ${cardDetails} ${narrative.generalReading} Evrenin Sana Mesajı: ${narrative.cosmicMessage}`;
}

function buildIntroduction(
  selection: ReadingSelection,
  birth?: (typeof zodiacSigns)[number],
  rising?: (typeof zodiacSigns)[number]
) {
  const leoLine = buildLeoLine(selection, birth, rising);

  return [
    `${selection.birthSign} + ${selection.risingSign} karışımı bugün netlik istiyor.`,
    leoLine || `${birth?.element ?? "İç"} tarafın ile ${rising?.element ?? "dış"} duruşun aynı anda konuşuyor.`,
    getTopicStyle(selection.topic)
  ].join(" ");
}

function getTopicStyle(topic: Topic) {
  if (topic === "Aşk") {
    return "Aşk tarafında his var, ama kararsızlık da hafif kapıda.";
  }

  if (topic === "Kariyer") {
    return "Kariyerde kapı kapanmış değil; sadece doğru hamle bekleniyor.";
  }

  if (topic === "Para") {
    return "Para konusunda küçük fırsat var; ama acele karar yok.";
  }

  return "Genel enerji sakin görünse de alttan bir değişim geliyor.";
}

function buildTopicReading(
  selection: ReadingSelection,
  cards: SelectedTarotCard[],
  strongestCard: SelectedTarotCard,
  keyThemes: string[]
) {
  const themeLine = `${keyThemes.slice(0, 3).join(", ")} temaları öne çıkıyor.`;
  const strongest = strongestCard.trName ?? strongestCard.name;
  const punch = pickBySignature(topicPunchlines[selection.topic], cards);

  if (selection.topic === "Aşk") {
    return `Kanka aşk tarafında durum kısa: ${punch} ${strongest} bunu biraz daha görünür yapıyor. ${themeLine}`;
  }

  if (selection.topic === "Kariyer") {
    return `Kariyerde mesaj net: ${punch} ${strongest} acele değil, doğru hamle istiyor. ${themeLine}`;
  }

  if (selection.topic === "Para") {
    return `Para tarafında kısa yorum: ${punch} ${strongest} plansız risk yerine kontrollü fırsatı gösteriyor. ${themeLine}`;
  }

  return `Genel olarak bugün mesaj şu: ${punch} ${strongest} bu hissi güçlendiriyor. ${themeLine}`;
}

function pickBySignature(items: string[], cards: SelectedTarotCard[]) {
  const signature = cards.reduce((total, card) => total + card.id.length + card.intensity, 0) + Math.floor(Date.now() / 30000);
  return items[signature % items.length];
}

function buildEnergyTitle(
  selection: ReadingSelection,
  birth: (typeof zodiacSigns)[number] | undefined,
  rising: (typeof zodiacSigns)[number] | undefined,
  cards: SelectedTarotCard[]
) {
  const elementBlend = birth && rising ? `${birth.element} + ${rising.element} Dengesi` : `${selection.birthSign} + ${selection.risingSign}`;
  const options = [
    `${selection.birthSign} + ${selection.risingSign}`,
    elementBlend,
    `${selection.topic} Enerjisi · ${cards[0]?.trName ?? cards[0]?.name ?? "Kartlar"}`,
    `${birth?.symbol ?? ""} ${selection.birthSign} / ${rising?.symbol ?? ""} ${selection.risingSign}`.trim()
  ];

  return pickBySignature(options, cards);
}

function buildCardMessage(topic: Topic, card: SelectedTarotCard, index: number) {
  const opener = friendlyOpeners[topic][(card.intensity + index + card.id.length) % friendlyOpeners[topic].length];
  const cardName = card.trName ?? card.name;
  const topicMeaning = card[topicMeaningKey[topic]];
  const positionLine = buildPositionLine(card.position, index);
  const keywordLine = buildKeywordLine(card.keywords, card.intensity, index);

  return `${opener} ${cardName} kartı burada kendi sesini net veriyor: ${topicMeaning} ${positionLine} ${keywordLine}`;
}

function buildPositionLine(position: string, index: number) {
  const fallback = [
    "Bu kart açılımın ana ritmini belirliyor.",
    "Buradaki mesaj önceki kartın bıraktığı izi tamamlıyor.",
    "Son dokunuş olarak hangi adımın hafifleteceğini gösteriyor."
  ];

  if (position.includes("Geçmiş")) {
    return "Geçmiş tarafında bunun kökü eski bir seçim, söz ya da alışkanlıkla bağlantılı.";
  }

  if (position.includes("Şimdi") || position.includes("Bugün")) {
    return "Şimdiki anda asıl mesele bunu fark edip davranışa çevirmek.";
  }

  if (position.includes("Gelecek") || position.includes("Sonuç")) {
    return "Yakın gelecek için mesajı, acele etmeden ama ertelemeden yön seçmen.";
  }

  if (position.includes("Kalp")) {
    return "Kalp alanında dışarıdan sakin görünen şey içeride daha yoğun çalışıyor.";
  }

  if (position.includes("Zihin")) {
    return "Zihin tarafında fazla senaryo yerine tek net ihtimale odaklanmak iyi gelir.";
  }

  return fallback[index % fallback.length];
}

function buildKeywordLine(keywords: string[], intensity: number, index: number) {
  const pair = keywords.slice(index % Math.max(keywords.length - 1, 1), index % Math.max(keywords.length - 1, 1) + 2);
  const picked = pair.length >= 2 ? pair : keywords.slice(0, 2);
  const tone = intensity >= 8 ? "yüksek sesle" : intensity >= 6 ? "dengeli biçimde" : "ince bir yerden";

  return `${picked.join(" + ")} teması ${tone} öne çıkıyor.`;
}

function buildShortShadow(_topic: Topic, card: SelectedTarotCard, index: number) {
  const suffixes = [
    "Bunu fark ettiğinde kartın sertliği yumuşar.",
    "Burada küçük bir dürüstlük büyük rahatlama getirir.",
    "Bu gölgeyi büyütmeden görmek yeterli."
  ];

  return `${card.shadowMessage} ${suffixes[index % suffixes.length]}`;
}

function buildShortAdvice(_topic: Topic, card: SelectedTarotCard, index: number) {
  const closers = [
    "Bugün bunu tek somut adımla destekle.",
    "Kararı büyütme; ilk küçük hamle yeter.",
    "Cevabı davranışında görünür yap."
  ];

  return `${card.advice} ${closers[(card.id.length + index) % closers.length]}`;
}

function buildLeoLine(
  selection: ReadingSelection,
  birth?: (typeof zodiacSigns)[number],
  rising?: (typeof zodiacSigns)[number]
) {
  if (selection.birthSign === "Aslan") {
    return "Aslan tarafın görünür olmak istiyor; gururla kalp aynı anda konuşuyor.";
  }

  if (selection.risingSign === "Aslan") {
    return "Aslan yükselenin olaya biraz sahne enerjisi katıyor; duruşun fark ediliyor.";
  }

  if (birth?.element === "Ateş" && rising?.element === "Su") {
    return "Ateş + Su dengesi var; hem cesaret hem duygu yükseliyor.";
  }

  return "";
}
