export type Topic = "Aşk" | "Kariyer" | "Para" | "Genel";

export type SpreadType = "Tek Kart" | "3 Kart" | "5 Kart";

export type Screen = "home" | "selection" | "shuffle" | "result" | "history";

export type TarotCardData = {
  id: string;
  name: string;
  trName?: string;
  symbol: string;
  visualType?: string;
  roman?: string;
  illustrationHint?: string;
  keywords: string[];
  uprightMeaning: string;
  loveMeaning: string;
  careerMeaning: string;
  moneyMeaning: string;
  generalMeaning: string;
  shadowMessage: string;
  advice: string;
  shortMessage: string;
  intensity: number;
};

export type ZodiacSign = {
  id: string;
  name: string;
  symbol?: string;
  element: "Ateş" | "Toprak" | "Hava" | "Su";
  personalityTone: string;
  loveStyle: string;
  careerStyle: string;
  moneyStyle: string;
  shadowSide: string;
  adviceTone: string;
};

export type ReadingSelection = {
  birthSign: string;
  risingSign: string;
  topic: Topic;
  spreadType: SpreadType;
};

export type SelectedTarotCard = TarotCardData & {
  position: string;
};

export type CardReading = {
  position: string;
  cardName: string;
  cardTrName?: string;
  topicMeaning: string;
  shadowMessage: string;
  advice: string;
  intensity: number;
};

export type ReadingNarrative = {
  title: string;
  introduction: string;
  energyTitle: string;
  cardReadings: CardReading[];
  generalReading: string;
  cosmicMessage: string;
  universeNote: string;
  intensityScore: number;
  intensityLabel: string;
};

export type TarotReading = {
  id: string;
  createdAt: string;
  selection: ReadingSelection;
  cards: SelectedTarotCard[];
  generalReading: string;
  narrative: ReadingNarrative;
};
