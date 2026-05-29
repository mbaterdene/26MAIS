import { useState, useEffect } from 'react';
import { Palette, Save, Loader2, CheckCircle2, XCircle, Github, AlertCircle } from 'lucide-react';
import { useBrandColors, useUpdateBrandColors } from '../../hooks/useBrandColors';
import type { BrandColors } from '../../lib/admin-types';

// ── Preset palettes ───────────────────────────────────────────────────────────

const RED_PRESETS = [
  { label: 'red-300',  hex: '#fca5a5' },
  { label: 'red-400',  hex: '#f87171' },
  { label: 'red-500',  hex: '#ef4444' },
  { label: 'red-600',  hex: '#dc2626' },
  { label: 'red-700',  hex: '#b91c1c' },
  { label: 'red-800',  hex: '#991b1b' },
  { label: 'red-900',  hex: '#7f1d1d' },
  { label: 'rose-600', hex: '#e11d48' },
  { label: 'rose-800', hex: '#9f1239' },
  { label: 'Default',  hex: '#8C1515' },
];

const DIGITAL_RED_PRESETS = [
  { label: 'red-500',  hex: '#ef4444' },
  { label: 'red-600',  hex: '#dc2626' },
  { label: 'red-700',  hex: '#b91c1c' },
  { label: 'rose-500', hex: '#f43f5e' },
  { label: 'rose-600', hex: '#e11d48' },
  { label: 'rose-700', hex: '#be123c' },
  { label: 'orange-600',hex: '#ea580c' },
  { label: 'Default',  hex: '#B1040E' },
];

const BLUE_PRESETS = [
  { label: 'blue-400', hex: '#60a5fa' },
  { label: 'blue-500', hex: '#3b82f6' },
  { label: 'blue-600', hex: '#2563eb' },
  { label: 'blue-700', hex: '#1d4ed8' },
  { label: 'sky-500',  hex: '#0ea5e9' },
  { label: 'sky-600',  hex: '#0284c7' },
  { label: 'sky-700',  hex: '#0369a1' },
  { label: 'indigo-600',hex: '#4f46e5' },
  { label: 'Default',  hex: '#006CB8' },
];

const SAND_PRESETS = [
  { label: 'amber-100', hex: '#fef3c7' },
  { label: 'amber-200', hex: '#fde68a' },
  { label: 'yellow-200',hex: '#fef08a' },
  { label: 'stone-200', hex: '#e7e5e4' },
  { label: 'stone-300', hex: '#d6d3d1' },
  { label: 'tan',       hex: '#D2B48C' },
  { label: 'warm-gray', hex: '#E5DDD0' },
  { label: 'Default',   hex: '#D2C295' },
];

const BLACK_PRESETS = [
  { label: 'gray-800',  hex: '#1f2937' },
  { label: 'gray-900',  hex: '#111827' },
  { label: 'zinc-800',  hex: '#27272a' },
  { label: 'zinc-900',  hex: '#18181b' },
  { label: 'slate-800', hex: '#1e293b' },
  { label: 'slate-900', hex: '#0f172a' },
  { label: 'neutral-900',hex: '#171717' },
  { label: 'Default',   hex: '#2E2D29' },
];

// ── Color token definitions ────────────────────────────────────────────────────

interface ColorToken {
  key: keyof BrandColors;
  label: string;
  description: string;
  usedFor: string[];
  presets: { label: string; hex: string }[];
}

const COLOR_TOKENS: ColorToken[] = [
  {
    key: 'cardinalRed',
    label: 'Cardinal Red',
    description: 'Primary brand color — the most used color across the site.',
    usedFor: ['Navbar background', 'Primary buttons', 'Active nav links', 'Headings & accents', 'Admin sidebar highlights'],
    presets: RED_PRESETS,
  },
  {
    key: 'digitalRed',
    label: 'Digital Red',
    description: 'Brighter red used for hover states and emphasis.',
    usedFor: ['Button hover states', 'Hover text on links', 'Alert/error accents'],
    presets: DIGITAL_RED_PRESETS,
  },
  {
    key: 'digitalBlue',
    label: 'Digital Blue',
    description: 'Used for links and secondary interactive elements.',
    usedFor: ['Hyperlinks', 'Info callouts', 'Secondary buttons', 'Icon accents'],
    presets: BLUE_PRESETS,
  },
  {
    key: 'sand',
    label: 'Sand',
    description: 'Warm neutral for backgrounds, borders and subtle fills.',
    usedFor: ['Section backgrounds', 'Card borders', 'Dividers', 'Tag/badge fills'],
    presets: SAND_PRESETS,
  },
  {
    key: 'black',
    label: 'Black',
    description: 'Site-wide body text and dark UI surfaces.',
    usedFor: ['Body text', 'Headings (non-brand)', 'Dark card backgrounds', 'Icon defaults'],
    presets: BLACK_PRESETS,
  },
];

// ── Single color editor ───────────────────────────────────────────────────────

interface ColorEditorProps {
  token: ColorToken;
  value: string;
  onChange: (val: string) => void;
}

function isValidHex(s: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(s);
}

function ColorEditor({ token, value, onChange }: ColorEditorProps) {
  const [hexInput, setHexInput] = useState(value);

  // Keep local text input in sync when parent resets
  useEffect(() => { setHexInput(value); }, [value]);

  function handleHexBlur() {
    const v = hexInput.trim();
    const normalized = v.startsWith('#') ? v : `#${v}`;
    if (isValidHex(normalized)) {
      onChange(normalized.toUpperCase());
      setHexInput(normalized.toUpperCase());
    } else {
      setHexInput(value); // revert bad input
    }
  }

  function handlePickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.toUpperCase();
    onChange(v);
    setHexInput(v);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl border border-black/10 flex-shrink-0 shadow-sm"
          style={{ background: value }}
        />
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{token.label}</h3>
          <p className="text-xs text-gray-500">{token.description}</p>
        </div>
      </div>

      {/* Picker + hex input */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={handlePickerChange}
            className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5 bg-white"
            title="Pick a color"
          />
        </div>
        <input
          type="text"
          value={hexInput}
          maxLength={7}
          onChange={(e) => setHexInput(e.target.value)}
          onBlur={handleHexBlur}
          placeholder="#000000"
          className="flex-1 px-3 py-2 text-sm font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none uppercase"
        />
        <div
          className="w-10 h-10 rounded-xl border border-black/10 flex-shrink-0"
          style={{ background: value }}
          title="Preview"
        />
      </div>

      {/* Presets */}
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-2">Presets</p>
        <div className="flex flex-wrap gap-1.5">
          {token.presets.map((p) => (
            <button
              key={p.hex}
              onClick={() => { onChange(p.hex); setHexInput(p.hex); }}
              title={`${p.label} — ${p.hex}`}
              className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${
                value.toUpperCase() === p.hex.toUpperCase()
                  ? 'border-gray-800 scale-110 shadow-md'
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{ background: p.hex }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-2 mt-1">
          {token.presets.map((p) => (
            value.toUpperCase() === p.hex.toUpperCase() ? (
              <span key={p.hex} className="text-xs text-gray-400">{p.label}</span>
            ) : null
          ))}
        </div>
      </div>

      {/* Usage tags */}
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-1.5">Used for</p>
        <div className="flex flex-wrap gap-1.5">
          {token.usedFor.map((u) => (
            <span key={u} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{u}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Live preview panel ────────────────────────────────────────────────────────

interface PreviewProps {
  colors: Record<keyof BrandColors, string>;
}

function LivePreview({ colors }: PreviewProps) {
  return (
    <div className="space-y-4 sticky top-6">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Preview</h2>
      <p className="text-xs text-gray-400 -mt-2">Updates instantly — save to push to site</p>

      {/* Navbar */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">Navbar</p>
        <div className="rounded-xl overflow-hidden shadow-sm border border-black/5">
          <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.cardinalRed }}>
            <span className="font-bold text-white text-sm tracking-wide">MAIS</span>
            <div className="flex gap-3 text-xs text-white/80">
              <span className="text-white font-semibold border-b border-white pb-0.5">Home</span>
              <span>About</span>
              <span>News</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">Buttons</p>
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm"
            style={{ background: colors.cardinalRed }}
          >
            Primary
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm"
            style={{ background: colors.digitalRed }}
          >
            Hover State
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm"
            style={{ background: colors.digitalBlue }}
          >
            Secondary
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold border-2"
            style={{ borderColor: colors.cardinalRed, color: colors.cardinalRed }}
          >
            Outline
          </button>
        </div>
      </div>

      {/* News card */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">News Card</p>
        <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: colors.sand }}>
          <div className="h-20 flex items-center justify-center text-xs font-medium" style={{ background: colors.sand, color: colors.black }}>
            Image placeholder
          </div>
          <div className="p-3 bg-white space-y-1.5">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${colors.cardinalRed}18`, color: colors.cardinalRed }}
            >
              Category
            </span>
            <p className="text-sm font-bold leading-snug" style={{ color: colors.black }}>
              Article headline goes here
            </p>
            <p className="text-xs" style={{ color: `${colors.black}99` }}>
              A short excerpt of the news article…
            </p>
            <p className="text-xs font-semibold" style={{ color: colors.cardinalRed }}>
              Read more →
            </p>
          </div>
        </div>
      </div>

      {/* Section background */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">Section Background</p>
        <div className="rounded-xl p-4 space-y-2" style={{ background: colors.sand }}>
          <p className="text-sm font-bold" style={{ color: colors.black }}>Section Heading</p>
          <p className="text-xs" style={{ color: `${colors.black}cc` }}>
            This area uses the sand color as a background fill for alternating page sections.
          </p>
          <span
            className="inline-block text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: colors.cardinalRed, color: '#fff' }}
          >
            Learn More
          </span>
        </div>
      </div>

      {/* Typography */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">Typography</p>
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
          <p className="text-base font-bold" style={{ color: colors.black }}>Body text color</p>
          <p className="text-sm" style={{ color: `${colors.black}cc` }}>
            Secondary / muted text
          </p>
          <p className="text-sm">
            Inline{' '}
            <span className="font-semibold cursor-pointer" style={{ color: colors.digitalBlue }}>
              link text
            </span>{' '}
            within a paragraph.
          </p>
          <p className="text-sm font-semibold" style={{ color: colors.cardinalRed }}>
            Brand-colored heading or label
          </p>
        </div>
      </div>

      {/* Admin sidebar */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1.5">Admin Sidebar (active state)</p>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          {['Dashboard', 'News', 'Brand'].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium"
              style={
                i === 2
                  ? { background: `${colors.cardinalRed}18`, color: colors.cardinalRed }
                  : { color: '#6b7280' }
              }
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: i === 2 ? colors.cardinalRed : '#d1d5db' }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const DEFAULT_COLORS: BrandColors = {
  cardinalRed: '#8C1515',
  digitalRed:  '#B1040E',
  digitalBlue: '#006CB8',
  sand:        '#D2C295',
  black:       '#2E2D29',
};

export function AdminBrandColors() {
  const { data: saved, isLoading, error } = useBrandColors();
  const updateMutation = useUpdateBrandColors();

  const [draft, setDraft] = useState<BrandColors>(DEFAULT_COLORS);
  const [saveResult, setSaveResult] = useState<{ ok: boolean; commitUrl?: string; message?: string } | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Initialise draft when remote values load
  useEffect(() => {
    if (saved) {
      const merged: BrandColors = {
        cardinalRed: saved.cardinalRed ?? DEFAULT_COLORS.cardinalRed,
        digitalRed:  saved.digitalRed  ?? DEFAULT_COLORS.digitalRed,
        digitalBlue: saved.digitalBlue ?? DEFAULT_COLORS.digitalBlue,
        sand:        saved.sand        ?? DEFAULT_COLORS.sand,
        black:       saved.black       ?? DEFAULT_COLORS.black,
      };
      setDraft(merged);
      setIsDirty(false);
    }
  }, [saved]);

  function handleChange(key: keyof BrandColors, val: string) {
    setDraft((d) => ({ ...d, [key]: val }));
    setIsDirty(true);
    setSaveResult(null);
  }

  function handleReset() {
    if (saved) {
      setDraft({
        cardinalRed: saved.cardinalRed ?? DEFAULT_COLORS.cardinalRed,
        digitalRed:  saved.digitalRed  ?? DEFAULT_COLORS.digitalRed,
        digitalBlue: saved.digitalBlue ?? DEFAULT_COLORS.digitalBlue,
        sand:        saved.sand        ?? DEFAULT_COLORS.sand,
        black:       saved.black       ?? DEFAULT_COLORS.black,
      });
      setIsDirty(false);
    }
  }

  async function handleSave() {
    setSaveResult(null);
    try {
      const result = await updateMutation.mutateAsync({
        cardinalRed:  draft.cardinalRed  ?? undefined,
        digitalRed:   draft.digitalRed   ?? undefined,
        digitalBlue:  draft.digitalBlue  ?? undefined,
        sand:         draft.sand         ?? undefined,
        black:        draft.black        ?? undefined,
      });
      setSaveResult({ ok: true, commitUrl: result.commitUrl, message: result.message });
      setIsDirty(false);
    } catch (err) {
      setSaveResult({ ok: false, message: err instanceof Error ? err.message : 'Failed to save' });
    }
  }

  // Cast draft to the shape LivePreview needs (non-null)
  const previewColors = {
    cardinalRed: draft.cardinalRed ?? DEFAULT_COLORS.cardinalRed,
    digitalRed:  draft.digitalRed  ?? DEFAULT_COLORS.digitalRed,
    digitalBlue: draft.digitalBlue ?? DEFAULT_COLORS.digitalBlue,
    sand:        draft.sand        ?? DEFAULT_COLORS.sand,
    black:       draft.black       ?? DEFAULT_COLORS.black,
  } as Record<keyof BrandColors, string>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-cardinal-red/10 p-2 rounded-lg text-cardinal-red">
              <Palette size={24} />
            </div>
            Brand Colors
          </h1>
          <p className="text-gray-500 mt-1">
            Edit your site's color palette. Changes are pushed to GitHub and trigger an automatic rebuild.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              onClick={handleReset}
              className="px-4 py-2.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!isDirty || updateMutation.isPending}
            className="flex items-center gap-2 bg-cardinal-red hover:bg-red-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            {updateMutation.isPending
              ? <><Loader2 size={15} className="animate-spin" /> Pushing…</>
              : <><Save size={15} /> Save & Push</>
            }
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <Github size={16} className="flex-shrink-0 mt-0.5 text-blue-600" />
        <span>
          Saving commits <code className="bg-blue-100 px-1 rounded text-xs">tailwind.config.js</code> directly to your GitHub repo.
          Your hosting provider (Vercel/Netlify) will detect the commit and rebuild the site automatically — typically within 1–2 minutes.
        </span>
      </div>

      {/* Save result banner */}
      {saveResult && (
        <div className={`flex items-center gap-3 rounded-xl p-4 text-sm border ${
          saveResult.ok
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {saveResult.ok ? <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-600" /> : <XCircle size={16} className="flex-shrink-0" />}
          <span>
            {saveResult.ok
              ? saveResult.message === 'No changes detected'
                ? 'No changes — colors are already up to date.'
                : <>Colors pushed to GitHub.{' '}
                    {saveResult.commitUrl && (
                      <a href={saveResult.commitUrl} target="_blank" rel="noreferrer" className="underline font-semibold">
                        View commit →
                      </a>
                    )}
                    {' '}Your site will rebuild in ~1–2 min.</>
              : `Error: ${saveResult.message}`
            }
          </span>
        </div>
      )}

      {/* Load error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <AlertCircle size={16} className="flex-shrink-0" />
          Could not load current colors from GitHub: {(error as Error).message}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-cardinal-red" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Color editors */}
          <div className="space-y-4">
            {COLOR_TOKENS.map((token) => (
              <ColorEditor
                key={token.key}
                token={token}
                value={draft[token.key] ?? DEFAULT_COLORS[token.key]!}
                onChange={(val) => handleChange(token.key, val)}
              />
            ))}
          </div>

          {/* Live preview */}
          <LivePreview colors={previewColors} />
        </div>
      )}
    </div>
  );
}
