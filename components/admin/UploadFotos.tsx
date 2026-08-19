"use client";

import { useState } from "react";
import Image from "next/image";
import { X, GripVertical, Loader2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type FotoUpload = { url: string };

function FotoItem({ foto, onRemove }: { foto: FotoUpload; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: foto.url,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative h-24 w-24 shrink-0 overflow-hidden rounded border ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <Image src={foto.url} alt="" fill sizes="96px" className="object-cover" />
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
      >
        <X size={12} />
      </button>
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-1 left-1 cursor-grab rounded-full bg-black/70 p-1 text-white"
      >
        <GripVertical size={12} />
      </div>
    </div>
  );
}

export function UploadFotos({
  fotos,
  onChange,
}: {
  fotos: FotoUpload[];
  onChange: (fotos: FotoUpload[]) => void;
}) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErro("");
    setEnviando(true);

    try {
      const novas: FotoUpload[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Falha no upload");
        const data = await res.json();
        novas.push({ url: data.url });
      }
      onChange([...fotos, ...novas]);
    } catch {
      setErro("Não foi possível enviar uma ou mais fotos. Verifique o token do Vercel Blob.");
    } finally {
      setEnviando(false);
    }
  }

  function handleRemove(url: string) {
    onChange(fotos.filter((f) => f.url !== url));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fotos.findIndex((f) => f.url === active.id);
    const newIndex = fotos.findIndex((f) => f.url === over.id);
    onChange(arrayMove(fotos, oldIndex, newIndex));
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm uppercase tracking-wide text-neutral-500">Fotos</label>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fotos.map((f) => f.url)} strategy={horizontalListSortingStrategy}>
          <div className="flex flex-wrap gap-3">
            {fotos.map((foto) => (
              <FotoItem key={foto.url} foto={foto} onRemove={() => handleRemove(foto.url)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <label className="flex w-fit cursor-pointer items-center gap-2 rounded border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-neutral-500">
        {enviando ? <Loader2 size={16} className="animate-spin" /> : null}
        {enviando ? "Enviando..." : "Adicionar fotos"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={enviando}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {erro && <p className="text-sm text-red-600">{erro}</p>}
    </div>
  );
}
