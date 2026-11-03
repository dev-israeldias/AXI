import Home from "@/components/Home";
import { getContent } from "@/lib/content";

export const revalidate = 3600; // ISR: poucas leituras no Supabase; salvar no admin revalida na hora

export default async function Page() {
  return <Home c={await getContent()} edit={false} />;
}
