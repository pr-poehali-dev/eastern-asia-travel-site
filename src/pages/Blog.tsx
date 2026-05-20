import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_GRADIENT =
  "radial-gradient(ellipse at 30% 60%, rgba(180,80,50,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(120,80,40,0.12) 0%, transparent 50%)";

const TAGS = ["Все", "Япония", "Китай", "Корея", "Советы", "Гастрономия", "Природа"];

export const POSTS = [
  {
    id: "sakura-season",
    title: "Сезон сакуры: как не пропустить главный праздник Японии",
    subtitle: "Фронт цветения движется с юга на север — поймать его в нужный момент это целое искусство",
    tag: "Япония",
    date: "12 марта 2025",
    readTime: "8 мин",
    author: "Алёна Воронова",
    authorRole: "Гид, Токио",
    avatar: "АВ",
    cover: "radial-gradient(ellipse at 20% 80%, rgba(255,180,190,0.5) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(220,100,80,0.4) 0%, transparent 55%)",
    coverBg: "#1a0a0e",
    accentColor: "#e8a0a8",
    featured: true,
    intro: "Японцы называют это ханами — «любование цветами». Каждый год миллионы людей расстилают подстилки под деревьями, открывают термосы с саке и смотрят, как ветер уносит лепестки. Если вы хотите попасть на это действо, нужно планировать заранее.",
    sections: [
      {
        heading: "Когда и куда",
        text: "Цветение начинается в конце марта на Кюсю и Окинаве и к середине апреля добирается до Тохоку. Токио обычно цветёт в конце марта — первых числах апреля. Киото — чуть позже, около 5–10 апреля. Именно поэтому опытные путешественники берут две недели: стартуют в Токио и едут на север.",
      },
      {
        heading: "Лучшие места",
        text: "В Токио это парк Синдзюку Гёэн (1400 деревьев, вход 500 йен), набережная Мэгуро-гава с её туннелем из веток, и Уэно — самое шумное и народное ханами. В Киото — Марукама Коэн и путь Философа вдоль канала. В Нагано — замок Мацумото на фоне Альп, открыточная картинка.",
      },
      {
        heading: "Практические советы",
        text: "Бронируйте жильё за 3–4 месяца — в пиковые даты отели разбирают мгновенно. Не полагайтесь на прогнозы цветения: они часто ошибаются на 5–7 дней. Приходите в парки на рассвете — после 10 утра уже будет толпа. И обязательно попробуйте сакура-мочи: розовое рисовое пирожное в листе сакуры.",
      },
    ],
    quote: "Ханами — не просто красота. Это японское напоминание о том, что всё прекрасное мимолётно.",
    quoteAuthor: "Японская поговорка",
  },
  {
    id: "great-wall-sunrise",
    title: "Рассвет на Великой стене: как увидеть её без туристов",
    subtitle: "Участки, о которых молчат путеводители, и почему стоит вставать в 4 утра",
    tag: "Китай",
    date: "28 января 2025",
    readTime: "6 мин",
    author: "Дмитрий Орлов",
    authorRole: "Автор-путешественник",
    avatar: "ДО",
    cover: "radial-gradient(ellipse at 50% 80%, rgba(180,140,60,0.5) 0%, transparent 55%), radial-gradient(ellipse at 20% 20%, rgba(100,60,20,0.4) 0%, transparent 50%)",
    coverBg: "#0f0a02",
    accentColor: "#d4a84b",
    featured: false,
    intro: "Великая стена тянется на 21 000 км. Из них открыто для туристов меньше 1%. Из этого 1% большинство едут в Бадалин — и получают очередь, сувениры и разочарование. Мы расскажем, как сделать иначе.",
    sections: [
      {
        heading: "Участок Мутяньюй",
        text: "Здесь хорошо отреставрированные башни, канатная дорога и — главное — нет автобусов с организованными группами. Можно приехать к 8 утра и до 10 часов иметь стену практически в своём распоряжении. Осенью здесь горят красным кленовые леса — это одна из самых красивых картин Китая.",
      },
      {
        heading: "Дикие участки: Цзяньку и Хуанхуачэн",
        text: "Эти нереставрированные участки официально закрыты, но к ним можно добраться с местным гидом. Разрушенные башни, заросшие травой переходы, тишина — и вид, который не попадает в Instagram. Хуанхуачэн стоит над водохранилищем: кажется, что стена уходит прямо в воду.",
      },
      {
        heading: "Про рассвет",
        text: "Если хотите рассвет — ночуйте в деревне у подножия. Несколько фермерских домов принимают туристов, цена вопроса — 30–50 долларов. Вставайте в 4:30, берите фонарик и термос с чаем. Восход солнца над зубцами стены в полной тишине — это момент, ради которого стоило лететь в Китай.",
      },
    ],
    quote: "Тот, кто не побывал на Великой стене — не настоящий мужчина.",
    quoteAuthor: "Мао Цзэдун",
  },
  {
    id: "korean-food-guide",
    title: "Корейская еда: от кимчи до самгёпсаль — полный гид первого раза",
    subtitle: "Что заказывать, как есть, чего не бояться и где найти лучшие места в Сеуле",
    tag: "Гастрономия",
    date: "5 февраля 2025",
    readTime: "10 мин",
    author: "Юлия Ким",
    authorRole: "Гастрономический журналист",
    avatar: "ЮК",
    cover: "radial-gradient(ellipse at 70% 30%, rgba(180,60,50,0.5) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(80,30,20,0.4) 0%, transparent 55%)",
    coverBg: "#0d0404",
    accentColor: "#c05040",
    featured: false,
    intro: "Корейская кухня — это не просто острая еда. Это философия стола, где всё делится, всё жарится прямо перед тобой и где холодный чай наливают сами, без просьбы. Если вы первый раз в Корее, читайте внимательно.",
    sections: [
      {
        heading: "Обязательная программа",
        text: "Самгёпсаль — толстые полоски свиного брюшка на угольном гриле, заворачивают в листья салата с пастой твенджан. Пибимпаб — миска риса с овощами и яйцом, всё перемешивается прямо за столом. Токпокки — рисовые цилиндры в огненном соусе, уличная еда №1. Хэмультан — огненный суп с морепродуктами, который греет изнутри даже в январе.",
      },
      {
        heading: "Про кимчи",
        text: "Кимчи — это не гарнир, это образ жизни. В Корее его едят три раза в день, существует 300+ видов. Самый частый — пэчу кимчи из пекинской капусты. В ресторанах оно всегда на столе бесплатно и столько раз, сколько попросишь. Попробуйте кимчи чиге — суп с кимчи и тофу, особенно хорош зимой.",
      },
      {
        heading: "Где есть в Сеуле",
        text: "Рынок Кванджан — главный уличный рынок, работает с 1905 года. Хэмульпха в Норянджин — оптовый рыбный рынок, выбираете живую рыбу, вам её готовят прямо там. Квартал Мёндон — тысячи уличных лавок, пробуйте всё подряд. Ресторан Топ-ун во Инса-дон — традиционный ханок, медная посуда, обед как в XIX веке.",
      },
    ],
    quote: "В Корее голодным не останешься. Здесь даже отказ от добавки считается невежливым.",
    quoteAuthor: "Местная мудрость",
  },
  {
    id: "kyoto-off-season",
    title: "Киото в ноябре: как мы нашли тишину в самом посещаемом городе Японии",
    subtitle: "Ранние утра, закрытые улочки Гиона и секретный маршрут через южные районы",
    tag: "Япония",
    date: "20 ноября 2024",
    readTime: "7 мин",
    author: "Алёна Воронова",
    authorRole: "Гид, Токио",
    avatar: "АВ",
    cover: "radial-gradient(ellipse at 60% 70%, rgba(140,100,60,0.5) 0%, transparent 55%), radial-gradient(ellipse at 30% 20%, rgba(80,50,30,0.4) 0%, transparent 50%)",
    coverBg: "#080503",
    accentColor: "#b8893c",
    featured: false,
    intro: "Все знают Киото. Ворота Фусими Инари, Кинкакудзи, Арасияма. Но мало кто знает, что в 6 утра этот город принадлежит только вам — и нескольким монахам.",
    sections: [
      {
        heading: "Гион на рассвете",
        text: "Квартал гейш Гион — главная улица Ханамикодзи — в 6 утра пустая. Деревянные фасады мачия, фонари ещё не погасли, иногда в конце улицы промелькнёт фигура в кимоно. Если вы снимаете фото без единого туриста в кадре — это значит, что вы встали в нужное время.",
      },
      {
        heading: "Южный маршрут: Фусими и Дайго",
        text: "Большинство туристов не доезжают до южных районов. Фусими Момояма — замок, рисовые поля и тихие улочки. Фусими Инари в 7 утра — совсем другое место, чем в полдень. Дайго-дзи — один из старейших храмов Японии, пятиярусная пагода, осенние клёны. Сюда не привозят организованные группы.",
      },
      {
        heading: "Ноябрьские клёны",
        text: "Момидзи — любование осенними клёнами — не менее важный праздник, чем ханами. Сад Эйкандо горит оранжево-красным. В Нандзэн-дзи акведук утопает в листве. Храм Тофуку-дзи — лучшее место для момидзи в Киото, но туристы это знают, приходите к открытию.",
      },
    ],
    quote: "Настоящий Киото начинается там, где заканчиваются указатели на русском языке.",
    quoteAuthor: "Алёна Воронова",
  },
  {
    id: "jeju-island",
    title: "Остров Чеджу: вулкан, мандарины и женщины-ныряльщицы",
    subtitle: "Всё, что нужно знать о главном острове Южной Кореи за три дня",
    tag: "Корея",
    date: "15 декабря 2024",
    readTime: "9 мин",
    author: "Юлия Ким",
    authorRole: "Гастрономический журналист",
    avatar: "ЮК",
    cover: "radial-gradient(ellipse at 40% 60%, rgba(40,100,120,0.5) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(20,60,80,0.4) 0%, transparent 50%)",
    coverBg: "#020a0d",
    accentColor: "#4a9ab5",
    featured: false,
    intro: "Чеджу называют «Гавайями Кореи» — и это почти правда. Вулкан, прозрачный океан, мандариновые сады. Но есть кое-что, чего нет на Гавайях: хэнё — пожилые женщины, которые ныряют за морепродуктами без кислорода.",
    sections: [
      {
        heading: "Халласан",
        text: "Вулкан в центре острова — самая высокая точка Кореи (1950 м). Подъём занимает 4–5 часов, тропы Сонгпан и Ёнсиль хорошо маркированы. На вершине в ясную погоду видно материковую Корею. Последние несколько километров — выше линии леса, голый кратер с озером. В октябре гора горит красным.",
      },
      {
        heading: "Хэнё: последние из рода",
        text: "Хэнё — женщины-ныряльщицы, добывающие ушастиков, морских ежей и осьминогов. Они ныряют на 10–20 метров, задерживая дыхание на 2 минуты, без акваланга. Средний возраст хэнё сейчас — 70 лет. Молодёжь эту профессию не выбирает. UNESCO внесло традицию хэнё в нематериальное наследие человечества. Посмотреть на них можно у деревни Хэнё в Сеогвипо.",
      },
      {
        heading: "Что есть и пить",
        text: "Мандарины — главный символ острова, продаются повсюду с ноября по март. Хэмультан из свежих морепродуктов хэнё. Чёрная свинина хэйк ток с острова — отдельный культ, ресторанов с ней в Чеджу-си несколько десятков. Мандариновое вино и пиво — только здесь, везти домой обязательно.",
      },
    ],
    quote: "Чеджу — единственное место в мире, где пожилые женщины считаются профессиональными спортсменами.",
    quoteAuthor: "Репортаж UNESCO, 2016",
  },
  {
    id: "packing-asia",
    title: "Чемодан в Азию: что взять, что оставить дома и почему не стоит брать джинсы",
    subtitle: "Практический список от человека, который провёл в Азии суммарно больше года",
    tag: "Советы",
    date: "8 января 2025",
    readTime: "5 мин",
    author: "Дмитрий Орлов",
    authorRole: "Автор-путешественник",
    avatar: "ДО",
    cover: "radial-gradient(ellipse at 50% 50%, rgba(80,80,80,0.4) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(50,50,40,0.3) 0%, transparent 50%)",
    coverBg: "#060605",
    accentColor: "#a09070",
    featured: false,
    intro: "Я видел людей с чемоданами на колёсиках в горах Никко. Я видел девушку в джинсах в 35-градусный день в Осаке. Оба раза мне было больно. Вот честный список — что реально нужно в Азии.",
    sections: [
      {
        heading: "Одежда",
        text: "Лёгкие брюки из синтетики — они сохнут за ночь, в них пустят в любой храм, им не страшен дождь. Две-три футболки из мерино — не воняют даже после второго дня. Лёгкий пуховик или флиска — для ночных поездов и кондиционированных ресторанов. Удобные кроссовки — вы пройдёте 20 000 шагов в день. Тапочки в пакетике — в японских домах и многих ресторанах разуваются.",
      },
      {
        heading: "Технологии",
        text: "Портативный роутер или местная SIM — без этого никуда. Powerbank на 20 000 mAh — розеток в поездах мало. Адаптер типа А (плоские штырьки) — нужен в Японии, Китае и Корее. Скачайте офлайн-карты Google Maps или Maps.me заранее. В Китае без VPN не работают ни Google, ни Instagram, ни WhatsApp.",
      },
      {
        heading: "Что не брать",
        text: "Джинсы — тяжёлые, долго сохнут, жарко. Полотенце — в отелях есть, в хостелах можно купить за копейки. Много книг — возьмите читалку. Дорогие украшения — не нужны. Много наличных — в Японии банкоматы 7-Eleven выдают иностранным картам, в Корее принимают Visa везде.",
      },
    ],
    quote: "Лучший рюкзак — тот, что вы несёте сами. Если он слишком тяжёлый, вы взяли лишнего.",
    quoteAuthor: "Дмитрий Орлов",
  },
];

const Blog = () => {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("Все");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = activeTag === "Все" ? POSTS : POSTS.filter(p => p.tag === activeTag);
  const featured = POSTS.find(p => p.featured)!;
  const rest = filtered.filter(p => !p.featured || activeTag !== "Все");

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors text-xs tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={14} />
            На главную
          </button>
          <div className="flex items-center gap-2">
            <span className="font-['Cormorant_Garamond'] text-xl font-light text-foreground">東</span>
            <span className="text-xs tracking-[0.25em] uppercase text-foreground/60 font-light">Блог о путешествиях</span>
          </div>
          <div className="w-24" />
        </div>
      </nav>

      {/* HERO — Featured post */}
      {activeTag === "Все" && (
        <section className="pt-16">
          <div
            className="relative min-h-[75vh] flex items-end cursor-pointer group overflow-hidden"
            style={{ background: featured.coverBg }}
            onClick={() => navigate(`/blog/${featured.id}`)}
          >
            {/* Animated gradient bg */}
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ background: featured.cover, opacity: 0.9 }}
            />
            {/* Japanese pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            {/* Bottom gradient for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 font-light"
                    style={{ background: featured.accentColor + "30", color: featured.accentColor, border: `1px solid ${featured.accentColor}40` }}
                  >
                    {featured.tag}
                  </span>
                  <span className="text-white/40 text-xs font-light">Главная статья</span>
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-white leading-tight mb-4">
                  {featured.title}
                </h1>
                <p className="text-white/60 font-light text-base leading-relaxed mb-8 max-w-xl">
                  {featured.subtitle}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 flex items-center justify-center text-[10px] text-white font-medium">
                      {featured.avatar}
                    </div>
                    <div>
                      <p className="text-white/80 text-xs">{featured.author}</p>
                      <p className="text-white/40 text-[10px]">{featured.date} · {featured.readTime} чтения</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 text-xs tracking-widest uppercase group-hover:gap-3 transition-all"
                    style={{ color: featured.accentColor }}
                  >
                    Читать
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Tags filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="text-xs tracking-widest uppercase px-4 py-2 transition-all font-light"
              style={
                activeTag === tag
                  ? { background: "hsl(var(--foreground))", color: "hsl(var(--background))" }
                  : { border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }
              }
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {rest.map((post) => (
            <article
              key={post.id}
              className="bg-background cursor-pointer group"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              {/* Cover */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/2", background: post.coverBg }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: post.cover }}
                />
                {/* Japanese character watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className="font-['Cormorant_Garamond'] select-none"
                    style={{
                      fontSize: 120,
                      color: "rgba(255,255,255,0.04)",
                      lineHeight: 1,
                    }}
                  >
                    {post.tag === "Япония" ? "日" : post.tag === "Китай" ? "中" : post.tag === "Корея" ? "韓" : post.tag === "Гастрономия" ? "食" : post.tag === "Природа" ? "山" : "旅"}
                  </span>
                </div>
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 font-light"
                    style={{ background: post.accentColor + "25", color: post.accentColor, border: `1px solid ${post.accentColor}35` }}
                  >
                    {post.tag}
                  </span>
                </div>
                {/* Read time */}
                <div className="absolute bottom-4 right-4">
                  <span className="text-[10px] text-white/40 font-light">{post.readTime}</span>
                </div>
              </div>

              {/* Text */}
              <div className="p-6">
                <h2
                  className="font-['Cormorant_Garamond'] text-xl font-light leading-snug mb-3 transition-colors"
                  style={{ color: hoveredId === post.id ? "hsl(var(--accent))" : "hsl(var(--foreground))" }}
                >
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-xs font-light leading-relaxed mb-5 line-clamp-2">
                  {post.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-foreground flex items-center justify-center text-[9px] text-background font-medium flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div>
                      <p className="text-foreground/70 text-[11px]">{post.author}</p>
                      <p className="text-muted-foreground text-[10px]">{post.date}</p>
                    </div>
                  </div>
                  <Icon
                    name="ArrowRight"
                    size={14}
                    className="transition-transform group-hover:translate-x-1 text-muted-foreground"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted-foreground font-light">
            <p className="font-['Cormorant_Garamond'] text-3xl mb-3">Пока пусто</p>
            <p className="text-sm">В этой категории ещё нет статей</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-['Cormorant_Garamond'] text-2xl font-light text-foreground">東</span>
            <div>
              <p className="text-foreground text-sm font-light tracking-wider">Блог о путешествиях</p>
              <p className="text-muted-foreground text-xs">Азия глазами тех, кто живёт здесь</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs text-center">
            Истории, маршруты и советы — каждую неделю
          </p>
          <div className="flex gap-5">
            {["Telegram", "Instagram", "YouTube"].map(s => (
              <button key={s} className="text-xs tracking-widest text-muted-foreground/50 hover:text-foreground/80 transition-colors uppercase">
                {s}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
