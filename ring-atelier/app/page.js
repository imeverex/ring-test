"use client";

import { useState } from "react";
import styles from "./page.module.css";

const METALS = [
  { value: "18k yellow gold", label: "18k Yellow Gold" },
  { value: "18k white gold", label: "18k White Gold" },
  { value: "18k rose gold", label: "18k Rose Gold" },
  { value: "platinum", label: "Platinum" },
  { value: "sterling silver", label: "Sterling Silver" },
  { value: "two-tone gold", label: "Two-Tone Gold" },
];

const STYLES = [
  { value: "solitaire", label: "Solitaire" },
  { value: "halo", label: "Halo" },
  { value: "pavé band", label: "Pavé Band" },
  { value: "three-stone", label: "Three-Stone" },
  { value: "vintage filigree", label: "Vintage Filigree" },
  { value: "eternity band", label: "Eternity Band" },
  { value: "tension set", label: "Tension Set" },
  { value: "bezel set", label: "Bezel Set" },
];

const STONES = [
  { value: "round brilliant diamond", label: "Round Brilliant Diamond" },
  { value: "oval diamond", label: "Oval Diamond" },
  { value: "emerald-cut diamond", label: "Emerald-Cut Diamond" },
  { value: "cushion-cut diamond", label: "Cushion-Cut Diamond" },
  { value: "sapphire", label: "Sapphire" },
  { value: "ruby", label: "Ruby" },
  { value: "emerald", label: "Emerald" },
  { value: "morganite", label: "Morganite" },
  { value: "no center stone", label: "No Center Stone" },
];

const VIBES = [
  { value: "classic and timeless", label: "Classic & Timeless" },
  { value: "modern and minimalist", label: "Modern & Minimalist" },
  { value: "romantic and vintage", label: "Romantic & Vintage" },
  { value: "bold and dramatic", label: "Bold & Dramatic" },
  { value: "nature-inspired and organic", label: "Nature-Inspired" },
  { value: "art deco geometric", label: "Art Deco" },
];

export default function Home() {
  const [metal, setMetal] = useState(METALS[0].value);
  const [style, setStyle] = useState(STYLES[0].value);
  const [stone, setStone] = useState(STONES[0].value);
  const [vibe, setVibe] = useState(VIBES[0].value);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const [caption, setCaption] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setImageData(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metal, style, stone, vibe, details }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setImageData(`data:image/png;base64,${data.b64}`);
      setCaption(
        [
          metal.charAt(0).toUpperCase() + metal.slice(1),
          style.charAt(0).toUpperCase() + style.slice(1),
          stone !== "no center stone" ? stone.charAt(0).toUpperCase() + stone.slice(1) : null,
        ]
          .filter(Boolean)
          .join(" · ")
      );
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <svg className={styles.ringIcon} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="18" stroke="#c9a84c" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="12" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="2 3" />
          <circle cx="28" cy="10" r="3" fill="#c9a84c" opacity="0.7" />
          <circle cx="28" cy="10" r="1.5" fill="#e8d5a3" />
          <path d="M25 10 L28 6 L31 10" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.5" />
        </svg>
        <div className={styles.brand}>Ring Atelier</div>
        <h1>
          Design Your <em>Dream</em> Ring
        </h1>
        <p className={styles.subtitle}>Describe it, and AI will render your vision into life</p>
      </header>

      <div className={styles.divider}>
        <span>◇</span>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Metal</label>
            <select value={metal} onChange={(e) => setMetal(e.target.value)}>
              {METALS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Center Stone</label>
            <select value={stone} onChange={(e) => setStone(e.target.value)}>
              {STONES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Vibe</label>
            <select value={vibe} onChange={(e) => setVibe(e.target.value)}>
              {VIBES.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label className={styles.fieldLabel}>
              Additional Details <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. milgrain edges, hidden halo, twisted band, engraving, specific carat size…"
            />
          </div>
        </div>

        <button className={styles.btnGenerate} onClick={handleGenerate} disabled={loading}>
          {loading ? "Crafting your ring…" : "Generate Ring"}
        </button>
      </div>

      {error && <div className={styles.errorBox}>⚠ {error}</div>}

      {loading && (
        <div className={styles.loadingCard}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Crafting your ring…</p>
        </div>
      )}

      {imageData && !loading && (
        <div className={styles.resultCard}>
          <img className={styles.resultImg} src={imageData} alt="Generated wedding ring" />
          <div className={styles.resultCaption}>
            <p>{caption}</p>
            <a className={styles.btnDownload} href={imageData} download="wedding-ring.png">
              Save Image
            </a>
          </div>
        </div>
      )}

      <div className={styles.divider} style={{ marginTop: "56px" }}>
        <span>◇</span>
      </div>
      <footer className={styles.footer}>Ring Atelier · Powered by OpenAI DALL·E 3 · Images are AI-generated concepts</footer>
    </main>
  );
}
