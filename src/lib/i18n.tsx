import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "de";

const STORAGE_KEY = "site-lang";

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<LangContextValue>({ lang: "id", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "de") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT<T>(dict: Record<Lang, T>): T {
  const { lang } = useLang();
  return dict[lang];
}

/* ---------------------------------------------------------------- content */

export const header = {
  id: {
    brand: "Bahasa Jerman",
    tagline: "Bali · Deutschland",
    nav: [
      { to: "/", label: "Beranda" },
      { to: "/kursus", label: "Kursus" },
      { to: "/tentang", label: "Tentang Saya" },
      { to: "/kontak", label: "Kontak" },
    ],
    cta: "Daftar sekarang",
  },
  de: {
    brand: "Deutschkurse",
    tagline: "Bali · Deutschland",
    nav: [
      { to: "/", label: "Start" },
      { to: "/kursus", label: "Kurse" },
      { to: "/tentang", label: "Über mich" },
      { to: "/kontak", label: "Kontakt" },
    ],
    cta: "Jetzt anmelden",
  },
} as const;

export const footer = {
  id: {
    title: "Sampai jumpa di Jerman",
    body: "Kursus bahasa Jerman A1 online untuk orang Indonesia yang bersiap pindah ke Jerman — diajar oleh orang Bali yang sudah melewati jalan itu.",
    navLabel: "Navigasi",
    links: [
      { to: "/kursus", label: "Kursus & harga" },
      { to: "/tentang", label: "Tentang saya" },
      { to: "/kontak", label: "Kontak" },
    ],
    welcome: "Selamat datang · Willkommen",
    hours: "Kelas online via Zoom · ramah zona waktu WIB & MEZ",
    cta: "Tanya jadwal",
    legal: "Kursus Bahasa Jerman A1 · Bali → Deutschland",
  },
  de: {
    title: "Bis bald in Deutschland",
    body: "Online-Deutschkurse auf A1-Niveau für Indonesierinnen und Indonesier, die nach Deutschland ziehen möchten — unterrichtet von einer Balinesin, die diesen Weg selbst gegangen ist.",
    navLabel: "Navigation",
    links: [
      { to: "/kursus", label: "Kurse & Preise" },
      { to: "/tentang", label: "Über mich" },
      { to: "/kontak", label: "Kontakt" },
    ],
    welcome: "Willkommen · Selamat datang",
    hours: "Online-Unterricht über Zoom · passend für WIB & MEZ",
    cta: "Termine anfragen",
    legal: "Deutschkurse A1 · Bali → Deutschland",
  },
} as const;

export const home = {
  id: {
    eyebrow: "Selamat datang · Willkommen",
    h1a: "Bahasa Jerman A1,",
    h1b: "dari Indonesia ke Jerman.",
    intro:
      "Kursus online untuk kamu yang masih di Indonesia tapi sudah bermimpi pindah ke Jerman. Diajar oleh perempuan Bali yang menempuh jalan yang sama — dan sekarang tinggal di Jerman.",
    ctaPrimary: "Konsultasi gratis",
    ctaSecondary: "Lihat kursus",
    badgeSub: "Kelas kecil · maks. 6 orang",
    heroAlt: "Gerbang pura Bali yang menyatu dengan jalan kota tua Jerman",
    whyEyebrow: "Kenapa di sini",
    whyTitle: "Dua budaya, satu kelas: rasa Indonesia, struktur Jerman.",
    highlights: [
      {
        tag: "Muttersprache",
        title: "Dijelaskan dalam bahasa Indonesia",
        body: "Tata bahasa Jerman yang rumit dijelaskan pakai bahasa ibu kamu — tanpa tebak-tebakan.",
      },
      {
        tag: "Alltag",
        title: "Bahasa untuk hidup nyata",
        body: "Anmeldung, dokter, sewa apartemen, belanja: kalimat yang benar-benar kamu butuhkan minggu pertama.",
      },
      {
        tag: "Kultur",
        title: "Budaya sebelum berangkat",
        body: "Kebiasaan Jerman yang bikin kaget orang Indonesia — dibahas jujur oleh yang sudah mengalaminya.",
      },
    ],
    aboutEyebrow: "Tentang saya · Über mich",
    aboutTitle: "Saya pernah duduk di kursi kamu.",
    aboutP1:
      "Saya lahir dan besar di Bali. Beberapa tahun lalu saya belajar bahasa Jerman dari nol, mengurus visa, dan pindah ke Jerman. Saya tahu persis bagian mana yang bikin bingung — artikel der/die/das, kalimat panjang, dan rasa gugup saat bicara pertama kali.",
    aboutP2:
      "Sekarang saya mengajar A1 untuk orang Indonesia yang sedang menyiapkan langkah yang sama.",
    aboutCta: "Baca kisah saya",
    portraitAlt: "Guru bahasa Jerman asal Bali sedang mengajar online dari rumahnya di Jerman",
    stepsEyebrow: "Langkah kamu",
    stepsTitle: "Dari nol sampai siap terbang",
    steps: [
      { n: "01", title: "Konsultasi gratis", body: "Ngobrol 20 menit lewat WhatsApp atau Zoom soal tujuan kamu." },
      { n: "02", title: "Kelas A1.1 & A1.2", body: "Kelas kecil online, 2× seminggu, cocok dengan jam Indonesia." },
      { n: "03", title: "Siap ujian & pindah", body: "Latihan Goethe/telc A1 plus persiapan hidup di Jerman." },
    ],
    ctaTitle: "Mulai dari kata pertama: „Hallo“",
    ctaBody:
      "Ceritakan rencana kamu — kerja, Ausbildung, kuliah, atau menyusul keluarga — dan saya bantu susun jalur belajar yang pas.",
    ctaButton: "Hubungi saya",
  },
  de: {
    eyebrow: "Willkommen · Selamat datang",
    h1a: "Deutsch A1,",
    h1b: "von Indonesien nach Deutschland.",
    intro:
      "Online-Kurse für alle, die noch in Indonesien leben und vom Umzug nach Deutschland träumen. Unterrichtet von einer Balinesin, die genau diesen Weg gegangen ist — und heute in Deutschland lebt.",
    ctaPrimary: "Kostenloses Erstgespräch",
    ctaSecondary: "Kurse ansehen",
    badgeSub: "Kleine Gruppen · max. 6 Personen",
    heroAlt: "Balinesisches Tempeltor, das in eine deutsche Altstadtgasse übergeht",
    whyEyebrow: "Warum hier",
    whyTitle: "Zwei Kulturen, ein Kurs: indonesisches Gefühl, deutsche Struktur.",
    highlights: [
      {
        tag: "Muttersprache",
        title: "Erklärt auf Indonesisch",
        body: "Schwierige deutsche Grammatik wird in der Muttersprache erklärt — kein Rätselraten mehr.",
      },
      {
        tag: "Alltag",
        title: "Sprache für das echte Leben",
        body: "Anmeldung, Arztbesuch, Wohnungssuche, Einkaufen: genau die Sätze, die in der ersten Woche zählen.",
      },
      {
        tag: "Kultur",
        title: "Kultur schon vor dem Abflug",
        body: "Deutsche Gewohnheiten, die indonesische Zugezogene überraschen — ehrlich erzählt aus eigener Erfahrung.",
      },
    ],
    aboutEyebrow: "Über mich · Tentang saya",
    aboutTitle: "Ich habe selbst auf diesem Stuhl gesessen.",
    aboutP1:
      "Ich bin auf Bali geboren und aufgewachsen. Vor einigen Jahren habe ich Deutsch bei null angefangen, das Visum organisiert und bin nach Deutschland gezogen. Ich weiß genau, was verwirrt — der/die/das, lange Sätze und die Nervosität beim ersten Sprechen.",
    aboutP2:
      "Heute unterrichte ich A1 für Menschen aus Indonesien, die denselben Schritt vorbereiten.",
    aboutCta: "Meine Geschichte lesen",
    portraitAlt: "Balinesische Deutschlehrerin unterrichtet online von ihrem Zuhause in Deutschland",
    stepsEyebrow: "Deine Schritte",
    stepsTitle: "Von null bis startklar",
    steps: [
      { n: "01", title: "Kostenloses Erstgespräch", body: "20 Minuten über WhatsApp oder Zoom über deine Ziele sprechen." },
      { n: "02", title: "Kurse A1.1 & A1.2", body: "Kleine Online-Gruppen, 2× pro Woche, passend zur indonesischen Zeitzone." },
      { n: "03", title: "Prüfung & Umzug", body: "Training für Goethe/telc A1 plus Vorbereitung auf das Leben in Deutschland." },
    ],
    ctaTitle: "Alles beginnt mit einem Wort: „Hallo“",
    ctaBody:
      "Erzähl mir von deinem Plan — Arbeit, Ausbildung, Studium oder Familiennachzug — und ich stelle den passenden Lernweg zusammen.",
    ctaButton: "Kontakt aufnehmen",
  },
} as const;

export const kursus = {
  id: {
    eyebrow: "Kursus · Kurse",
    h1: "Kelas A1 yang dibuat khusus untuk orang Indonesia",
    intro:
      "Semua kelas berlangsung online lewat Zoom, dengan jam yang ramah untuk zona waktu Indonesia. Penjelasan dalam bahasa Indonesia, latihan penuh dalam bahasa Jerman.",
    button: "Tanya harga",
    extrasTitle: "Tambahan yang bisa dipilih",
    courses: [
      {
        name: "Kelas Grup A1.1",
        tag: "Kleingruppe",
        price: "mulai dari 8 minggu",
        body: "Fondasi total pemula: perkenalan, angka, keluarga, belanja, dan artikel der/die/das.",
        points: ["Maks. 6 peserta", "2× 90 menit per minggu", "Materi PDF + rekaman kelas"],
      },
      {
        name: "Kelas Grup A1.2",
        tag: "Aufbau",
        price: "lanjutan A1.1",
        body: "Perfekt, kalimat modal, dan percakapan sehari-hari sampai siap ujian A1.",
        points: ["Latihan bicara tiap sesi", "Simulasi ujian", "Koreksi tugas personal"],
      },
      {
        name: "Privat 1-on-1",
        tag: "Einzelunterricht",
        price: "jadwal fleksibel",
        body: "Tempo dan materi disesuaikan dengan tujuan kamu — kerja, Ausbildung, atau visa keluarga.",
        points: ["Jadwal bebas (WIB/MEZ)", "Fokus kelemahan kamu", "Bisa berpasangan"],
      },
    ],
    extras: [
      { title: "Persiapan ujian Goethe/telc A1", body: "Latihan empat bagian ujian plus strategi menjawab." },
      { title: "Sesi budaya & persiapan pindah", body: "Anmeldung, Krankenversicherung, kerja, dan etika sehari-hari di Jerman." },
      { title: "Klub bicara mingguan", body: "Sesi santai 45 menit untuk melatih keberanian berbicara." },
    ],
  },
  de: {
    eyebrow: "Kurse · Kursus",
    h1: "A1-Kurse, speziell für Menschen aus Indonesien",
    intro:
      "Alle Kurse finden online über Zoom statt, zu Zeiten, die zur indonesischen Zeitzone passen. Erklärungen auf Indonesisch, geübt wird komplett auf Deutsch.",
    button: "Preise anfragen",
    extrasTitle: "Ergänzende Angebote",
    courses: [
      {
        name: "Gruppenkurs A1.1",
        tag: "Kleingruppe",
        price: "ab 8 Wochen",
        body: "Grundlagen für echte Anfänger: Vorstellen, Zahlen, Familie, Einkaufen und der/die/das.",
        points: ["Max. 6 Teilnehmende", "2× 90 Minuten pro Woche", "PDF-Material + Aufzeichnungen"],
      },
      {
        name: "Gruppenkurs A1.2",
        tag: "Aufbau",
        price: "Fortsetzung von A1.1",
        body: "Perfekt, Modalverben und Alltagsgespräche bis zur Prüfungsreife auf A1.",
        points: ["Sprechtraining in jeder Stunde", "Prüfungssimulation", "Persönliche Korrekturen"],
      },
      {
        name: "Einzelunterricht",
        tag: "Einzelunterricht",
        price: "flexible Termine",
        body: "Tempo und Inhalte richten sich nach deinem Ziel — Arbeit, Ausbildung oder Familienvisum.",
        points: ["Freie Termine (WIB/MEZ)", "Fokus auf deine Schwächen", "Auch zu zweit möglich"],
      },
    ],
    extras: [
      { title: "Prüfungsvorbereitung Goethe/telc A1", body: "Training für alle vier Prüfungsteile plus Strategien." },
      { title: "Kultur- & Umzugssprechstunde", body: "Anmeldung, Krankenversicherung, Arbeit und Alltagsregeln in Deutschland." },
      { title: "Wöchentlicher Sprechclub", body: "45 entspannte Minuten, um Mut zum Sprechen zu gewinnen." },
    ],
  },
} as const;

export const tentang = {
  id: {
    eyebrow: "Tentang saya · Über mich",
    h1: "Lahir di Bali, tinggal di Jerman, mengajar untuk kamu.",
    lead: "Saya tumbuh di antara sawah, upacara, dan suara gamelan. Lalu hidup membawa saya ke Jerman: musim dingin pertama, formulir yang panjang, dan bahasa yang terdengar seperti teka-teki. Saya belajar dari nol — dan berhasil.",
    portraitAlt: "Guru bahasa Jerman asal Bali di ruang kerjanya di Jerman",
    title: "Kenapa saya mengajar",
    p1: "Waktu saya menyiapkan kepindahan, hampir semua materi bahasa Jerman ditulis dalam bahasa Inggris atau Jerman. Banyak teman Indonesia menyerah bukan karena tidak mampu, tetapi karena penjelasannya terasa jauh dari cara kita berpikir.",
    p2: "Di kelas saya, tata bahasa dijelaskan dengan bahasa Indonesia dan contoh yang akrab, tetapi latihannya tetap tegas seperti standar Jerman. Kombinasi itulah yang membuat A1 terasa mungkin — bahkan menyenangkan.",
    p3: "Selain bahasa, saya juga berbagi hal-hal kecil yang tidak ada di buku: cara menyapa tetangga, bagaimana rasanya rindu rumah, dan bagaimana tetap menjadi diri sendiri di negara baru.",
    cta: "Ngobrol dengan saya",
    values: [
      { tag: "Geduld", title: "Sabar", body: "Tidak ada pertanyaan yang terlalu dasar. Kita ulang sampai paham." },
      { tag: "Struktur", title: "Terstruktur", body: "Kurikulum jelas dari A1.1 sampai siap ujian, dengan target tiap minggu." },
      { tag: "Heimat", title: "Terasa rumah", body: "Kelas berbahasa Indonesia, dengan humor dan kehangatan khas kita." },
    ],
  },
  de: {
    eyebrow: "Über mich · Tentang saya",
    h1: "Auf Bali geboren, in Deutschland zu Hause, für dich als Lehrerin da.",
    lead: "Ich bin zwischen Reisfeldern, Zeremonien und Gamelan-Klängen aufgewachsen. Dann führte mich das Leben nach Deutschland: der erste Winter, endlose Formulare und eine Sprache wie ein Rätsel. Ich habe bei null angefangen — und es geschafft.",
    portraitAlt: "Balinesische Deutschlehrerin in ihrem Arbeitszimmer in Deutschland",
    title: "Warum ich unterrichte",
    p1: "Als ich meinen Umzug vorbereitet habe, war fast jedes Lernmaterial auf Englisch oder Deutsch. Viele indonesische Freundinnen und Freunde haben aufgegeben — nicht aus mangelndem Können, sondern weil die Erklärungen so weit von unserer Denkweise entfernt waren.",
    p2: "In meinem Unterricht wird Grammatik auf Indonesisch und mit vertrauten Beispielen erklärt, geübt wird aber so konsequent wie in Deutschland üblich. Genau diese Mischung macht A1 machbar — und sogar richtig schön.",
    p3: "Neben der Sprache teile ich auch die kleinen Dinge, die in keinem Buch stehen: wie man Nachbarn grüßt, wie sich Heimweh anfühlt und wie man im neuen Land man selbst bleibt.",
    cta: "Lass uns sprechen",
    values: [
      { tag: "Geduld", title: "Geduldig", body: "Keine Frage ist zu einfach. Wir wiederholen, bis es sitzt." },
      { tag: "Struktur", title: "Strukturiert", body: "Klarer Lehrplan von A1.1 bis zur Prüfung, mit Wochenzielen." },
      { tag: "Heimat", title: "Wie zu Hause", body: "Unterricht auf Indonesisch, mit unserem Humor und unserer Wärme." },
    ],
  },
} as const;

export const kontak = {
  id: {
    eyebrow: "Kontak · Kontakt",
    h1: "Ceritakan rencana kamu, saya balas secepatnya",
    intro:
      "Konsultasi pertama gratis, 20 menit, tanpa kewajiban. Boleh pakai bahasa Indonesia — atau coba sedikit bahasa Jerman kalau berani. 😊",
    name: "Nama",
    namePlaceholder: "Nama lengkap",
    email: "Email",
    goal: "Tujuan ke Jerman",
    level: "Level sekarang",
    message: "Pesan",
    messagePlaceholder:
      "Halo! Saya berencana pindah ke Jerman tahun depan dan ingin mulai dari A1…",
    submit: "Kirim pesan",
    sent: "Terima kasih! Program email kamu akan terbuka dengan pesan yang sudah siap dikirim.",
    subject: "Pendaftaran kelas A1",
    labels: { name: "Nama", email: "Email", goal: "Tujuan", level: "Level" },
    errors: {
      name: "Mohon isi nama kamu.",
      nameLong: "Nama terlalu panjang (maks. 100 karakter).",
      email: "Mohon isi alamat email.",
      emailInvalid: "Alamat email tidak valid.",
      message: "Ceritakan sedikit tentang rencana kamu.",
      messageLong: "Pesan terlalu panjang (maks. 1500 karakter).",
    },
    goals: [
      "Belum tahu, masih cari info",
      "Kerja / Ausbildung di Jerman",
      "Kuliah di Jerman",
      "Menyusul pasangan / keluarga",
      "Au-pair / FSJ",
    ],
    levels: ["Total pemula", "Sudah belajar sedikit", "Sudah pernah A1, mau lanjut"],
    hoursTitle: "Jam kelas",
    hoursBody:
      "Senin–Jumat, sore hingga malam WIB (pagi/siang MEZ). Jadwal privat bisa disesuaikan.",
    faqTitle: "Sering ditanya",
    faq: [
      { q: "Harus punya dasar dulu?", a: "Tidak. Kelas A1.1 dimulai benar-benar dari nol." },
      { q: "Kelasnya online?", a: "Ya, semua lewat Zoom — bisa diikuti dari mana saja di Indonesia." },
      { q: "Bisa ikut ujian resmi?", a: "Saya bantu persiapan Goethe/telc A1 dan menjelaskan cara mendaftarnya." },
    ],
  },
  de: {
    eyebrow: "Kontakt · Kontak",
    h1: "Erzähl mir von deinem Plan — ich melde mich schnell zurück",
    intro:
      "Das erste Gespräch ist kostenlos, dauert 20 Minuten und ist völlig unverbindlich. Schreib gern auf Indonesisch oder Deutsch. 😊",
    name: "Name",
    namePlaceholder: "Vor- und Nachname",
    email: "E-Mail",
    goal: "Ziel in Deutschland",
    level: "Aktuelles Niveau",
    message: "Nachricht",
    messagePlaceholder:
      "Hallo! Ich möchte nächstes Jahr nach Deutschland ziehen und bei A1 anfangen…",
    submit: "Nachricht senden",
    sent: "Danke! Dein E-Mail-Programm öffnet sich mit der fertigen Nachricht.",
    subject: "Anmeldung A1-Kurs",
    labels: { name: "Name", email: "E-Mail", goal: "Ziel", level: "Niveau" },
    errors: {
      name: "Bitte gib deinen Namen an.",
      nameLong: "Name zu lang (max. 100 Zeichen).",
      email: "Bitte gib deine E-Mail-Adresse an.",
      emailInvalid: "Diese E-Mail-Adresse ist ungültig.",
      message: "Erzähl kurz von deinem Vorhaben.",
      messageLong: "Nachricht zu lang (max. 1500 Zeichen).",
    },
    goals: [
      "Noch offen, ich informiere mich",
      "Arbeit / Ausbildung in Deutschland",
      "Studium in Deutschland",
      "Familiennachzug",
      "Au-pair / FSJ",
    ],
    levels: ["Absolute Anfängerin/Anfänger", "Ein bisschen gelernt", "A1 begonnen, möchte weitermachen"],
    hoursTitle: "Unterrichtszeiten",
    hoursBody:
      "Montag bis Freitag, nachmittags und abends WIB (vormittags/mittags MEZ). Einzeltermine flexibel.",
    faqTitle: "Häufige Fragen",
    faq: [
      { q: "Brauche ich Vorkenntnisse?", a: "Nein. A1.1 beginnt wirklich bei null." },
      { q: "Findet der Unterricht online statt?", a: "Ja, komplett über Zoom — von überall in Indonesien." },
      { q: "Kann ich eine offizielle Prüfung machen?", a: "Ich bereite auf Goethe/telc A1 vor und erkläre die Anmeldung." },
    ],
  },
} as const;
