import type { SpreadType, Topic } from "../types";

export const topics: Topic[] = ["Aşk", "Kariyer", "Para", "Genel"];

export const spreadTypes: SpreadType[] = ["Tek Kart", "3 Kart", "5 Kart"];

export const spreadPositions: Record<SpreadType, string[]> = {
  "Tek Kart": ["Bugünün Mesajı"],
  "3 Kart": ["Geçmiş", "Şimdi", "Gelecek"],
  "5 Kart": ["Mevcut Durum", "Engel", "Bilinçaltı", "Yakın Gelecek", "Tavsiye"]
};
