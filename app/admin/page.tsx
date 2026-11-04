import { redirect } from "next/navigation";
import Home from "@/components/Home";
import { getContent } from "@/lib/content";
import { isAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Admin() {
  if (!(await isAdmin())) redirect("/login");
  return <Home c={await getContent()} edit />;
}
