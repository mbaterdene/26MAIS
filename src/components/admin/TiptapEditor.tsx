import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import Gapcursor from '@tiptap/extension-gapcursor';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Trash2,
  Loader2,
} from 'lucide-react';
import { MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight } from 'react-icons/md';
import { useState, useEffect, useRef } from 'react';

// ── Single CustomTextStyle — owns BOTH fontSize and fontFamily ───────────────
// Two separate extensions extending TextStyle (e.g. FontFamily + FontSize)
// register conflicting "textStyle" marks in Tiptap's schema. One extension
// with both attributes is the correct pattern.
const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).style.fontSize || null,
        renderHTML: (attrs) =>
          attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
      },
      fontFamily: {
        default: null,
        parseHTML: (el) => (el as HTMLElement).style.fontFamily || null,
        renderHTML: (attrs) =>
          attrs.fontFamily ? { style: `font-family: ${attrs.fontFamily}` } : {},
      },
    };
  },
});

// ── Font-size preset table ───────────────────────────────────────────────────
// px values used for both the dropdown and the textStyle mark.
const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

// Default px per heading level — applied as an explicit textStyle mark so the
// heading node type and the inline size mark always agree.
const HEADING_SIZES: Record<1 | 2 | 3, number> = { 1: 32, 2: 24, 3: 20 };
const DEFAULT_FONT_SIZE = 16;

interface TiptapEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  initialContent = '',
  onChange,
  placeholder = 'Start typing...',
}: TiptapEditorProps) {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [activeMarks, setActiveMarks] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
  });
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  // ── Read the effective font size at the current cursor position ─────────
  // Priority: explicit textStyle.fontSize mark → heading-level default → 16
  const readFontSize = (ed: any): number => {
    const attrs = ed.getAttributes('textStyle');
    if (attrs?.fontSize) {
      const n = parseInt(attrs.fontSize);
      if (!isNaN(n)) return n;
    }
    if (ed.isActive('heading', { level: 1 })) return HEADING_SIZES[1];
    if (ed.isActive('heading', { level: 2 })) return HEADING_SIZES[2];
    if (ed.isActive('heading', { level: 3 })) return HEADING_SIZES[3];
    return DEFAULT_FONT_SIZE;
  };

  const syncToolbarState = (ed: any) => {
    setFontSize(readFontSize(ed));
    setActiveMarks({
      bold: ed.isActive('bold'),
      italic: ed.isActive('italic'),
      underline: ed.isActive('underline'),
      strike: ed.isActive('strike'),
    });
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, autolink: true }),
      CustomTextStyle,
      Gapcursor,
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      syncToolbarState(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      syncToolbarState(editor);
    },
  });

  // Reset content ONLY on genuine language switch (not on every keystroke).
  useEffect(() => {
    if (!editor) return;
    const incoming = initialContent || '<p></p>';
    const normalize = (s: string) => (s === '' ? '<p></p>' : s);
    if (normalize(editor.getHTML()) === normalize(incoming)) return;
    editor.commands.setContent(incoming);
    syncToolbarState(editor);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent, editor]);

  // ── Heading toggle: node type + matching fontSize mark ───────────────────
  // Applying an explicit fontSize mark alongside the heading node ensures the
  // size picker always stays in sync and the mark beats any CSS conflicts.
  const toggleHeading = (level: 1 | 2 | 3) => {
    if (!editor) return;
    const isActive = editor.isActive('heading', { level });
    if (isActive) {
      // Un-toggling → revert to paragraph + clear the mark size
      editor.chain()
        .toggleHeading({ level })
        .setMark('textStyle', { fontSize: `${DEFAULT_FONT_SIZE}px` })
        .run();
    } else {
      const size = HEADING_SIZES[level];
      editor.chain()
        .toggleHeading({ level })
        .setMark('textStyle', { fontSize: `${size}px` })
        .run();
    }
  };

  // ── Apply a preset font size from the dropdown ───────────────────────────
  const applyFontSize = (size: number) => {
    setFontSize(size);
    editor?.chain().setMark('textStyle', { fontSize: `${size}px` }).run();
  };

  // ── Prevent toolbar buttons from stealing editor focus ───────────────────
  const preventFocusSteal = (e: React.MouseEvent) => e.preventDefault();

  if (!editor) return null;

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) editor.chain().extendMarkRange('link').setLink({ href: url }).run();
  };

  // ── Cloudinary image upload ──────────────────────────────────────────────
  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setImageError('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { setImageError('Image must be under 5 MB'); return; }

    setImageError('');
    setIsImageUploading(true);
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';
      const token = localStorage.getItem('auth_token');
      const publicId = `content-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const signingRes = await fetch(`${BACKEND_URL}/api/cloudinary/sign-upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'news-content', publicId }),
      });
      if (!signingRes.ok) throw new Error('Failed to get upload authorization');
      const signed = await signingRes.json();

      const fd = new FormData();
      fd.append('file', file);
      fd.append('api_key', signed.apiKey);
      fd.append('signature', signed.signature);
      fd.append('timestamp', signed.timestamp.toString());
      fd.append('public_id', signed.publicId);
      fd.append('folder', signed.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
        { method: 'POST', body: fd }
      );
      if (!uploadRes.ok) throw new Error('Upload failed');
      const result = await uploadRes.json();
      editor.chain().setImage({ src: result.secure_url }).run();
    } catch (err) {
      setImageError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setIsImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const fontFamilies = ['Inter', 'Georgia', 'Arial', 'Courier New', 'Comic Sans MS'];

  // ── Toolbar button shared style helper ──────────────────────────────────
  const tbBtn = (active: boolean) =>
    `p-2 rounded-md transition-colors ${active ? 'bg-cardinal-red text-white' : 'text-gray-600 hover:bg-gray-100'}`;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cardinal-red/20 transition-all">

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 space-y-2">

        {/* Row 1: Marks + Headings + Block */}
        <div className="flex flex-wrap items-center gap-1">

          {/* Bold / Italic / Underline / Strike */}
          <button onMouseDown={preventFocusSteal} onClick={() => { editor.chain().toggleBold().run(); syncToolbarState(editor); }}
            disabled={!editor.can().chain().toggleBold().run()} className={tbBtn(activeMarks.bold)} title="Bold (Ctrl+B)">
            <Bold size={17} />
          </button>
          <button onMouseDown={preventFocusSteal} onClick={() => { editor.chain().toggleItalic().run(); syncToolbarState(editor); }}
            disabled={!editor.can().chain().toggleItalic().run()} className={tbBtn(activeMarks.italic)} title="Italic (Ctrl+I)">
            <Italic size={17} />
          </button>
          <button onMouseDown={preventFocusSteal} onClick={() => { editor.chain().toggleUnderline().run(); syncToolbarState(editor); }}
            disabled={!editor.can().chain().toggleUnderline().run()} className={tbBtn(activeMarks.underline)} title="Underline (Ctrl+U)">
            <UnderlineIcon size={17} />
          </button>
          <button onMouseDown={preventFocusSteal} onClick={() => { editor.chain().toggleStrike().run(); syncToolbarState(editor); }}
            disabled={!editor.can().chain().toggleStrike().run()} className={tbBtn(activeMarks.strike)} title="Strikethrough">
            <Strikethrough size={17} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Headings — toggle node type AND sync fontSize mark */}
          <button onMouseDown={preventFocusSteal} onClick={() => toggleHeading(1)}
            className={tbBtn(editor.isActive('heading', { level: 1 }))} title="Heading 1 (32px)">
            <Heading1 size={17} />
          </button>
          <button onMouseDown={preventFocusSteal} onClick={() => toggleHeading(2)}
            className={tbBtn(editor.isActive('heading', { level: 2 }))} title="Heading 2 (24px)">
            <Heading2 size={17} />
          </button>
          <button onMouseDown={preventFocusSteal} onClick={() => toggleHeading(3)}
            className={tbBtn(editor.isActive('heading', { level: 3 }))} title="Heading 3 (20px)">
            <Heading3 size={17} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Blockquote */}
          <button onMouseDown={preventFocusSteal} onClick={() => editor.chain().toggleBlockquote().run()}
            className={tbBtn(editor.isActive('blockquote'))} title="Blockquote">
            <Quote size={17} />
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Link */}
          <button onMouseDown={preventFocusSteal} onClick={addLink}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors" title="Insert Link">
            <LinkIcon size={17} />
          </button>

          {/* Image → Cloudinary */}
          <label
            className={`p-2 rounded-md transition-colors cursor-pointer ${isImageUploading ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            title="Insert Image (uploads to Cloudinary)"
          >
            {isImageUploading ? <Loader2 size={17} className="animate-spin" /> : <ImageIcon size={17} />}
            <input ref={imageInputRef} type="file" accept="image/*" className="hidden"
              disabled={isImageUploading} onChange={handleImageFileSelect} />
          </label>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          {/* Clear formatting */}
          <button onMouseDown={preventFocusSteal}
            onClick={() => editor.chain().clearNodes().unsetAllMarks().run()}
            className="p-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors" title="Clear Formatting">
            <Trash2 size={17} />
          </button>
        </div>

        {/* Row 2: Font family | Font size dropdown | Align */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Font Family */}
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              editor.chain().setMark('textStyle', { fontFamily: e.target.value }).run();
            }}
            className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cardinal-red/20"
          >
            {fontFamilies.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>

          {/* Font Size — preset dropdown that reads from the actual textStyle mark */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-500 select-none">Size</span>
            <select
              value={FONT_SIZES.includes(fontSize) ? fontSize : ''}
              onChange={(e) => applyFontSize(Number(e.target.value))}
              className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cardinal-red/20 w-20"
            >
              {/* Slot for custom/unlisted sizes so the control doesn't show blank */}
              {!FONT_SIZES.includes(fontSize) && (
                <option value="">{fontSize}px</option>
              )}
              {FONT_SIZES.map((s) => (
                <option key={s} value={s}>{s}px</option>
              ))}
            </select>
          </div>

          {/* Text Align */}
          <div className="flex items-center gap-1 ml-auto">
            <button onMouseDown={preventFocusSteal} onClick={() => editor.chain().setTextAlign('left').run()}
              className={`p-1.5 rounded-md transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-cardinal-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              title="Align Left"><MdFormatAlignLeft size={17} /></button>
            <button onMouseDown={preventFocusSteal} onClick={() => editor.chain().setTextAlign('center').run()}
              className={`p-1.5 rounded-md transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-cardinal-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              title="Align Center"><MdFormatAlignCenter size={17} /></button>
            <button onMouseDown={preventFocusSteal} onClick={() => editor.chain().setTextAlign('right').run()}
              className={`p-1.5 rounded-md transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-cardinal-red text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              title="Align Right"><MdFormatAlignRight size={17} /></button>
          </div>
        </div>

        {/* Image error */}
        {imageError && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <ImageIcon size={12} /> {imageError}
          </p>
        )}
      </div>

      {/* ── Editor area ─────────────────────────────────────────────────── */}
      {/* fontFamily style on wrapper gives a default; individual spans can override */}
      <div
        className="min-h-96 flex flex-col cursor-text"
        style={{ fontFamily }}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none px-4 py-6 focus:outline-none flex-1"
        />
      </div>
    </div>
  );
}
