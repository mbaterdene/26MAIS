import { useLanguage } from '../../../context/LanguageContext';
import { bil, formatNumber } from '../../../lib/utils';
import { pageText } from '../../../data/pageText';
import { InlineEdit } from '../../../components/shared/InlineEdit';
import type { AboutData } from '../../../lib/api';

interface AboutPageEditorProps {
  content: AboutData;
  onUpdate: (path: string, value: any) => void;
}

export function AboutPageEditor({ content, onUpdate }: AboutPageEditorProps) {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.about;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);
  const info = content?.school_info;

  const updateArrayItem = (arrayPath: string, index: number, field: string, value: any) => {
    const fullPath = `${arrayPath}[${index}].${field}`;
    onUpdate(fullPath, value);
  };

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
      {info && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cardinal-red bg-cardinal-red/10 px-3 py-1 rounded-full mb-4">{tr(ui.vision)}</span>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">
                  <InlineEdit
                    value={bil(isEnglish, info.vision_en || '', info.vision_mn || '')}
                    onChange={(value) => onUpdate(isEnglish ? 'school_info.vision_en' : 'school_info.vision_mn', value)}
                    multiline
                    className="block w-full"
                  />
                </p>
              </div>
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-4">{tr(ui.mission)}</span>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">
                  <InlineEdit
                    value={bil(isEnglish, info.mission_en || '', info.mission_mn || '')}
                    onChange={(value) => onUpdate(isEnglish ? 'school_info.mission_en' : 'school_info.mission_mn', value)}
                    multiline
                    className="block w-full"
                  />
                </p>
              </div>
            </div>
            {(info.total_students || info.total_teachers) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {info.total_students && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-cardinal-red">
                      <InlineEdit
                        value={info.total_students}
                        onChange={(value) => onUpdate('school_info.total_students', parseInt(value as string) || 0)}
                      />
                    </p>
                    <p className="text-gray-500 mt-1">{tr(ui.totalStudents)}</p>
                  </div>
                )}
                {info.total_teachers && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-digital-blue">
                      <InlineEdit
                        value={info.total_teachers}
                        onChange={(value) => onUpdate('school_info.total_teachers', parseInt(value as string) || 0)}
                      />
                    </p>
                    <p className="text-gray-500 mt-1">{tr(ui.totalTeachers)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── School Characteristics ──────────────── */}
      {content && content.characteristics.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-12 text-black">{tr(ui.schoolCharacteristics)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.characteristics.map((c, i) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-serif font-bold text-black mb-3">
                    <InlineEdit
                      value={bil(isEnglish, c.title_en, c.title_mn)}
                      onChange={(value) => updateArrayItem('characteristics', i, isEnglish ? 'title_en' : 'title_mn', value)}
                    />
                  </h3>
                  <p className="text-gray-600 font-sans leading-relaxed">
                    <InlineEdit
                      value={bil(isEnglish, c.description_en, c.description_mn)}
                      onChange={(value) => updateArrayItem('characteristics', i, isEnglish ? 'description_en' : 'description_mn', value)}
                      multiline
                      className="block w-full"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── National Program Results ────────────── */}
      {content?.national_program && (
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-12">{tr(ui.nationalProgramResults)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-5xl font-bold text-cardinal-red">
                  <InlineEdit
                    value={content.national_program.performance_rate}
                    onChange={(value) => onUpdate('national_program.performance_rate', parseFloat(value as string) || 0)}
                  />
                  %
                </p>
                <p className="text-gray-400 mt-2">{tr(ui.performanceRate)}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-digital-blue">
                  <InlineEdit
                    value={content.national_program.success_rate}
                    onChange={(value) => onUpdate('national_program.success_rate', parseFloat(value as string) || 0)}
                  />
                  %
                </p>
                <p className="text-gray-400 mt-2">{tr(ui.successRate)}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-sand">
                  <InlineEdit
                    value={content.national_program.quality_rate}
                    onChange={(value) => onUpdate('national_program.quality_rate', parseFloat(value as string) || 0)}
                  />
                  %
                </p>
                <p className="text-gray-400 mt-2">{tr(ui.qualityRate)}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Graduate Information ────────────────── */}
      {content && content.graduate_stats.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-4 text-black">{tr(ui.graduateInformation)}</h2>
            <div className="grid grid-cols-3 gap-8 text-center mb-12">
              <div>
                <p className="text-3xl font-bold text-cardinal-red">
                  <InlineEdit
                    value={content.total_graduates}
                    onChange={(value) => onUpdate('total_graduates', parseInt(value as string) || 0)}
                  />
                </p>
                <p className="text-gray-500">{tr(ui.totalGraduates)}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-digital-blue">
                  <InlineEdit
                    value={content.total_abroad}
                    onChange={(value) => onUpdate('total_abroad', parseInt(value as string) || 0)}
                  />
                </p>
                <p className="text-gray-500">{tr(ui.abroad)}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sand">
                  $
                  <InlineEdit
                    value={content.total_scholarship}
                    onChange={(value) => onUpdate('total_scholarship', parseInt(value as string) || 0)}
                  />
                </p>
                <p className="text-gray-500">{tr(ui.scholarshipAmount)}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.year)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.totalGraduates)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.abroad)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.scholarshipAmount)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.percentage)}</th>
                  </tr>
                </thead>
                <tbody>
                  {content.graduate_stats.map((g) => (
                    <tr key={g.year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{g.year}</td>
                      <td className="py-3 px-4">{formatNumber(g.total_graduates)}</td>
                      <td className="py-3 px-4">{formatNumber(g.abroad_count)}</td>
                      <td className="py-3 px-4">${formatNumber(g.scholarship_amount)}</td>
                      <td className="py-3 px-4">{g.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Edit Mode Notice */}
      <div className="bg-blue-50 border border-blue-200 p-4 text-center text-sm text-blue-700 font-medium">
        ✏️ Click on any text to edit it. Changes are saved to your session until you commit.
      </div>
    </div>
  );
}
