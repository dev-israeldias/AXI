import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Leitura pública (sem cookies): mantém a home estática/ISR e economiza requisições.
export const publicClient = () => createClient(url, key);

export async function authClient() {
  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list: { name: string; value: string; options?: any }[]) => {
  try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {}
},
    },
  });
}

export async function isAdmin() {
  const sb = await authClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user?.email) return false;
  const { data } = await sb.from("admins").select("email").eq("email", user.email).maybeSingle();
  return !!data;
}
