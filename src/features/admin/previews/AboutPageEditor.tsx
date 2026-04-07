import { useLanguage } from '../../../context/LanguageContext';
import { pageText } from '../../../data/pageText';
import { InlineEdit } from '../../../components/shared/InlineEdit';
import type { SchoolInfo } from '../../../lib/types';

interface AboutPageEditorProps {
  content: SchoolInfo;
  onUpdate: (field: string, value: any) => void;
}

export function AboutPageEditor({ content, onUpdate }: AboutPageEditorProps) {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.about;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);

  return (
    <div className="w-full">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-cardinal-red to-digital-blue" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cardinal-red/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8">
            {tr(ui.heroTitle)}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            {t('Mongol', 'Монгол')} <br />
            <span className="text-cardinal-red">{t('Aspiration', 'Тэмүүлэл')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-sans leading-relaxed">
            {tr(ui.heroSubtitle)}
          </p>
        </div>
      </section>

      {/* ── Vision & Mission ───────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vision */}
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cardinal-red bg-cardinal-red/10 px-3 py-1 rounded-full mb-4">
                {tr(ui.vision)}
              </span>
              <p className="text-lg text-gray-700 font-sans leading-relaxed">
                <InlineEdit
                  value={isEnglish ? (content.vision_en || '') : (content.vision_mn || '')}
                  onChange={(value) => onUpdate(isEnglish ? 'vision_en' : 'vision_mn', value)}
                  multiline
                  className="block w-full"
                />
              </p>
            </div>

            {/* Mission */}
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-4">
                {tr(ui.mission)}
              </span>
              <p className="text-lg text-gray-700 font-sans leading-relaxed">
                <InlineEdit
                  value={isEnglish ? (content.mission_en || '') : (content.mission_mn || '')}
                  onChange={(value) => onUpdate(isEnglish ? 'mission_en' : 'mission_mn', value)}
                  multiline
                  className="block w-full"
                />
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {content.total_students && (
              <div className="text-center">
                <p className="text-4xl font-bold text-cardinal-red">
                  <InlineEdit
                    value={content.total_students}
                    onChange={(value) => onUpdate('total_students', parseInt(value as string) || 0)}
                  />
                </p>
                <p className="text-gray-500 mt-1">{tr(ui.totalStudents)}</p>
              </div>
            )}
            {content.total_teachers && (
              <div className="text-center">
                <p className="text-4xl font-bold text-digital-blue">
                  <InlineEdit
                    value={content.total_teachers}
                    onChange={(value) => onUpdate('total_teachers', parseInt(value as string) || 0)}
                  />
                </p>
                <p className="text-gray-500 mt-1">{tr(ui.totalTeachers)}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* General Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-black mb-8">About Mongol Aspiration School</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <InlineEdit
              value={isEnglish ? (content.general_info_en || '') : (content.general_info_mn || '')}
              onChange={(value) => onUpdate(isEnglish ? 'general_info_en' : 'general_info_mn', value)}
              multiline
              className="block w-full"
            />
          </p>
        </div>
      </section>

      {/* Edit Mode Notice */}
      <div className="bg-blue-50 border border-blue-200 p-4 text-center text-sm text-blue-700 font-medium">
        ✏️ Click on any text to edit it. Changes are saved to your session until you commit.
      </div>
    </div>
  );
}
