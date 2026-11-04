import { T, Img } from "./Editable";
import { logout } from "@/lib/actions";

const wa = (msg: string) =>
  `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? ""}?text=${encodeURIComponent(msg)}`;

export default function Home({ c, edit }: { c: Record<string, string>; edit: boolean }) {
  const t = (k: string, as: React.ElementType, className = "") => <T k={k} value={c[k]} edit={edit} as={as} className={className} />;
  const btn = "inline-flex items-center rounded-full px-6 py-3 text-[15px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300";
  return (
    <>
      {edit && (
        <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-sky-300 px-4 py-2 text-sm text-slate-900">
          <span>Modo edição: clique em qualquer texto, edite e clique fora para salvar.</span>
          <form action={logout}><button className="underline">Sair</button></form>
        </div>
      )}

      <header className={`absolute inset-x-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 ${edit ? "top-9" : "top-0"}`}>
        <span className="font-display text-xl font-bold tracking-tight">AXIS</span>
        <nav className="flex items-center gap-6">
          <a href="#sobre" className="text-sm text-[#b4bed1] hover:text-white">Sobre</a>
          <a href="/login" className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">Área do Criador</a>
        </nav>
      </header>

      {/* HERO — fundo liso com degradê */}
      <section className="axis-hero relative flex min-h-[92svh] items-end px-6 pb-20 pt-40">
        <div className="mx-auto w-full max-w-6xl">
          {t("hero.title", "h1", "font-display max-w-4xl text-balance text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[1.02] tracking-tight")}
          {t("hero.sub", "p", "mt-8 max-w-xl text-lg leading-relaxed text-[#8b97ad]")}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={wa("Olá, Israel! Quero iniciar um projeto com a AXIS.")} target="_blank" rel="noopener" className={`${btn} bg-white text-slate-900 hover:bg-slate-200`}>
              {t("hero.cta1", "span")}
            </a>
            <a href="#sobre" className={`${btn} bg-slate-200 text-slate-900 hover:bg-white`}>
              {t("hero.cta2", "span")}
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE O CEO */}
      <section id="sobre" className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(0,320px)_1fr]">
          <Img k="img.ceo" src={c["img.ceo"]} edit={edit} alt="Israel Dias, CEO da AXIS" className="aspect-[4/5] w-full rounded-sm" />
          <div>
            {t("ceo.title", "h2", "font-display max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl")}
            <div className="mt-8 max-w-[62ch] space-y-5 text-[17px] leading-[1.75] text-[#b4bed1]">
              {t("ceo.p1", "p", "text-white")}
              {t("ceo.p2", "p")}
              {t("ceo.p3", "p")}
            </div>
          </div>
        </div>
      </section>

      {/* PILARES — colunas separadas por linhas, sem cards */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {t("pillars.title", "h2", "font-display text-3xl font-semibold tracking-tight md:text-4xl")}
          <div className="mt-14 grid border-t border-white/15 md:grid-cols-3 md:divide-x md:divide-white/15">
            {[1, 2, 3].map((n) => (
              <div key={n} className="py-10 md:px-8 md:first:pl-0 md:last:pr-0">
                {t(`pillar${n}.title`, "h3", "font-display text-xl font-semibold")}
                {t(`pillar${n}.text`, "p", "mt-4 leading-relaxed text-[#8b97ad]")}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="px-6 py-32">
        <figure className="mx-auto max-w-5xl">
          <blockquote>{t("manifesto.text", "p", "font-display text-balance text-3xl font-medium leading-snug tracking-tight md:text-5xl md:leading-[1.15]")}</blockquote>
          <figcaption className="mt-10 text-[#8b97ad]">{t("manifesto.author", "span")}</figcaption>
        </figure>
      </section>

      {/* CTA FINAL */}
      <footer className="border-t border-white/10 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          {t("final.title", "h2", "font-display max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl")}
          {t("final.text", "p", "mt-6 max-w-xl text-lg text-[#8b97ad]")}
          <a href={wa("Olá, Israel! Vim pelo site da AXIS e gostaria de conversar.")} target="_blank" rel="noopener" className={`${btn} mt-10 bg-white text-slate-900 hover:bg-slate-200`}>
            {t("final.cta", "span")}
          </a>
          <p className="mt-24 text-sm text-[#5d6980]">© {new Date().getFullYear()} AXIS — Engineering & Interactive</p>
        </div>
      </footer>

      {!edit && (
        <a href={wa("Olá! Vim pelo site da AXIS.")} target="_blank" rel="noopener" aria-label="Falar no WhatsApp"
           className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-slate-900 shadow-lg transition hover:scale-105">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.300 1.200-1.800 1.200-.5.1-1 .2-3.200-.7-2.700-1.100-4.400-3.800-4.500-4-.1-.2-1.100-1.400-1.100-2.700s.7-1.900.9-2.200c.2-.2.5-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.200.1.300 0 .5l-.3.400-.4.500c-.1.100-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.700-.1 1.300Z"/></svg>
        </a>
      )}
    </>
  );
}
