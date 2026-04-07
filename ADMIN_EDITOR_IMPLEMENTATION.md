# Admin About Page Editor - Implementation Guide

## Overview

This document outlines how we implemented the **editable About page** in the admin panel. This pattern is the template for making all other pages editable in the same WYSIWYG (What You See Is What You Get) style.

The key principle: **Admins see and edit the exact same UI/layout that visitors see on the public site, with inline editing overlays.**

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Admin Panel                             │
├─────────────────────────────────────────────────────────────┤
│  ContentEditorPage.tsx                                      │
│  ├─ Page Navigator (sidebar)                               │
│  └─ Renders: AboutPageEditor component                     │
│      └─ Full About page UI + InlineEdit overlays           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  State Management                           │
├─────────────────────────────────────────────────────────────┤
│  useEditableContent hook                                    │
│  ├─ Loads about.json initial data                          │
│  ├─ Tracks pending changes in session storage              │
│  └─ updateField() → contentEditorService                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│               Data Source (Content JSON)                    │
├─────────────────────────────────────────────────────────────┤
│  src/content/about.json                                     │
│  ├─ school_info (vision, mission, general info, stats)     │
│  ├─ characteristics[] (6 school characteristics)           │
│  ├─ national_program (rates + description)                 │
│  ├─ international_program (Cambridge stats)                │
│  ├─ student_programs[] (DofE data)                         │
│  ├─ achievements[] (awards & rankings)                     │
│  ├─ graduate_stats[] (10 years of history)                 │
│  └─ counseling_services[] (support services)               │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Files & Components

### 1. **Data File** - `src/content/about.json`
- **Purpose:** Single source of truth for all About page content
- **Structure:** Mirrors the `AboutData` TypeScript interface
- **Why JSON:** 
  - Pure data (no code)
  - Consistent with other content files (clubs.json, events.json)
  - Admin can directly edit without compilation
  - Easy to export/import

**Key sections:**
```json
{
  "school_info": { vision_en, vision_mn, mission_en, mission_mn, general_info_en, general_info_mn, total_students, total_teachers },
  "characteristics": [ { id, title_en, title_mn, description_en, description_mn } ],
  "national_program": { performance_rate, success_rate, quality_rate, description_en, description_mn },
  "international_program": { year, igcse_count, as_level_count, a_level_count, ice_*, aice_* },
  "student_programs": [ { id, program_name_en, program_name_mn, participants, bronze/silver/gold_count, description_en, description_mn } ],
  "achievements": [ { id, year, type, title_en, title_mn } ],
  "graduate_stats": [ { year, total_graduates, abroad_count, scholarship_amount, percentage } ],
  "counseling_services": [ { id, title_en, title_mn, description_en, description_mn } ],
  "total_graduates": number,
  "total_abroad": number,
  "total_scholarship": number
}
```

---

### 2. **Content Registry** - `src/data/contentRegistry.ts`
- **Purpose:** Central registry of all editable content pages
- **Maps:** Page key → JSON data → file path

**Entry for About.**
```typescript
{
  key: 'about',
  label: 'About Page',
  label_mn: 'Сургуулийн тухай',
  description: 'Complete about page with all sections',
  data: aboutData,  // imported from about.json
  path: 'src/content/about.json'
}
```

**Helper functions:**
```typescript
getContentPageByKey(key: string)     // Get page config by key
getContentPageLabel(key, isEnglish)  // Get bilingual label
```

---

### 3. **Public Site Fetching** - `src/lib/api.ts`
```typescript
export const getAboutData = (): Promise<AboutData> =>
  Promise.resolve(aboutData);  // Now imports from about.json
```

Changed from importing `aboutMais.ts` → now imports `about.json` directly.

---

### 4. **Inline Editing Component** - `src/components/shared/InlineEdit.tsx`
- **Purpose:** Reusable text editing overlay
- **Features:**
  - Click to edit
  - Pre-selected text (user can type to replace)
  - Save/Cancel buttons
  - Yellow hover highlight with edit icon
  - Handles single-line and multiline content

**Usage:**
```tsx
<InlineEdit
  value={content.school_info.vision_en}
  onChange={(value) => onUpdate('school_info.vision_en', value)}
  multiline
  className="block w-full"
/>
```

---

### 5. **Admin About Editor** - `src/features/admin/previews/AboutPageEditor.tsx`
- **Purpose:** Renders exact About page UI with inline editing
- **Pattern:** Replicates `src/features/about/AboutPage.tsx` layout 100%

**Key pattern:**
```tsx
export function AboutPageEditor({ content, onUpdate }: AboutPageEditorProps) {
  // Hero section - same styling as AboutPage
  <section className="bg-black text-white py-44">...</section>
  
  // Vision & Mission section
  <InlineEdit
    value={content.school_info.vision_en}
    onChange={(value) => onUpdate('school_info.vision_en', value)}
  />
  
  // Characteristics grid
  {content.characteristics.map((char, idx) => (
    <InlineEdit
      value={char.title_en}
      onChange={(value) => updateArrayItem('characteristics', idx, 'title_en', value)}
    />
  ))}
}
```

**For array editing:**
```typescript
const updateArrayItem = (arrayPath: string, index: number, field: string, value: any) => {
  const fullPath = `${arrayPath}[${index}].${field}`;
  onUpdate(fullPath, value);
};
```

---

### 6. **Content Editor Page** - `src/features/admin/ContentEditorPage.tsx`
- **Purpose:** Main admin interface with page navigation
- **Features:**
  - Left sidebar: page selector
  - Main area: page-specific editor (AboutPageEditor for 'about')
  - Pending changes counter
  - GitHub commit button
  - Status display

**Router logic:**
```typescript
function renderPreview(pageKey, content, onUpdate) {
  switch (pageKey) {
    case 'about':
      return <AboutPageEditor content={content} onUpdate={onUpdate} />;
    case 'alumni':
      return <AlumniContentPreview content={content} onUpdate={onUpdate} />;
    // ... other pages
    default:
      return <GenericContentPreview content={content} onUpdate={onUpdate} />;
  }
}
```

**Default page on load:**
```typescript
const [selectedPageKey, setSelectedPageKey] = useState('about');
```

---

### 7. **Editable Content Hook** - `src/hooks/useEditableContent.ts`
- **Purpose:** Manages content state and pending changes
- **Features:**
  - Loads initial data from contentRegistry
  - Applies pending changes from session storage
  - Resets when page changes
  - Tracks which fields have been modified

**Usage in admin:**
```typescript
const {
  content,              // current content with applied changes
  updateField,          // function to update a field
  clearChanges,         // revert all changes for this page
  hasChanges,           // boolean: any changes?
  changeCount           // number of changed fields
} = useEditableContent(selectedPageKey, currentPage.data);
```

**How updateField works:**
```typescript
updateField('school_info.vision_en', 'new text') 
  → contentEditorService.addChange(
      file: 'about',
      path: 'school_info.vision_en',
      oldValue: '...',
      newValue: 'new text'
    )
  → sessionStorage['mai_pending_changes'] updated
  → React state refreshed
```

---

### 8. **Session Storage Service** - `src/services/contentEditorService.ts`
- **Purpose:** Temporary change tracking in sessionStorage
- **Persists across page switches** until browser reload
- **Not committed to GitHub until user clicks "Commit"**

**API:**
```typescript
contentEditorService.getPendingChanges()    // { [file]: Change[] }
contentEditorService.addChange(file, path, oldVal, newVal)
contentEditorService.revertChange(file, path)
contentEditorService.clearFileChanges(file)
contentEditorService.clearAllChanges()
contentEditorService.getChangeCount()
contentEditorService.getChangedFiles()
```

---

## User Workflow in Admin

1. **Navigate:** Click "About Page" in ContentEditorPage sidebar
2. **See:** Full About page UI matching public site (hero, vision/mission, characteristics, etc.)
3. **Edit:** Click any text field → yellow overlay appears
   - Text pre-selected
   - Edit and click Save
   - Changes saved to session storage immediately
4. **See Status:** 
   - Yellow indicator: "N fields changed"
   - Pending changes counter: displays total changes across all pages
5. **Revert (optional):** Click "Clear Changes" to discard page edits
6. **Commit:** Click "Commit All Changes" when ready
   - Displays GitHubSettings modal
   - Admin enters token, branch, message
   - All changes committed to GitHub in one PR

---

## How to Replicate for Other Pages

### Step 1: Prepare the JSON File
Ensure the page has a JSON file in `src/content/`:
- `events.json` ✅
- `alumni.json` ✅  
- `clubs.json` ✅
- `courses.json` ✅
- `slides.json` ✅
- `students.json` ✅
- `teachers.json` ✅

### Step 2: Register in Content Registry
Add to `src/data/contentRegistry.ts`:
```typescript
import pageData from '../content/page.json';

{
  key: 'events',
  label: 'Events',
  label_mn: 'Үйл явдлууд',
  description: 'School events and announcements',
  data: pageData,
  path: 'src/content/events.json'
}
```

### Step 3: Create Page Editor Component
**File:** `src/features/admin/previews/[PageName]Editor.tsx`

**Template:**
```typescript
import { bil } from '../../../lib/utils';
import { InlineEdit } from '../../../components/shared/InlineEdit';
import type { [PageData] } from '../../../lib/api';

interface [PageName]EditorProps {
  content: [PageData];
  onUpdate: (path: string, value: any) => void;
}

export function [PageName]Editor({ content, onUpdate }: [PageName]EditorProps) {
  // Copy exact layout from public [PageName].tsx
  // Replace text/values with InlineEdit components
  // Use updateArrayItem() for array elements
  
  return (
    <div className="w-full">
      {/* Paste entire page layout here */}
      {/* Replace all text with InlineEdit overlays */}
    </div>
  );
}

// Helper for array editing
const updateArrayItem = (arrayPath: string, index: number, field: string, value: any) => {
  const fullPath = `${arrayPath}[${index}].${field}`;
  onUpdate(fullPath, value);
};
```

### Step 4: Wire into ContentEditorPage
Update `src/features/admin/ContentEditorPage.tsx`:

**Add import:**
```typescript
import { [PageName]Editor } from './previews/[PageName]Editor';
```

**Add case to renderPreview():**
```typescript
function renderPreview(pageKey, content, onUpdate, isEnglish) {
  switch (pageKey) {
    case '[page-key]':
      return <[PageName]Editor content={content} onUpdate={onUpdate} />;
    // ...
  }
}
```

### Step 5: Test
1. Navigate to admin
2. Click on new page in sidebar
3. Should see full page UI with InlineEdit overlays
4. Click text → should see edit input with pre-selected text
5. Make changes → should see pending changes counter increase
6. Click "Commit All Changes" → should commit to GitHub

---

## API Integration Points

### Initial Load
```
User opens admin → ContentEditorPage loads
  → selectedPageKey = 'about'
  → useEditableContent('about', aboutData)
    → Returns content with pending changes applied
  → renderPreview() renders AboutPageEditor
    → All fields show InlineEdit overlays
```

### On Edit
```
User clicks text → InlineEdit enters edit mode
  → User changes text and clicks Save
    → onChange() callback fires
      → updateField() called
        → contentEditorService.addChange() called
          → sessionStorage updated
          → React state re-renders
          → User sees changes immediately
          → changeCount increases
```

### On Commit
```
Admin clicks "Commit All Changes"
  → GitHubSettings modal opens
  → Admin provides token, branch, commit message
    → githubAPIService.commitFile() called for changed files
      → All changes pushed to GitHub in single PR
    → Session storage cleared
    → Page refreshed
```

---

## Key Design Decisions

| Decision | Why |
|----------|-----|
| **JSON not TypeScript** | Pure data, easy to edit, consistent with other content |
| **Session storage not DB** | Quick feedback, no backend needed, works offline |
| **Exact page UI duplication** | Non-technical admins see exactly what visitors see |
| **InlineEdit overlays** | Minimal visual changes, click to activate editing |
| **Array editing with index** | Supports adding/removing items, tracks nested changes |
| **Bilingual content** | All text fields show current language from LanguageContext |
| **Pending changes counter** | Clear feedback that edits exist and can be lost |

---

## Common Patterns

### Simple Text Field
```tsx
<InlineEdit
  value={content.title_en || ''}
  onChange={(value) => onUpdate('title_en', value)}
/>
```

### Multiline Text
```tsx
<InlineEdit
  value={content.description}
  onChange={(value) => onUpdate('description', value)}
  multiline
/>
```

### Numeric Field
```tsx
<InlineEdit
  value={content.total_count}
  onChange={(value) => onUpdate('total_count', parseInt(value as string) || 0)}
/>
```

### Field in Array
```tsx
{content.items.map((item, idx) => (
  <InlineEdit
    value={item.title}
    onChange={(value) => updateArrayItem('items', idx, 'title', value)}
  />
))}

const updateArrayItem = (path: string, idx: number, field: string, val: any) => {
  onUpdate(`${path}[${idx}].${field}`, val);
};
```

### Bilingual Field
```tsx
<InlineEdit
  value={content[isEnglish ? 'title_en' : 'title_mn']}
  onChange={(value) => onUpdate(isEnglish ? 'title_en' : 'title_mn', value)}
/>
```

---

## Future Enhancements

- [ ] Add image upload support (use Cloudinary like news)
- [ ] Add array item add/remove buttons
- [ ] Preview changes before committing
- [ ] Undo/redo within session
- [ ] Track last edit time per field
- [ ] Collaborative editing (show who last edited)
- [ ] Auto-save to localStorage as backup

---

## Troubleshooting

**Issue:** Changes don't appear after clicking Save
- Check browser console for errors
- Verify `updateField()` is being called
- Check sessionStorage in DevTools

**Issue:** Different language text not editable
- Check LanguageContext is mounted
- Verify content has both `_en` and `_mn` fields
- Test language toggle in navbar

**Issue:** Array items not saving
- Ensure `updateArrayItem()` generates correct path: `field[0].property`
- Verify field name matches JSON structure exactly
- Check contentEditorService.getPendingChanges() in console

---

## Files Reference

| File | Purpose |
|------|---------|
| `src/content/about.json` | Data source for About page |
| `src/data/contentRegistry.ts` | Register all editable pages |
| `src/lib/api.ts` | API getters for public pages |
| `src/features/admin/ContentEditorPage.tsx` | Main admin interface |
| `src/features/admin/previews/AboutPageEditor.tsx` | About page editor |
| `src/components/shared/InlineEdit.tsx` | Reusable edit component |
| `src/hooks/useEditableContent.ts` | Content state management |
| `src/services/contentEditorService.ts` | Session storage for changes |
| `src/services/githubAPIService.ts` | GitHub integration |

---

## Summary

This implementation achieves **true WYSIWYG admin editing** by:
1. ✅ Using single JSON source of truth
2. ✅ Rendering exact page UI in admin (no custom forms)
3. ✅ Inline editing with InlineEdit overlays
4. ✅ Session storage for temporary changes
5. ✅ GitHub integration for publishing
6. ✅ Same bilingual support as public site
7. ✅ Clear feedback on pending changes

To make another page editable, follow **Step 1-5 in "How to Replicate for Other Pages"** — the pattern is consistent across all content pages.
