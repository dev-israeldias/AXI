import { login } from "@/lib/actions";

export default async function Login({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  const field = "mt-2 w-full rounded-md border border-white/15 bg-transparent px-4 py-3 outline-none focus:border-sky-300";
  return (
    <main className="grid min-h-svh place-items-center px-6">
      <form action={login} className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-semibold">Acesso do administrador</h1>
        <label className="mt-8 block text-sm text-[#8b97ad]">E-mail
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="mt-5 block text-sm text-[#8b97ad]">Senha
          <input name="password" type="password" required autoComplete="current-password" className={field} />
        </label>
        {erro && <p className="mt-4 text-sm text-red-300">E-mail ou senha incorretos, ou sem permissão de administrador.</p>}
        <button className="mt-8 w-full rounded-full bg-white py-3 font-medium text-slate-900 hover:bg-sky-200">Entrar</button>
      </form>
    </main>
  );
}
