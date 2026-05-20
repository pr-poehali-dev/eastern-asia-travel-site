import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { POSTS } from "./Blog";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);

  const post = POSTS.find(p => p.id === id);
  const otherPosts = POSTS.filter(p => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Cormorant_Garamond'] text-4xl font-light text-foreground mb-4">Статья не найдена</p>
          <button onClick={() => navigate("/blog")} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            ← Вернуться в блог
          </button>
        </div>
      </div>
    );
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setReadingProgress(Math.min(100, progress));
  };

  const hieroglyph =
    post.tag === "Япония" ? "日本" :
    post.tag === "Китай" ? "中国" :
    post.tag === "Корея" ? "韓國" :
    post.tag === "Гастрономия" ? "美食" :
    post.tag === "Природа" ? "自然" : "旅行";

  return (
    <div
      className="min-h-screen bg-background overflow-y-auto"
      style={{ fontFamily: "'Golos Text', sans-serif" }}
      onScroll={handleScroll}
    >
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-border">
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${readingProgress}%`, background: post.accentColor }}
        />
      </div>

      {/* NAV */}
      <nav className="fixed top-0.5 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-3 text-foreground/50 hover:text-foreground transition-colors text-xs tracking-widest uppercase"
          >
            <Icon name="ArrowLeft" size={14} />
            Блог
          </button>
          <div className="flex items-center gap-2">
            <span className="font-['Cormorant_Garamond'] text-xl font-light text-foreground">東</span>
          </div>
          <div
            className="text-xs tracking-widest uppercase px-3 py-1.5 font-light"
            style={{ color: post.accentColor, border: `1px solid ${post.accentColor}40`, background: post.accentColor + "15" }}
          >
            {post.tag}
          </div>
        </div>
      </nav>

      {/* COVER */}
      <div
        className="relative pt-16 min-h-[60vh] flex items-end overflow-hidden"
        style={{ background: post.coverBg }}
      >
        <div
          className="absolute inset-0"
          style={{ background: post.cover, opacity: 0.85 }}
        />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        {/* Big hieroglyph */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none overflow-hidden">
          <span
            className="font-['Cormorant_Garamond'] select-none leading-none"
            style={{ fontSize: 280, color: "rgba(255,255,255,0.04)" }}
          >
            {hieroglyph}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 w-full">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 font-light"
              style={{ background: post.accentColor + "30", color: post.accentColor, border: `1px solid ${post.accentColor}40` }}
            >
              {post.tag}
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light text-white leading-tight mb-5 max-w-3xl">
            {post.title}
          </h1>
          <p className="text-white/55 font-light text-lg leading-relaxed mb-10 max-w-2xl">
            {post.subtitle}
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 flex items-center justify-center text-xs text-white font-medium border border-white/20">
                {post.avatar}
              </div>
              <div>
                <p className="text-white/80 text-sm font-light">{post.author}</p>
                <p className="text-white/40 text-xs">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Icon name="Calendar" size={12} />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Icon name="Clock" size={12} />
              {post.readTime} чтения
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">

          {/* Intro */}
          <p className="font-['Cormorant_Garamond'] text-2xl font-light text-foreground leading-relaxed mb-12"
            style={{ borderLeft: `3px solid ${post.accentColor}`, paddingLeft: 24 }}>
            {post.intro}
          </p>

          {/* Decorative separator */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-border" />
            <span className="font-['Cormorant_Garamond'] text-xl" style={{ color: post.accentColor }}>✦</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Sections */}
          {post.sections.map((section, i) => (
            <div key={i} className="mb-12">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-foreground mb-5">
                <span style={{ color: post.accentColor }} className="text-xl mr-2 font-normal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <p className="text-foreground/75 font-light text-base leading-loose">
                {section.text}
              </p>
            </div>
          ))}

          {/* Pull quote */}
          <div
            className="my-14 py-10 px-10 text-center relative"
            style={{ background: post.accentColor + "0c", border: `1px solid ${post.accentColor}25` }}
          >
            <div
              className="font-['Cormorant_Garamond'] text-6xl leading-none mb-4 select-none"
              style={{ color: post.accentColor + "50" }}
            >
              "
            </div>
            <p className="font-['Cormorant_Garamond'] text-2xl font-light text-foreground italic leading-relaxed mb-5">
              {post.quote}
            </p>
            <p className="text-xs tracking-widest uppercase font-light" style={{ color: post.accentColor }}>
              — {post.quoteAuthor}
            </p>
          </div>

          {/* Author card */}
          <div className="mt-14 pt-10 border-t border-border flex items-center gap-5">
            <div
              className="w-14 h-14 flex items-center justify-center text-sm font-medium flex-shrink-0"
              style={{ background: post.accentColor + "20", color: post.accentColor, border: `1px solid ${post.accentColor}30` }}
            >
              {post.avatar}
            </div>
            <div>
              <p className="font-['Cormorant_Garamond'] text-xl font-light text-foreground">{post.author}</p>
              <p className="text-muted-foreground text-xs font-light">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </article>

      {/* MORE POSTS */}
      <section className="border-t border-border bg-card py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8 font-light">
            Ещё из блога
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {otherPosts.map((p) => (
              <article
                key={p.id}
                className="bg-card cursor-pointer group"
                onClick={() => navigate(`/blog/${p.id}`)}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/2", background: p.coverBg }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: p.cover }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="font-['Cormorant_Garamond'] select-none"
                      style={{ fontSize: 80, color: "rgba(255,255,255,0.05)", lineHeight: 1 }}
                    >
                      {p.tag === "Япония" ? "日" : p.tag === "Китай" ? "中" : p.tag === "Корея" ? "韓" : "旅"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-2 font-light"
                    style={{ color: p.accentColor }}
                  >
                    {p.tag}
                  </p>
                  <h3 className="font-['Cormorant_Garamond'] text-lg font-light text-foreground group-hover:text-[hsl(var(--accent))] transition-colors leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-light">{p.date} · {p.readTime}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={13} />
            Все статьи
          </button>
          <span className="font-['Cormorant_Garamond'] text-lg font-light text-foreground/30">東</span>
          <button
            onClick={() => navigate("/")}
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            На главную →
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
