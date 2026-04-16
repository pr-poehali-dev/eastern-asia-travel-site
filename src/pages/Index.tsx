import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b8898732-c7ef-43bd-8dd1-93e7e2e80d2b/files/918a570b-f2b6-4ef8-bbd4-ef0be703405e.jpg";

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const SEASONS: Record<string, { label: string; bg: string }> = {
  best: { label: "Лучшее время", bg: "bg-amber-100 border border-amber-300" },
  good: { label: "Хорошее время", bg: "bg-stone-100 border border-stone-300" },
  avoid: { label: "Лучше избежать", bg: "bg-stone-50 border border-stone-200" },
};

const CALENDAR = [
  {
    country: "Китай 🇨🇳",
    months: ["avoid","avoid","best","best","good","avoid","avoid","avoid","best","best","good","avoid"],
  },
  {
    country: "Япония 🇯🇵",
    months: ["good","good","best","best","avoid","avoid","avoid","avoid","best","best","good","good"],
  },
  {
    country: "Южная Корея 🇰🇷",
    months: ["avoid","avoid","best","best","good","avoid","avoid","avoid","best","best","good","avoid"],
  },
];

const COUNTRIES = [
  {
    name: "Китай",
    flag: "🇨🇳",
    tagline: "Империя контрастов",
    desc: "От Великой стены до рисовых террас Юньнани — страна, где каждая провинция является отдельным миром с тысячелетней историей.",
    highlights: ["Пекин и Запретный город", "Горы Хуаншань", "Долина Чжанцзяцзе", "Юньнань и Лицзян"],
    color: "from-red-950/60",
  },
  {
    name: "Япония",
    flag: "🇯🇵",
    tagline: "Красота в деталях",
    desc: "Страна, где древние традиции живут рядом с передовыми технологиями. Сакура, самурайские замки и тихие дзен-сады.",
    highlights: ["Киото и храмы", "Токио — ночной ритм", "Гора Фудзи", "Нара — олени и пагоды"],
    color: "from-rose-950/60",
  },
  {
    name: "Южная Корея",
    flag: "🇰🇷",
    tagline: "Динамика и гармония",
    desc: "Страна K-pop и кимчи, старинных дворцов и ультрасовременных городов. Сеул никогда не спит, а острова Чеджу дарят покой.",
    highlights: ["Сеул — палаты и кварталы", "Остров Чеджу", "Пусан — морской город", "Гьонджу — древняя столица"],
    color: "from-blue-950/60",
  },
];

const ROUTES = [
  {
    title: "Классическая Япония",
    duration: "14 дней",
    cities: ["Токио", "Никко", "Хаконе", "Киото", "Нара", "Осака"],
    type: "Культура и природа",
    icon: "MapPin",
    price: "от 180 000 ₽",
    season: "Март–Май, Сентябрь–Ноябрь",
    difficulty: "Лёгкий",
    group: "до 12 человек",
    accent: "from-rose-950/70",
    description: "Самый полный маршрут по Японии — от шумного Токио до тихих садов Киото. Вы увидите всё: неоновые улицы Сибуи, водопады Никко, горячие источники у подножия Фудзи, золотые пагоды и оленей Нары.",
    days: [
      { day: "1–3", city: "Токио", desc: "Сибуя, Синдзюку, Асакуса, башня Скайтри, рыбный рынок Цукидзи" },
      { day: "4", city: "Никко", desc: "Храмовый комплекс Тосёгу, водопады Кэгон, священный мост Синкё" },
      { day: "5–6", city: "Хаконе", desc: "Онсэн (горячие источники), вид на Фудзи, открытый музей под небом" },
      { day: "7–10", city: "Киото", desc: "Ворота Фусими Инари, Золотой павильон Кинкакудзи, Бамбуковая роща Арасияма, чайная церемония" },
      { day: "11", city: "Нара", desc: "Олени парка, храм Тодайдзи с гигантским Буддой, фонари Касуга" },
      { day: "12–14", city: "Осака", desc: "Замок Осака, квартал Дотонбори, уличная еда такояки и окономияки" },
    ],
    includes: ["Авиаперелёт", "Отели 4★", "Транспорт JR Pass", "Русскоязычный гид", "Завтраки"],
  },
  {
    title: "Золотой треугольник Китая",
    duration: "12 дней",
    cities: ["Пекин", "Сиань", "Шанхай"],
    type: "История и архитектура",
    icon: "Compass",
    price: "от 155 000 ₽",
    season: "Апрель–Май, Сентябрь–Октябрь",
    difficulty: "Средний",
    group: "до 15 человек",
    accent: "from-amber-950/70",
    description: "Три великих города — три эпохи Китая. Имперский Пекин с Запретным городом, древний Сиань с терракотовой армией и космополитичный Шанхай — самый современный мегаполис Азии.",
    days: [
      { day: "1–4", city: "Пекин", desc: "Запретный город, Великая стена (участок Мутяньюй), площадь Тяньаньмэнь, Храм Неба, Летний дворец" },
      { day: "5–7", city: "Сиань", desc: "Терракотовая армия императора Цинь Шихуанди, Городская стена, Мечеть, Квартал Хуэйцзу" },
      { day: "8–12", city: "Шанхай", desc: "Набережная Бунд, башня Пёрл Ориент, квартал Синьтяньди, сад Юйюань, Французская концессия" },
    ],
    includes: ["Авиаперелёт", "Отели 4★", "Скоростные поезда", "Русскоязычный гид", "Завтраки", "VPN-сим"],
  },
  {
    title: "Корея за 10 дней",
    duration: "10 дней",
    cities: ["Сеул", "Гьонджу", "Пусан", "Чеджу"],
    type: "Города и острова",
    icon: "Navigation",
    price: "от 140 000 ₽",
    season: "Апрель–Май, Октябрь–Ноябрь",
    difficulty: "Лёгкий",
    group: "до 12 человек",
    accent: "from-blue-950/70",
    description: "Компактный, но насыщенный маршрут по Южной Корее. Дворцы и K-pop в Сеуле, историческая столица Силла в Гьонджу, морепродукты Пусана и вулканические пейзажи острова Чеджу.",
    days: [
      { day: "1–4", city: "Сеул", desc: "Дворец Кёнбоккун, квартал Инсадон, Намсан и башня N Seoul, Каннам и Hongdae" },
      { day: "5–6", city: "Гьонджу", desc: "Хранилище Чхомсондэ, королевские погребальные курганы, храм Пульгукса и грот Соккурам" },
      { day: "7–8", city: "Пусан", desc: "Рыбный рынок Джагальчи, храм Хэдонг Ёнгунса на скалах, пляж Хэундэ" },
      { day: "9–10", city: "Чеджу", desc: "Вулкан Халласан, водопады Чхончжиён, лавовые трубки Манджангуль" },
    ],
    includes: ["Авиаперелёт", "Отели 4★", "T-money карта", "Русскоязычный гид", "Завтраки"],
  },
  {
    title: "Большое азиатское путешествие",
    duration: "28 дней",
    cities: ["Токио", "Сеул", "Пекин", "Сиань", "Шанхай"],
    type: "Три страны",
    icon: "Globe",
    price: "от 420 000 ₽",
    season: "Апрель–Май",
    difficulty: "Насыщенный",
    group: "до 10 человек",
    accent: "from-violet-950/70",
    description: "Флагманский тур — всё лучшее из трёх стран в одном путешествии. Для тех, кто хочет погрузиться в Азию целиком: от японских садов до китайских небоскрёбов и корейских дворцов.",
    days: [
      { day: "1–7", city: "Токио → Киото", desc: "Токио, Никко, Хаконе, Киото, Нара, Осака — полная японская программа" },
      { day: "8–10", city: "Сеул", desc: "Дворцы, кварталы Сеула, день-поездка в Гьонджу или Пусан" },
      { day: "11–16", city: "Пекин", desc: "Великая стена, Запретный город, Летний дворец, Пекинская утка" },
      { day: "17–20", city: "Сиань", desc: "Терракотовая армия, Великий шёлковый путь, ночной рынок" },
      { day: "21–28", city: "Шанхай", desc: "Бунд, Юйюань, Сучжоу и Ханчжоу — день-поездки, прощальный ужин" },
    ],
    includes: ["Авиаперелёты (все)", "Отели 5★", "Все поезда", "Личный гид", "Полупансион", "Трансферы", "VPN-сим"],
  },
];

const TIPS = [
  {
    icon: "CreditCard",
    title: "Деньги и оплата",
    text: "В Японии наличные всё ещё важны. В Китае работает WeChat Pay. В Корее принимают карты везде.",
  },
  {
    icon: "Wifi",
    title: "Интернет и связь",
    text: "Купите SIM-карту в аэропорту или возьмите портативный Wi-Fi роутер. В Китае нужен VPN.",
  },
  {
    icon: "Languages",
    title: "Язык и общение",
    text: "Учите базовые фразы. В Японии и Корее часто помогут жестами. В Китае пригодится переводчик.",
  },
  {
    icon: "Utensils",
    title: "Еда и традиции",
    text: "Обедайте там, где едят местные. Не бойтесь уличной еды — она свежая и вкусная.",
  },
  {
    icon: "Train",
    title: "Транспорт",
    text: "Высокоскоростные поезда — лучший способ передвижения. Купите проездные заранее онлайн.",
  },
  {
    icon: "Camera",
    title: "Фотография",
    text: "В храмах и святилищах уточняйте разрешение на съёмку. Рассвет в садах — магия.",
  },
];

const GALLERY = [
  { src: HERO_IMAGE, title: "Горный храм", country: "Япония" },
  { src: HERO_IMAGE, title: "Сакура в цвету", country: "Япония" },
  { src: HERO_IMAGE, title: "Великая стена", country: "Китай" },
  { src: HERO_IMAGE, title: "Рассвет в Кёнбоккун", country: "Южная Корея" },
  { src: HERO_IMAGE, title: "Террасы Юньнани", country: "Китай" },
  { src: HERO_IMAGE, title: "Ночной Сеул", country: "Южная Корея" },
];

const CAROUSEL_ITEMS = [
  {
    id: "kyoto",
    title: "Врата Фусими Инари",
    subtitle: "Киото, Япония",
    tag: "Культовое место",
    desc: "Тысячи алых ворот тории, уходящих в гору — самый узнаваемый символ Японии",
    target: "countries",
    countryIndex: 1,
    gradient: "from-rose-950/80 via-orange-900/40 to-transparent",
    accent: "#e8a87c",
    pattern: "radial-gradient(ellipse at 20% 50%, rgba(220,80,60,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(180,60,40,0.3) 0%, transparent 50%)",
  },
  {
    id: "wall",
    title: "Великая стена",
    subtitle: "Пекин, Китай",
    tag: "7 чудес света",
    desc: "Более 21 тысячи километров — крупнейшее архитектурное сооружение в истории человечества",
    target: "countries",
    countryIndex: 0,
    gradient: "from-stone-950/80 via-amber-900/30 to-transparent",
    accent: "#d4a85a",
    pattern: "radial-gradient(ellipse at 70% 30%, rgba(180,140,60,0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(100,80,40,0.3) 0%, transparent 50%)",
  },
  {
    id: "seoul",
    title: "Дворец Кёнбоккун",
    subtitle: "Сеул, Южная Корея",
    tag: "Главная резиденция",
    desc: "Грандиозный дворцовый комплекс XIV века с видом на небоскрёбы современного Сеула",
    target: "countries",
    countryIndex: 2,
    gradient: "from-blue-950/80 via-indigo-900/30 to-transparent",
    accent: "#8ab4d4",
    pattern: "radial-gradient(ellipse at 30% 60%, rgba(60,80,180,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, rgba(40,60,140,0.3) 0%, transparent 50%)",
  },
  {
    id: "fuji",
    title: "Гора Фудзи",
    subtitle: "Хонсю, Япония",
    tag: "Природное чудо",
    desc: "Священная вершина Японии — самая высокая точка страны и символ национальной идентичности",
    target: "routes",
    countryIndex: 1,
    gradient: "from-slate-950/80 via-cyan-900/20 to-transparent",
    accent: "#a8c4d4",
    pattern: "radial-gradient(ellipse at 50% 80%, rgba(40,100,160,0.4) 0%, transparent 60%), radial-gradient(ellipse at 90% 20%, rgba(20,60,100,0.3) 0%, transparent 50%)",
  },
  {
    id: "shanghai",
    title: "Набережная Бунд",
    subtitle: "Шанхай, Китай",
    tag: "Ночная жизнь",
    desc: "Контраст колониальной архитектуры и футуристических небоскрёбов — лицо современного Китая",
    target: "routes",
    countryIndex: 0,
    gradient: "from-zinc-950/80 via-emerald-900/20 to-transparent",
    accent: "#7dd4b0",
    pattern: "radial-gradient(ellipse at 40% 40%, rgba(20,120,80,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(10,80,60,0.3) 0%, transparent 50%)",
  },
  {
    id: "nara",
    title: "Парк Нара",
    subtitle: "Нара, Япония",
    tag: "Природа и история",
    desc: "Вольные олени среди пятиярусных пагод — здесь время замедляется и растворяется в тишине",
    target: "gallery",
    countryIndex: 1,
    gradient: "from-green-950/80 via-teal-900/30 to-transparent",
    accent: "#a8d4a0",
    pattern: "radial-gradient(ellipse at 60% 30%, rgba(40,120,60,0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(20,80,40,0.3) 0%, transparent 50%)",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "countries", label: "Страны" },
  { id: "routes", label: "Маршруты" },
  { id: "calendar", label: "Когда ехать" },
  { id: "tips", label: "Советы" },
  { id: "gallery", label: "Галерея" },
  { id: "contacts", label: "Контакты" },
];

const Index = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<typeof ROUTES[0] | null>(null);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSlide = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCarouselIdx(idx);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const prevSlide = () => goToSlide((carouselIdx - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  const nextSlide = () => goToSlide((carouselIdx + 1) % CAROUSEL_ITEMS.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCarouselClick = (item: typeof CAROUSEL_ITEMS[0]) => {
    if (item.target === "countries") {
      setActiveCountry(item.countryIndex);
    }
    scrollTo(item.target);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-['Cormorant_Garamond'] text-xl font-semibold tracking-wide text-foreground hover:text-[hsl(var(--accent))] transition-colors"
          >
            東方 · Восточный Путь
          </button>

          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm tracking-wide font-light transition-colors ${
                  activeNav === item.id
                    ? "text-[hsl(var(--accent))] active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm tracking-wide font-light text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO + CAROUSEL */}
      <section id="home" className="relative h-screen flex flex-col overflow-hidden">
        {/* Background slides */}
        {CAROUSEL_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === carouselIdx ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: item.pattern }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20" />
          </div>
        ))}

        <div className="absolute inset-0 wave-bg opacity-10" />

        {/* Top title — static */}
        <div className="relative z-10 text-center pt-28 pb-6 animate-fade-in-up">
          <p className="text-amber-200/60 text-xs tracking-[0.35em] uppercase font-['Golos_Text'] font-light">
            Китай · Япония · Южная Корея
          </p>
        </div>

        {/* Carousel content */}
        <div className="relative z-10 flex-1 flex items-end pb-32 px-6 md:px-16">
          <div className="max-w-6xl mx-auto w-full">
            {/* Active slide text */}
            <div
              className="mb-8 transition-all duration-500"
              style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(12px)" : "translateY(0)" }}
            >
              <div
                className="inline-block text-xs tracking-[0.25em] uppercase px-3 py-1 mb-4 font-['Golos_Text'] border"
                style={{
                  color: CAROUSEL_ITEMS[carouselIdx].accent,
                  borderColor: `${CAROUSEL_ITEMS[carouselIdx].accent}40`,
                  background: `${CAROUSEL_ITEMS[carouselIdx].accent}15`,
                }}
              >
                {CAROUSEL_ITEMS[carouselIdx].tag}
              </div>
              <h1 className="text-white font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light leading-tight mb-3">
                {CAROUSEL_ITEMS[carouselIdx].title}
              </h1>
              <p className="text-white/50 font-['Golos_Text'] text-sm tracking-widest mb-3 uppercase">
                {CAROUSEL_ITEMS[carouselIdx].subtitle}
              </p>
              <p className="text-white/70 font-['Golos_Text'] font-light text-base max-w-lg leading-relaxed mb-6">
                {CAROUSEL_ITEMS[carouselIdx].desc}
              </p>
              <button
                onClick={() => handleCarouselClick(CAROUSEL_ITEMS[carouselIdx])}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-7 py-2.5 text-sm tracking-widest uppercase font-['Golos_Text'] hover:bg-white/15 transition-all duration-300 group"
                style={{ borderColor: `${CAROUSEL_ITEMS[carouselIdx].accent}60` }}
              >
                Подробнее
                <Icon name="ArrowRight" size={13} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 items-end">
              {CAROUSEL_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    goToSlide(i);
                  }}
                  className="group relative flex-shrink-0 overflow-hidden border transition-all duration-400"
                  style={{
                    width: i === carouselIdx ? 120 : 60,
                    height: i === carouselIdx ? 70 : 50,
                    borderColor: i === carouselIdx ? `${item.accent}80` : "rgba(255,255,255,0.15)",
                    transition: "width 0.4s ease, height 0.4s ease, border-color 0.3s ease",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${HERO_IMAGE})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: item.pattern, opacity: 0.8 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-70`} />
                  {i === carouselIdx && (
                    <div className="absolute inset-0 flex items-end p-2">
                      <span className="text-white text-[9px] font-['Golos_Text'] tracking-wide leading-tight line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  )}
                </button>
              ))}

              {/* Arrows */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-4">
              {CAROUSEL_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="transition-all duration-400 rounded-full"
                  style={{
                    width: i === carouselIdx ? 24 : 6,
                    height: 3,
                    background: i === carouselIdx
                      ? CAROUSEL_ITEMS[carouselIdx].accent
                      : "rgba(255,255,255,0.25)",
                    transition: "width 0.4s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 scroll-bounce">
          <Icon name="ChevronsDown" size={18} className="text-white/30" />
        </div>
      </section>

      {/* COUNTRIES */}
      <section id="countries" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[hsl(var(--accent))] text-xs tracking-[0.3em] uppercase mb-4 font-['Golos_Text']">
            <span className="deco-line" />Направления
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-light text-foreground">
            Три страны — три мира
          </h2>
        </div>

        <div className="flex justify-center gap-0 mb-12 border border-border">
          {COUNTRIES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCountry(i)}
              className={`flex-1 py-3 px-6 text-sm font-['Golos_Text'] tracking-wide transition-all duration-300 ${
                activeCountry === i
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.flag} {c.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[hsl(var(--accent))] text-xs tracking-[0.25em] uppercase mb-3 font-['Golos_Text']">
              {COUNTRIES[activeCountry].tagline}
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-4xl font-light mb-6 text-foreground">
              {COUNTRIES[activeCountry].flag} {COUNTRIES[activeCountry].name}
            </h3>
            <p className="text-muted-foreground font-['Golos_Text'] font-light leading-relaxed mb-8 text-base">
              {COUNTRIES[activeCountry].desc}
            </p>
            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-foreground/50 font-['Golos_Text'] mb-4">
                Что посмотреть
              </p>
              {COUNTRIES[activeCountry].highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-['Golos_Text'] text-foreground/80">
                  <div className="w-1 h-1 rounded-full bg-[hsl(var(--accent))]" />
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative h-80 md:h-96 overflow-hidden"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-t ${COUNTRIES[activeCountry].color} to-transparent`} />
            <div className="absolute bottom-6 left-6">
              <span className="font-['Cormorant_Garamond'] text-white text-3xl italic">
                {COUNTRIES[activeCountry].name}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="ornament text-xs tracking-widest text-muted-foreground/40">✦</div>
      </div>

      {/* ROUTES */}
      <section id="routes" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[hsl(var(--accent))] text-xs tracking-[0.3em] uppercase mb-4 font-['Golos_Text']">
            <span className="deco-line" />Маршруты
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-light text-foreground">
            Готовые маршруты путешествий
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ROUTES.map((route, i) => (
            <div
              key={i}
              onClick={() => setSelectedRoute(route)}
              className="card-hover border border-border bg-card p-8 cursor-pointer group relative overflow-hidden"
            >
              {/* Accent corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${route.accent} to-transparent opacity-30 group-hover:opacity-60 transition-opacity`} />

              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground group-hover:border-[hsl(var(--accent))] group-hover:text-[hsl(var(--accent))] transition-colors">
                  <Icon name={route.icon} size={18} />
                </div>
                <div className="text-right">
                  <span className="block text-xs tracking-widest text-muted-foreground font-['Golos_Text'] uppercase mb-1">
                    {route.duration}
                  </span>
                  <span className="block text-sm font-['Golos_Text'] text-[hsl(var(--accent))] font-medium">
                    {route.price}
                  </span>
                </div>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light mb-2 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors">
                {route.title}
              </h3>
              <p className="text-xs text-muted-foreground tracking-wide mb-5 font-['Golos_Text']">
                {route.type}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {route.cities.map((city, ci) => (
                  <span key={ci} className="text-xs font-['Golos_Text'] text-foreground/70 bg-muted px-3 py-1">
                    {city}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-['Golos_Text'] text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors">
                <span>Подробный маршрут</span>
                <Icon name="ArrowRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALENDAR */}
      <section id="calendar" className="py-24 px-6 bg-card wave-bg">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[hsl(var(--accent))] text-xs tracking-[0.3em] uppercase mb-4 font-['Golos_Text']">
              <span className="deco-line" />Сезонность
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-5xl font-light text-foreground mb-4">
              Когда лучше ехать
            </h2>
            <p className="text-muted-foreground font-['Golos_Text'] font-light text-sm">
              Лучшие месяцы для каждой страны
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {Object.entries(SEASONS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-5 h-5 ${val.bg}`} />
                <span className="text-xs font-['Golos_Text'] text-muted-foreground">{val.label}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left pb-4 pr-6 font-['Golos_Text'] font-normal text-xs tracking-widest text-muted-foreground uppercase w-36">
                    Страна
                  </th>
                  {MONTHS.map((m) => (
                    <th key={m} className="pb-4 font-['Golos_Text'] font-normal text-xs tracking-wide text-muted-foreground text-center">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CALENDAR.map((row, ri) => (
                  <tr key={ri}>
                    <td className="py-2 pr-6 font-['Golos_Text'] text-sm text-foreground whitespace-nowrap">
                      {row.country}
                    </td>
                    {row.months.map((season, mi) => (
                      <td key={mi} className="py-2 px-1">
                        <div
                          className={`season-cell h-8 w-full rounded-sm ${SEASONS[season].bg} cursor-default`}
                          title={`${row.country} — ${MONTHS[mi]}: ${SEASONS[season].label}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-border bg-background/50">
              <p className="text-3xl mb-2">🌸</p>
              <p className="font-['Cormorant_Garamond'] text-lg font-light mb-2">Японская сакура</p>
              <p className="text-xs font-['Golos_Text'] text-muted-foreground">Конец марта — начало апреля. Цветение длится около 2 недель.</p>
            </div>
            <div className="text-center p-6 border border-border bg-background/50">
              <p className="text-3xl mb-2">🍂</p>
              <p className="font-['Cormorant_Garamond'] text-lg font-light mb-2">Осенние клёны</p>
              <p className="text-xs font-['Golos_Text'] text-muted-foreground">Октябрь — ноябрь в Японии и Корее. Багряные пейзажи.</p>
            </div>
            <div className="text-center p-6 border border-border bg-background/50">
              <p className="text-3xl mb-2">❄️</p>
              <p className="font-['Cormorant_Garamond'] text-lg font-light mb-2">Снежные фестивали</p>
              <p className="text-xs font-['Golos_Text'] text-muted-foreground">Февраль в Саппоро и на севере Китая. Ледяные скульптуры.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[hsl(var(--accent))] text-xs tracking-[0.3em] uppercase mb-4 font-['Golos_Text']">
            <span className="deco-line" />Полезное
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-light text-foreground">
            Советы путешественникам
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIPS.map((tip, i) => (
            <div key={i} className="group p-8 border border-border hover:border-[hsl(var(--accent))]/40 transition-colors">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground group-hover:text-[hsl(var(--accent))] group-hover:border-[hsl(var(--accent))]/50 transition-colors">
                  <Icon name={tip.icon} size={16} />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-foreground">{tip.title}</h3>
              </div>
              <p className="text-sm font-['Golos_Text'] font-light text-muted-foreground leading-relaxed">
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="ornament text-xs tracking-widest text-muted-foreground/40">✦</div>
      </div>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[hsl(var(--accent))] text-xs tracking-[0.3em] uppercase mb-4 font-['Golos_Text']">
            <span className="deco-line" />Фотографии
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-light text-foreground">
            Галерея
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className="gallery-item cursor-pointer"
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3", gridColumn: i === 0 ? "span 2" : undefined }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-['Cormorant_Garamond'] text-lg drop-shadow">{img.title}</p>
                <p className="text-white/70 text-xs font-['Golos_Text']">{img.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-300/60 text-xs tracking-[0.3em] uppercase mb-4 font-['Golos_Text']">
            Свяжитесь с нами
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-5xl font-light mb-6 text-background">
            Планируем путешествие<br />
            <em className="italic">вместе</em>
          </h2>
          <p className="text-background/60 font-['Golos_Text'] font-light mb-12 max-w-md mx-auto text-sm leading-relaxed">
            Напишите нам — и мы поможем составить маршрут вашей мечты по Азии
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto mb-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="bg-transparent border border-background/20 text-background placeholder:text-background/40 px-5 py-3 text-sm font-['Golos_Text'] font-light focus:outline-none focus:border-background/60 transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border border-background/20 text-background placeholder:text-background/40 px-5 py-3 text-sm font-['Golos_Text'] font-light focus:outline-none focus:border-background/60 transition-colors"
            />
          </div>
          <textarea
            placeholder="Куда хотите поехать и когда?"
            rows={4}
            className="w-full max-w-xl bg-transparent border border-background/20 text-background placeholder:text-background/40 px-5 py-3 text-sm font-['Golos_Text'] font-light focus:outline-none focus:border-background/60 transition-colors mb-6 block mx-auto resize-none"
          />
          <button className="inline-flex items-center gap-3 border border-background/40 text-background px-10 py-3 text-sm tracking-widest uppercase font-['Golos_Text'] hover:bg-background/10 transition-all duration-300">
            Отправить
            <Icon name="Send" size={14} />
          </button>

          <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-['Cormorant_Garamond'] text-lg text-background/60">
              東方 · Восточный Путь
            </span>
            <div className="flex gap-6">
              {["Instagram", "Telegram", "YouTube"].map((s) => (
                <button key={s} className="text-xs tracking-widest text-background/40 hover:text-background/80 transition-colors font-['Golos_Text'] uppercase">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE DETAIL OVERLAY */}
      {selectedRoute && (
        <div
          className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-end"
          onClick={() => setSelectedRoute(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative z-10 w-full md:w-[600px] h-full md:h-auto md:max-h-[90vh] bg-background overflow-y-auto shadow-2xl flex flex-col animate-slide-in-right"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className={`relative bg-gradient-to-br ${selectedRoute.accent} to-stone-900 p-8 pb-10`}>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
              />
              <button
                onClick={() => setSelectedRoute(null)}
                className="relative z-10 mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-['Golos_Text'] tracking-widest uppercase"
              >
                <Icon name="ArrowLeft" size={13} />
                Все маршруты
              </button>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs tracking-[0.25em] uppercase text-white/50 font-['Golos_Text']">{selectedRoute.type}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-xs tracking-[0.25em] uppercase text-white/50 font-['Golos_Text']">{selectedRoute.difficulty}</span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-2">
                  {selectedRoute.title}
                </h2>
                <p className="text-white/60 font-['Golos_Text'] font-light text-sm mb-5">
                  {selectedRoute.description}
                </p>
                {/* Key stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: "Clock", label: "Длительность", val: selectedRoute.duration },
                    { icon: "Users", label: "Группа", val: selectedRoute.group },
                    { icon: "Sun", label: "Сезон", val: selectedRoute.season },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/10 backdrop-blur px-3 py-3 rounded-sm">
                      <Icon name={stat.icon} size={13} className="text-white/50 mb-1" />
                      <p className="text-white/50 text-[9px] tracking-widest uppercase font-['Golos_Text'] mb-0.5">{stat.label}</p>
                      <p className="text-white text-xs font-['Golos_Text']">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-8">
              {/* Day-by-day */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-['Golos_Text'] mb-5">
                  Программа по дням
                </p>
                <div className="space-y-0">
                  {selectedRoute.days.map((d, i) => (
                    <div key={i} className="flex gap-5 group">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 flex-shrink-0 border border-border bg-card flex items-center justify-center text-[10px] font-['Golos_Text'] text-muted-foreground group-hover:border-[hsl(var(--accent))] group-hover:text-[hsl(var(--accent))] transition-colors">
                          {i + 1}
                        </div>
                        {i < selectedRoute.days.length - 1 && (
                          <div className="w-px flex-1 min-h-[20px] bg-border mt-1 mb-1" />
                        )}
                      </div>
                      <div className="pb-5">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-['Cormorant_Garamond'] text-lg font-light text-foreground">{d.city}</span>
                          <span className="text-[10px] tracking-widest text-muted-foreground font-['Golos_Text'] uppercase">День {d.day}</span>
                        </div>
                        <p className="text-sm font-['Golos_Text'] font-light text-muted-foreground leading-relaxed">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div className="mb-8">
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-['Golos_Text'] mb-4">
                  Включено в тур
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedRoute.includes.map((inc, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs font-['Golos_Text'] text-foreground/80 bg-muted px-3 py-1.5">
                      <Icon name="Check" size={10} className="text-[hsl(var(--accent))]" />
                      {inc}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-border pt-7 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-['Golos_Text'] mb-1">Стоимость тура</p>
                  <p className="font-['Cormorant_Garamond'] text-3xl font-light text-foreground">
                    {selectedRoute.price}
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedRoute(null); scrollTo("contacts"); }}
                  className="inline-flex items-center gap-3 bg-foreground text-background px-7 py-3 text-sm tracking-widest uppercase font-['Golos_Text'] hover:bg-foreground/90 transition-all"
                >
                  Забронировать
                  <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;