"use client";
import { useState, useTransition, type ElementType } from "react";
import { saveText, uploadImage } from "@/lib/actions";

export function T({ k, value, edit, as = "p", className = "" }: {
  k: string; value: string; edit: boolean; as?: ElementType; className?: string;
}) {
  const Tag = as;
  const [st, setSt] = useState<"" | "salvando" | "salvo" | "erro">("");
  const [, start] = useTransition();
  if (!edit) return <Tag className={className}>{value}</Tag>;
  return (
    <Tag
      contentEditable suppressContentEditableWarning spellCheck={false}
      title={st === "salvando" ? "Salvando…" : st === "salvo" ? "Salvo" : st === "erro" ? "Erro ao salvar" : "Clique para editar"}
      className={`${className} cursor-text rounded-sm outline-1 outline-dashed focus:outline-2 focus:outline-solid ${
        st === "erro" ? "outline-red-400" : st === "salvo" ? "outline-emerald-400" : "outline-sky-300/50 focus:outline-sky-300"}`}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const v = e.currentTarget.innerText.trim();
        if (!v || v === value) return;
        setSt("salvando");
        start(async () => { try { await saveText(k, v); setSt("salvo"); } catch { setSt("erro"); } });
      }}
    >{value}</Tag>
  );
}

// Reduz a imagem no navegador (WebP, até 1600px) para caber no plano free do Storage.
async function compress(file: File): Promise<File> {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  for (const q of [0.82, 0.7, 0.55, 0.4]) {
    const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), "image/webp", q));
    if (blob.size <= 850_000) return new File([blob], "img.webp", { type: "image/webp" });
  }
  throw new Error("grande demais");
}

export function Img({ k, src, edit, alt, className = "" }: {
  k: string; src: string; edit: boolean; alt: string; className?: string;
}) {
  const [url, setUrl] = useState(src);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className={`relative overflow-hidden bg-[#141c2e] ${className}`}>
      {url && <img src={url} alt={alt} className="h-full w-full object-cover" loading="lazy" />}
      {!url && <div className="grid h-full w-full place-items-center text-sm text-[#8b97ad]">{edit ? "Sem imagem — envie uma" : ""}</div>}
      {edit && (
        <label className="absolute inset-x-3 bottom-3 cursor-pointer rounded bg-black/70 px-3 py-2 text-center text-sm backdrop-blur hover:bg-black/90">
          {busy ? "Enviando…" : err || "Trocar imagem"}
          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            setBusy(true); setErr("");
            try { const fd = new FormData(); fd.set("file", await compress(f)); setUrl(await uploadImage(k, fd)); }
            catch { setErr("Falha no envio"); }
            setBusy(false);
          }} />
        </label>
      )}
    </div>
  );
}
