import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
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
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface TiptapEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  initialContent = '',
  onChange,
  placeholder = 'Start typing...'
}: TiptapEditorProps) {
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [activeMarks, setActiveMarks] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
  });

  const updateActiveMarks = (ed: any) => {
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
      TextStyle,
      FontFamily,
      Gapcursor,
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      updateFontSizeFromHeading(editor);
      updateActiveMarks(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      updateFontSizeFromHeading(editor);
      updateActiveMarks(editor);
    },
  });

  // Sync font size based on active heading level
  const updateFontSizeFromHeading = (ed: any) => {
    if (ed.isActive('heading', { level: 1 })) setFontSize(32);
    else if (ed.isActive('heading', { level: 2 })) setFontSize(28);
    else if (ed.isActive('heading', { level: 3 })) setFontSize(24);
    else setFontSize(16);
  };

  // Reset editor content when initialContent changes (language switch)
  useEffect(() => {
    if (editor && initialContent !== undefined) {
      editor.commands.setContent(initialContent || '<p></p>');
      updateFontSizeFromHeading(editor);
    }
  }, [initialContent, editor]);

  // Handle heading button click with auto font size
  const toggleHeading = (level: 1 | 2 | 3) => {
    editor?.chain().toggleHeading({ level }).run();
    const sizes = { 1: 32, 2: 28, 3: 24 };
    setFontSize(editor?.isActive('heading', { level }) ? 16 : sizes[level]);
  };

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().extendMarkRange('link').setLink({ href: url }).focus().run();
    }
  };

  const addImage = () => {
    const url = prompt('Enter the image URL');
    if (url) {
      editor.chain().setImage({ src: url }).focus().run();
    }
  };

  const fontFamilies = ['Inter', 'Comic Sans MS', 'Georgia', 'Arial', 'Courier New'];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cardinal-red/20 transition-all">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 space-y-3">
        {/* Row 1: Basic Formatting */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => {
              editor.chain().toggleBold().run();
              updateActiveMarks(editor);
            }}
            disabled={!editor.can().chain().toggleBold().run()}
            className={`p-2 rounded-md transition-colors ${
              activeMarks.bold
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </button>

          <button
            onClick={() => {
              editor.chain().toggleItalic().run();
              updateActiveMarks(editor);
            }}
            disabled={!editor.can().chain().toggleItalic().run()}
            className={`p-2 rounded-md transition-colors ${
              activeMarks.italic
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </button>

          <button
            onClick={() => {
              editor.chain().toggleUnderline().run();
              updateActiveMarks(editor);
            }}
            disabled={!editor.can().chain().toggleUnderline().run()}
            className={`p-2 rounded-md transition-colors ${
              activeMarks.underline
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={18} />
          </button>

          <button
            onClick={() => {
              editor.chain().toggleStrike().run();
              updateActiveMarks(editor);
            }}
            disabled={!editor.can().chain().toggleStrike().run()}
            className={`p-2 rounded-md transition-colors ${
              activeMarks.strike
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Headings */}
          <button
            onClick={() => toggleHeading(1)}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>

          <button
            onClick={() => toggleHeading(2)}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>

          <button
            onClick={() => toggleHeading(3)}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Quote */}
          <button
            onClick={() => editor.chain().toggleBlockquote().run()}
            className={`p-2 rounded-md transition-colors ${
              editor.isActive('blockquote')
                ? 'bg-cardinal-red text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Quote"
          >
            <Quote size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Links & Images */}
          <button
            onClick={addLink}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            title="Insert Link"
          >
            <LinkIcon size={18} />
          </button>

          <button
            onClick={addImage}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Clear Formatting */}
          <button
            onClick={() => editor.chain().clearNodes().run()}
            className="p-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Clear Formatting"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Row 2: Font Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Font Family */}
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              editor.chain().setFontFamily(e.target.value).run();
            }}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cardinal-red/20"
          >
            {fontFamilies.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {/* Font Size */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600">Size:</label>
            <input
              type="number"
              min="10"
              max="48"
              value={fontSize}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                setFontSize(size);
                editor
                  .chain()
                  .setMark('textStyle', { fontSize: `${size}px` })
                  .run();
              }}
              className="w-12 px-2 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cardinal-red/20"
            />
            <span className="text-xs text-gray-500">px</span>
          </div>

          {/* Text Align */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => editor.chain().setTextAlign('left').run()}
              className={`px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                editor.isActive({ textAlign: 'left' })
                  ? 'bg-cardinal-red text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              title="Align Left"
            >
              L
            </button>
            <button
              onClick={() => editor.chain().setTextAlign('center').run()}
              className={`px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                editor.isActive({ textAlign: 'center' })
                  ? 'bg-cardinal-red text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              title="Align Center"
            >
              C
            </button>
            <button
              onClick={() => editor.chain().setTextAlign('right').run()}
              className={`px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                editor.isActive({ textAlign: 'right' })
                  ? 'bg-cardinal-red text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              title="Align Right"
            >
              R
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-4 py-6 focus:outline-none min-h-96"
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
        }}
      />
    </div>
  );
}
