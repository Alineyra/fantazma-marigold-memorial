import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import fantazma from "@/assets/fantazma.jpg";
import cara from "@/assets/fantazma-cara.jpg";
import mictlan from "@/assets/mictlan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Fantazma · Camino al Mictlán" },
      { name: "description", content: "Altar digital de Día de Muertos para Fantazma, mi perrito, guiado por cempasúchil hacia el Mictlán." },
      { property: "og:title", content: "Altar de Fantazma · Camino al Mictlán" },
      { property: "og:description", content: "Un altar digital con cempasúchil, papel picado y veladoras para Fantazma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const picadoColors = ["fill-pink", "fill-primary", "fill-secondary", "fill-teal", "fill-accent"];

function Marigold({ size = 48, className = "" }: { size?: number; className?: string }) {
  const rings = [
    { r: 22, n: 16, c: "fill-primary" },
    { r: 15, n: 12, c: "fill-accent" },
    { r: 8, n: 8, c: "fill-primary" },
  ];
  return (
    <svg width={size} height={size} viewBox="-30 -30 60 60" className={className}>
      {rings.map((ring, i) =>
        Array.from({ length: ring.n }).map((_, j) => (
          <ellipse key={`${i}-${j}`} cx="0" cy={-ring.r / 1.6} rx={ring.r / 3.2} ry={ring.r / 2} className={ring.c}
            transform={`rotate(${(360 / ring.n) * j + i * 10})`} opacity={0.95} />
        )),
      )}
      <circle r="4" className="fill-secondary" />
    </svg>
  );
}

function PapelPicado() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center">
      <div className="absolute top-2 h-px w-full bg-accent/60" />
      <div className="flex gap-1 pt-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <svg key={i} width="80" height="96" viewBox="0 0 80 96" className="picado" style={{ animationDelay: `${i * 0.2}s` }}>
            <path d="M0 0H80V84L72 96L64 84L56 96L48 84L40 96L32 84L24 96L16 84L8 96L0 84Z"
              className={picadoColors[i % picadoColors.length]} opacity={0.92} />
            <circle cx="40" cy="30" r="10" className="fill-background" />
            <circle cx="36" cy="28" r="2.5" className={picadoColors[i % picadoColors.length]} />
            <circle cx="44" cy="28" r="2.5" className={picadoColors[i % picadoColors.length]} />
            <path d="M14 56 L22 48 L30 56 L22 64Z M50 56 L58 48 L66 56 L58 64Z" className="fill-background" />
            <rect x="34" y="52" width="12" height="12" rx="6" className="fill-background" />
            <path d="M10 14h6v6h-6z M64 14h6v6h-6z" className="fill-background" />
          </svg>
        ))}
      </div>
    </div>
  );
}

function Petals() {
  const petals = useMemo(
    () => Array.from({ length: 34 }).map((_, i) => ({
      left: (i * 37) % 100, dur: 7 + ((i * 13) % 9), delay: -((i * 7) % 14), size: 10 + ((i * 5) % 14), drift: ((i % 7) - 3) * 40,
    })), [],
  );
  return (
    <>
      {petals.map((p, i) => (
        <svg key={i} className="petal" width={p.size} height={p.size} viewBox="0 0 20 20"
          style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, ["--drift" as string]: `${p.drift}px` }}>
          <path d="M10 0 C17 6 17 14 10 20 C3 14 3 6 10 0Z" className={i % 3 ? "fill-primary" : "fill-accent"} />
        </svg>
      ))}
    </>
  );
}

function Veladora({ delay = 0 }: { delay?: number }) {
  return (
    <div className="grow flex flex-col items-center">
      <svg width="28" height="44" viewBox="0 0 28 44" className="flame" style={{ animationDelay: `${delay}s` }}>
        <path d="M14 0 C24 16 24 30 14 44 C4 30 4 16 14 0Z" className="fill-primary" />
        <path d="M14 14 C19 24 19 32 14 42 C9 32 9 24 14 14Z" className="fill-flame" />
      </svg>
      <div className="relative h-36 w-24 overflow-hidden rounded-t-md rounded-b-lg border-4 border-secondary bg-wax shadow-[var(--glow-orange)]">
        <img src={cara} alt="Fantazma en la veladora" loading="lazy" className="absolute left-1/2 top-4 h-20 w-20 -translate-x-1/2 rounded-full border-2 border-primary object-cover" />
        <p className="absolute inset-x-0 bottom-2 text-center font-script text-sm text-secondary">Fantazma</p>
      </div>
    </div>
  );
}

function Arco() {
  const n = 26;
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: n }).map((_, i) => {
        const a = Math.PI - (Math.PI * i) / (n - 1);
        const x = 50 + Math.cos(a) * 46;
        const y = 54 - Math.sin(a) * 50;
        return (
          <div key={i} className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
            <Marigold size={i % 2 ? 54 : 66} className="grow" />
          </div>
        );
      })}
      {[60, 72, 84, 96].flatMap((y) => [4, 96].map((x) => (
        <div key={`${x}-${y}`} className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <Marigold size={60} className="grow" />
        </div>
      )))}
    </div>
  );
}

function Nariz({ onPress }: { onPress: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-background px-6 text-center" style={{ backgroundImage: "var(--gradient-night)" }}>
      <p className="font-display text-3xl text-primary glow-text md:text-5xl">Fantazma te espera</p>
      <button onClick={onPress} aria-label="Apretar la nariz de Fantazma para entrar" className="nose-pulse grow rounded-full">
        <svg width="200" height="160" viewBox="0 0 200 160" className="drop-shadow-[0_0_30px_var(--primary)]">
          <path d="M100 150 C40 150 10 110 14 70 C18 30 60 10 100 10 C140 10 182 30 186 70 C190 110 160 150 100 150Z" className="fill-nose" />
          <ellipse cx="66" cy="78" rx="20" ry="26" className="fill-background" transform="rotate(-20 66 78)" />
          <ellipse cx="134" cy="78" rx="20" ry="26" className="fill-background" transform="rotate(20 134 78)" />
          <ellipse cx="80" cy="36" rx="30" ry="10" className="fill-foreground" opacity="0.25" />
          <path d="M100 110 V150" className="stroke-background" strokeWidth="4" />
        </svg>
      </button>
      <p className="font-body text-lg tracking-widest text-muted-foreground uppercase">Aprieta su nariz para entrar al altar</p>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-foreground">
      {!open && <Nariz onPress={() => setOpen(true)} />}
      <PapelPicado />
      <Petals />

      {/* Portada Mictlán */}
      <section className="relative flex min-h-screen items-end justify-center overflow-hidden pb-20 pt-40">
        <img src={mictlan} alt="Paisaje del Mictlán con cempasúchil" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className={`relative max-w-3xl px-6 text-center ${open ? "rise" : "opacity-0"}`}>
          <p className="font-script text-2xl text-accent md:text-3xl">Camino al Mictlán</p>
          <h1 className="grow mt-2 font-display text-6xl font-black text-primary glow-text md:text-8xl">Fantazma</h1>
          <p className="mt-6 text-lg text-foreground/90 md:text-xl">
            Los xoloitzcuintles guían a las almas por el río Apanohuaya. Hoy el camino de cempasúchil lleva a Fantazma de vuelta a casa.
          </p>
        </div>
      </section>

      {/* Altar con arco */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-center font-display text-4xl text-accent md:text-5xl">Su altar</h2>
        <div className="relative mx-auto mt-16 aspect-[4/3] w-full max-w-3xl">
          <Arco />
          <div className="absolute left-1/2 top-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2">
            <div className="grow overflow-hidden rounded-2xl border-8 border-secondary shadow-[var(--glow-orange)]">
              <img src={fantazma} alt="Fantazma recostado en el pasto" loading="lazy" className="w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Escalones del altar */}
        <div className="mt-12 space-y-3">
          <div className="mx-auto h-4 w-2/3 rounded bg-pink" />
          <div className="mx-auto h-4 w-5/6 rounded bg-primary" />
          <div className="mx-auto h-4 w-full rounded bg-secondary" />
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-center gap-8">
          {[0, 0.3, 0.6, 0.15, 0.45].map((d, i) => <Veladora key={i} delay={d} />)}
        </div>
      </section>

      {/* Ofrendas */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-center font-display text-4xl text-accent md:text-5xl">Ofrendas</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Su croqueta favorita", d: "Para que llegue con la panza llena." },
            { t: "Agua fresca", d: "Para el largo camino desde el Mictlán." },
            { t: "Su pelota", d: "Porque el juego nunca termina." },
            { t: "Cempasúchil", d: "Su aroma le indica el camino a casa." },
          ].map((o) => (
            <article key={o.t} className="grow rounded-2xl border border-border bg-card/80 p-6 text-center backdrop-blur">
              <Marigold size={56} className="mx-auto" />
              <h3 className="mt-4 font-display text-lg text-primary">{o.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.d}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="pb-16 text-center">
        <p className="grow inline-block font-script text-3xl text-primary glow-text">Siempre en nuestro corazón, Fantazma</p>
      </footer>
    </main>
  );
}
