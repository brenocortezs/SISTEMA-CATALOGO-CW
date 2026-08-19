"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

export function Lightbox({
  fotos,
  initialIndex,
  alt,
  onClose,
}: {
  fotos: { url: string }[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const lastTap = useRef(0);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") irPara(index - 1);
      if (e.key === "ArrowRight") irPara(index + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function irPara(novoIndex: number) {
    if (scale > 1) return;
    const total = fotos.length;
    setIndex(((novoIndex % total) + total) % total);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }

  function resetZoom() {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }

  function toggleZoom() {
    if (scale > 1) resetZoom();
    else setScale(DOUBLE_TAP_SCALE);
  }

  function handlePointerDown(e: React.PointerEvent) {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchStart.current = { dist, scale };
      panStart.current = null;
    } else if (pointers.current.size === 1) {
      const now = Date.now();
      if (now - lastTap.current < 280) {
        toggleZoom();
      }
      lastTap.current = now;

      if (scale > 1) {
        panStart.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
      }
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const pts = Array.from(pointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const novaScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, pinchStart.current.scale * (dist / pinchStart.current.dist))
      );
      setScale(novaScale);
    } else if (pointers.current.size === 1 && panStart.current) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setTranslate({ x: panStart.current.tx + dx, y: panStart.current.ty + dy });
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    panStart.current = null;
    if (pointers.current.size < 2) pinchStart.current = null;
    if (scale <= 1) resetZoom();
  }

  const foto = fotos[index];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-ink-bg">
      <div className="flex items-center justify-between px-4 py-3 text-ink-text">
        <span className="text-xs uppercase tracking-[0.08em] text-ink-muted">
          {index + 1} / {fotos.length}
        </span>
        <button aria-label="Fechar" onClick={onClose} className="p-1">
          <X size={24} />
        </button>
      </div>

      <div
        className="relative flex-1 touch-none overflow-hidden select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transition: pointers.current.size > 0 ? "none" : "transform 0.2s ease-out",
          }}
        >
          <Image src={foto.url} alt={`${alt} - foto ${index + 1}`} fill className="object-contain" priority />
        </div>

        {scale === 1 && fotos.length > 1 && (
          <>
            <button
              aria-label="Foto anterior"
              onClick={() => irPara(index - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-ink-text/10 p-2 text-ink-text hover:bg-ink-text/20"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Próxima foto"
              onClick={() => irPara(index + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-ink-text/10 p-2 text-ink-text hover:bg-ink-text/20"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {scale === 1 && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-ink-muted">
            <ZoomIn size={12} />
            Toque duas vezes ou belisque para dar zoom
          </div>
        )}
      </div>
    </div>
  );
}
