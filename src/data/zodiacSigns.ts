import type { ZodiacSign } from "../types";

export const zodiacSigns: ZodiacSign[] = [
  {
    id: "aries",
    name: "Koç",
    symbol: "♈",
    element: "Ateş",
    personalityTone: "cesur, hızlı karar alan ve beklemeyi sevmeyen",
    loveStyle: "aşkta netlik, heyecan ve doğrudan ifade arayan",
    careerStyle: "kariyerde liderlik alanı açıldığında hızla parlayan",
    moneyStyle: "para konusunda fırsatı hızlı görüp bazen acele hamle yapan",
    shadowSide: "sabırsızlık yüzünden yarım kalan cevapları tamamlanmış sayabilir",
    adviceTone: "önce yönünü netleştir, sonra bütün gücünle ilerle"
  },
  {
    id: "taurus",
    name: "Boğa",
    symbol: "♉",
    element: "Toprak",
    personalityTone: "sakin, güven arayan ve kalıcı değerleri önemseyen",
    loveStyle: "aşkta sadakat, temas ve huzurlu bir zemin isteyen",
    careerStyle: "kariyerde istikrarla emek verdiğinde güçlü sonuç alan",
    moneyStyle: "para konusunda güvenli plan, birikim ve somut kazanç isteyen",
    shadowSide: "değişim gerektiğinde konfor alanına fazla tutunabilir",
    adviceTone: "güvende kalırken büyümeye yer aç"
  },
  {
    id: "gemini",
    name: "İkizler",
    symbol: "♊",
    element: "Hava",
    personalityTone: "meraklı, zihin odaklı ve olasılıkları hızlı okuyan",
    loveStyle: "aşkta konuşma, zihinsel uyum ve canlı bağ arayan",
    careerStyle: "kariyerde iletişim, fikir ve çeviklikle öne çıkan",
    moneyStyle: "para konusunda farklı gelir kapılarını aynı anda düşünebilen",
    shadowSide: "fazla seçenek içinde kararın duygusal ağırlığını kaçırabilir",
    adviceTone: "zihnindeki gürültüyü azalt, asıl cümleyi duy"
  },
  {
    id: "cancer",
    name: "Yengeç",
    symbol: "♋",
    element: "Su",
    personalityTone: "koruyucu, sezgisel ve duygusal hafızası güçlü",
    loveStyle: "aşkta güven, aidiyet ve korunmuş hissetmek isteyen",
    careerStyle: "kariyerde insan ilişkileri ve sadakatle bağ kuran",
    moneyStyle: "para konusunda ailesel güven ve iç huzur arayan",
    shadowSide: "geçmiş duygular bugünkü kararı fazla etkileyebilir",
    adviceTone: "hissettiğini küçümseme ama sınırını da koru"
  },
  {
    id: "leo",
    name: "Aslan",
    symbol: "♌",
    element: "Ateş",
    personalityTone: "Aslan enerjisi görünür olmayı, kalpten hareket etmeyi ve sahnede kendi ışığını göstermeyi sever.",
    loveStyle: "Aşkta sıcak, gururlu ve sahiplenici bir enerji taşır. Sevildiğini hissetmek ister ama ilgiyi tek taraflı vermekten hoşlanmaz.",
    careerStyle: "Kariyerde fark edilmek, takdir görmek ve liderlik etmek ister. Doğru alanda parladığında çevresini de motive eder.",
    moneyStyle: "Para konusunda kaliteye ve gösterişli seçimlere yönelebilir. Kazandığını kendine ve sevdiklerine güzel deneyimler yaratmak için kullanmak ister.",
    shadowSide: "Gurur, bazen gerçek duyguların üstünü örtebilir. İlgi görmediğinde içine atmak yerine dramatik tepki verebilir.",
    adviceTone: "Işığını kısmadan ama egona da teslim olmadan ilerle. Bu dönem kalpten gelen cesaret sana yol açar."
  },
  {
    id: "virgo",
    name: "Başak",
    symbol: "♍",
    element: "Toprak",
    personalityTone: "analitik, düzenleyici ve detaylardan anlam çıkaran",
    loveStyle: "aşkta emek, sadelik ve güvenilir davranışlarla bağ kuran",
    careerStyle: "kariyerde sistemi iyileştirerek değer yaratan",
    moneyStyle: "para konusunda hesap, plan ve kontrollü büyüme isteyen",
    shadowSide: "kusursuzluk arayışı iyi olanı bile geciktirebilir",
    adviceTone: "her şeyi düzeltmeye çalışma; önce en önemli parçayı seç"
  },
  {
    id: "libra",
    name: "Terazi",
    symbol: "♎",
    element: "Hava",
    personalityTone: "denge arayan, zarif ve ilişkilerin tonunu iyi okuyan",
    loveStyle: "aşkta uyum, karşılıklılık ve açık iletişim isteyen",
    careerStyle: "kariyerde diplomasi ve estetik sezgiyle güçlenen",
    moneyStyle: "para konusunda kalite ile dengeyi birlikte arayan",
    shadowSide: "karşı tarafı kırmamak için kendi kararını erteleyebilir",
    adviceTone: "denge, kendinden vazgeçmeden kurulduğunda gerçek olur"
  },
  {
    id: "scorpio",
    name: "Akrep",
    symbol: "♏",
    element: "Su",
    personalityTone: "derin, sezgisel ve yüzeyin altını güçlü okuyan",
    loveStyle: "aşkta yoğun bağ, sadakat ve ruhsal açıklık isteyen",
    careerStyle: "kariyerde stratejik sezgi ve kriz yönetimiyle güçlenen",
    moneyStyle: "para konusunda kontrol, dönüşüm ve güçlü hamleler arayan",
    shadowSide: "şüphe büyüdüğünde net bilgiden önce iç gerilim konuşabilir",
    adviceTone: "hissettiğin şeyi sahiplen ama kanıt ve sezgiyi birlikte tart"
  },
  {
    id: "sagittarius",
    name: "Yay",
    symbol: "♐",
    element: "Ateş",
    personalityTone: "özgür, keşifçi ve daha geniş anlam arayan",
    loveStyle: "aşkta dürüstlük, alan ve canlı bir yol arkadaşlığı isteyen",
    careerStyle: "kariyerde büyüme, eğitim ve uzak hedeflerle motive olan",
    moneyStyle: "para konusunda fırsatı büyütmeyi seven ama plana ihtiyaç duyan",
    shadowSide: "sıkıştığını hissettiğinde tamamlanmamış şeylerden uzaklaşabilir",
    adviceTone: "özgürlüğünü korurken verdiğin sözün ağırlığını da taşı"
  },
  {
    id: "capricorn",
    name: "Oğlak",
    symbol: "♑",
    element: "Toprak",
    personalityTone: "disiplinli, hedefli ve sabırla yapı kuran",
    loveStyle: "aşkta güvenilirlik, zamanla derinleşen bağ ve ciddiyet isteyen",
    careerStyle: "kariyerde sorumluluk, statü ve ölçülebilir başarı arayan",
    moneyStyle: "para konusunda uzun vadeli plan ve sağlam birikim isteyen",
    shadowSide: "kontrol ihtiyacı duygusal esnekliği azaltabilir",
    adviceTone: "hedefi küçültme ama yolun içinde nefes alanı bırak"
  },
  {
    id: "aquarius",
    name: "Kova",
    symbol: "♒",
    element: "Hava",
    personalityTone: "özgün, bağımsız ve geleceği bugünden hisseden",
    loveStyle: "aşkta zihinsel bağ, özgürlük ve sıra dışı uyum isteyen",
    careerStyle: "kariyerde yenilik, teknoloji ve fikir liderliğiyle öne çıkan",
    moneyStyle: "para konusunda alışılmadık fırsatları fark eden",
    shadowSide: "fazla mesafe kurduğunda kalbinin asıl ihtiyacını saklayabilir",
    adviceTone: "farklılığını koru ama duygusal bağdan kopma"
  },
  {
    id: "pisces",
    name: "Balık",
    symbol: "♓",
    element: "Su",
    personalityTone: "hassas, hayal gücü yüksek ve sezgisel akışa açık",
    loveStyle: "aşkta ruhsal yakınlık, şefkat ve romantik derinlik isteyen",
    careerStyle: "kariyerde ilham, yaratıcılık ve empatiyle değer üreten",
    moneyStyle: "para konusunda sezgisel kararlar alıp net plana ihtiyaç duyan",
    shadowSide: "sınırlar belirsizleştiğinde başkasının yükünü taşıyabilir",
    adviceTone: "sezgini takip et ama kararına net bir sınır çiz"
  }
];
