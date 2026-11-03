import { publicClient } from "./supabase";

export const DEFAULTS: Record<string, string> = {
  "hero.title": "Transformando visão estratégica em arquitetura digital de alta performance.",
  "hero.sub": "Engenharia de software, design minimalista e soluções web sob medida para impulsionar marcas que lideram o futuro.",
  "hero.cta1": "Iniciar um Projeto",
  "hero.cta2": "Conhecer a AXIS",
  "ceo.title": "Tecnologia com propósito, precisão e resultado.",
  "ceo.p1": "Olá, sou Israel Dias, desenvolvedor de software, empresário e fundador da AXIS — Engineering & Interactive.",
  "ceo.p2": "Minha trajetória é movida pela paixão por resolver problemas complexos através de código limpo, interfaces intuitivas e infraestruturas robustas. Para mim, um site ou sistema web não é apenas um cartão de visitas digital — é a espinha dorsal de autoridade, conversão e crescimento de um negócio.",
  "ceo.p3": "À frente da AXIS, lidero a criação de plataformas web totalmente personalizadas, desenvolvidas sob medida para a necessidade de cada cliente. Combinando rigor técnico, inovação contínua e um olhar atento ao minimalismo funcional, entrego soluções digitais que não apenas acompanham o mercado, mas ditarão os novos padrões da web.",
  "pillars.title": "O que nos move",
  "pillar1.title": "Arquitetura Sob Medida",
  "pillar1.text": "Cada projeto é único. Desenvolvemos ecossistemas web do zero, garantindo performance impecável, segurança avançada e total alinhamento com a identidade e objetivos do seu negócio.",
  "pillar2.title": "Inovação & Alta Performance",
  "pillar2.text": "Utilizamos as tecnologias mais modernas do mercado para entregar plataformas velozes, otimizadas para mecanismos de busca (SEO) e preparadas para escalar junto com a sua empresa.",
  "pillar3.title": "Experiência & Minimalismo (UI/UX)",
  "pillar3.text": "Interfaces desenhadas com foco na clareza e na fluidez da jornada do usuário. Onde o design refinado encontra a eficiência técnica.",
  "manifesto.text": "No universo digital moderno, a mediocridade não tem espaço. Na AXIS, tratamos cada linha de código como engenharia de precisão. O objetivo não é apenas criar um site, é erguer a plataforma central de onde a sua marca vai dominar o seu mercado.",
  "manifesto.author": "Israel Dias, CEO & Founder",
  "final.title": "Pronto para elevar o patamar da sua presença digital?",
  "final.text": "Vamos conversar sobre como a AXIS pode desenhar a solução ideal para os seus objetivos de negócio.",
  "final.cta": "Entrar em Contato com Israel Dias",
  "img.ceo": "",
};

export async function getContent() {
  const out = { ...DEFAULTS };
  try {
    const { data } = await publicClient().from("site_content").select("key,value");
    data?.forEach((r) => { out[r.key] = r.value; });
  } catch {}
  return out;
}
