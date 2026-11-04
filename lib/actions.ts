"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authClient, isAdmin } from "./supabase";

export async function login(fd: FormData) {
  const sb = await authClient();
  const { error } = await sb.auth.signInWithPassword({
    email: String(fd.get("email")), password: String(fd.get("password")),
  });
  if (error || !(await isAdmin())) {
    await sb.auth.signOut();
    redirect("/login?erro=1");
  }
  redirect("/admin");
}

export async function logout() {
  await (await authClient()).auth.signOut();
  redirect("/");
}

export async function saveText(key: string, value: string) {
  if (!(await isAdmin())) throw new Error("Não autorizado");
  const { error } = await (await authClient()).from("site_content").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function uploadImage(key: string, fd: FormData) {
  if (!(await isAdmin())) throw new Error("Não autorizado");
  const file = fd.get("file") as File;
  if (!file.type.startsWith("image/") || file.size > 900_000) throw new Error("Imagem inválida ou acima de 900 KB");
  const sb = await authClient();
  const path = `${key}-${Date.now()}.webp`;
  const up = await sb.storage.from("site-images").upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (up.error) throw new Error(up.error.message);
  const { data } = sb.storage.from("site-images").getPublicUrl(path);
  await saveText(key, data.publicUrl);
  return data.publicUrl;
}
