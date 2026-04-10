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
          </div>
        </section>
      )}

      {/* ── Principal's Greeting ────────────────── */}
      {content?.principal && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="bg-gradient-to-br from-cardinal-red to-digital-blue rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
                  {content.principal.photo ? (
                    <img src={content.principal.photo} alt="Principal" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white text-center">
                      <p className="text-sm mb-2">Photo Placeholder</p>
                      <InlineEdit
                        value={content.principal.photo || ''}
                        onChange={(value) => onUpdate('principal.photo', value)}
                        className="block text-xs text-center"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-serif font-bold mb-3 text-black">
                  <InlineEdit
                    value={bil(isEnglish, content.principal.name_en, content.principal.name_mn)}
                    onChange={(value) => onUpdate(isEnglish ? 'principal.name_en' : 'principal.name_mn', value)}
                  />
                </h2>
                <p className="text-lg font-semibold text-cardinal-red mb-6">
                  <InlineEdit
                    value={bil(isEnglish, content.principal.title_en, content.principal.title_mn)}
                    onChange={(value) => onUpdate(isEnglish ? 'principal.title_en' : 'principal.title_mn', value)}
                  />
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  <InlineEdit
                    value={bil(isEnglish, content.principal.message_en, content.principal.message_mn)}
                    onChange={(value) => onUpdate(isEnglish ? 'principal.message_en' : 'principal.message_mn', value)}
                    multiline
                    className="block w-full"
                  />
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── School Journey Timeline ──────────────– */}
      {content?.timeline && content.timeline.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-black mb-4">{t('Our Journey', 'Манай замнал')}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full border-l-2 border-dashed border-cardinal-red/50" />
              <div className="space-y-10">
                {content.timeline.map((item, index) => (
                  <div key={item.id} className="relative">
                    {/* Mobile Layout */}
                    <div className="md:hidden pl-12">
                      <div className="relative bg-white border border-slate-200 shadow-sm p-6">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-widest text-white bg-cardinal-red mb-3">
                          <InlineEdit
                            value={item.year}
                            onChange={(value) => updateArrayItem('timeline', index, 'year', parseInt(value as string) || 0)}
                            className="text-white"
                          />
                        </span>
                        <h3 className="text-xl font-serif font-bold text-black mb-2">
                          <InlineEdit
                            value={bil(isEnglish, item.title_en, item.title_mn)}
                            onChange={(value) => updateArrayItem('timeline', index, isEnglish ? 'title_en' : 'title_mn', value)}
                          />
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          <InlineEdit
                            value={bil(isEnglish, item.description_en, item.description_mn)}
                            onChange={(value) => updateArrayItem('timeline', index, isEnglish ? 'description_en' : 'description_mn', value)}
                            multiline
                            className="block w-full"
                          />
                        </p>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                      <div className={index % 2 === 0 ? '' : 'order-2'}>
                        <div className="relative bg-white border border-slate-200 shadow-sm p-7">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-widest text-white bg-cardinal-red mb-3">
                            <InlineEdit
                              value={item.year}
                              onChange={(value) => updateArrayItem('timeline', index, 'year', parseInt(value as string) || 0)}
                              className="text-white"
                            />
                          </span>
                          <h3 className="text-xl font-serif font-bold text-black mb-2">
                            <InlineEdit
                              value={bil(isEnglish, item.title_en, item.title_mn)}
                              onChange={(value) => updateArrayItem('timeline', index, isEnglish ? 'title_en' : 'title_mn', value)}
                            />
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            <InlineEdit
                              value={bil(isEnglish, item.description_en, item.description_mn)}
                              onChange={(value) => updateArrayItem('timeline', index, isEnglish ? 'description_en' : 'description_mn', value)}
                              multiline
                              className="block w-full"
                            />
                          </p>
                        </div>
                      </div>
                      <div className={index % 2 === 0 ? 'order-2' : ''} />
                    </div>

                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 bg-cardinal-red rotate-45 border border-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Key Statistics ──────────────────────── */}
      {info && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-16 text-black">{t('School Statistics', 'Сургуулийн статистик')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-8 border-2 border-cardinal-red rounded-lg">
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">
                  <InlineEdit
                    value={content.international_program?.igcse_en || 'IGCSE'}
                    onChange={(value) => onUpdate('international_program.igcse_en', value)}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <InlineEdit
                    value={content.international_program?.igcse_desc_en || 'International General Certificate of Secondary Education'}
                    onChange={(value) => onUpdate('international_program.igcse_desc_en', value)}
                    className="text-sm"
                  />
                </p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">
                  <InlineEdit
                    value={content.international_program?.igcse || 17}
                    onChange={(value) => onUpdate('international_program.igcse', parseInt(value as string) || 17)}
                  />
                </div>
                <p className="text-gray-700 text-sm">{t('subjects', 'хичээл')}</p>
              </div>
              <div className="bg-white p-8 border-2 border-cardinal-red rounded-lg">
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">
                  <InlineEdit
                    value={content.international_program?.as_level_en || 'AS Level'}
                    onChange={(value) => onUpdate('international_program.as_level_en', value)}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <InlineEdit
                    value={content.international_program?.as_level_desc_en || 'Advanced Subsidiary Level'}
                    onChange={(value) => onUpdate('international_program.as_level_desc_en', value)}
                    className="text-sm"
                  />
                </p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">
                  <InlineEdit
                    value={content.international_program?.as_level || 16}
                    onChange={(value) => onUpdate('international_program.as_level', parseInt(value as string) || 16)}
                  />
                </div>
                <p className="text-gray-700 text-sm">{t('subjects', 'хичээл')}</p>
              </div>
              <div className="bg-white p-8 border-2 border-cardinal-red rounded-lg">
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">
                  <InlineEdit
                    value={content.international_program?.a2_level_en || 'A2 Level'}
                    onChange={(value) => onUpdate('international_program.a2_level_en', value)}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <InlineEdit
                    value={content.international_program?.a2_level_desc_en || 'Advanced Level'}
                    onChange={(value) => onUpdate('international_program.a2_level_desc_en', value)}
                    className="text-sm"
                  />
                </p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">
                  <InlineEdit
                    value={content.international_program?.a2_level || 11}
                    onChange={(value) => onUpdate('international_program.a2_level', parseInt(value as string) || 11)}
                  />
                </div>
                <p className="text-gray-700 text-sm">{t('subjects', 'хичээл')}</p>
              </div>
              <div className="bg-white p-8 border-2 border-cardinal-red rounded-lg">
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">
                  <InlineEdit
                    value={content.international_program?.pdq_en || 'PDQ'}
                    onChange={(value) => onUpdate('international_program.pdq_en', value)}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  <InlineEdit
                    value={content.international_program?.pdq_desc_en || 'Professional Development Qualification'}
                    onChange={(value) => onUpdate('international_program.pdq_desc_en', value)}
                    className="text-sm"
                  />
                </p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">
                  <InlineEdit
                    value={content.international_program?.pdq || 2}
                    onChange={(value) => onUpdate('international_program.pdq', parseInt(value as string) || 2)}
                  />
                </div>
                <p className="text-gray-700 text-sm">{t('program', 'хөтөлбөр')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Remarkable Achievements ──────────────– */}
      {content?.achievements && content.achievements.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-16 text-black">{t('Remarkable Achievements', 'Гайхамшигт амжилтууд')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.achievements.slice(0, 6).map((achievement, index) => (
                <div key={achievement.id} className="bg-white border border-gray-200 p-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="bg-cardinal-red px-5 py-3 flex items-center justify-between">
                    <p className="text-xs font-bold tracking-widest text-white uppercase">
                      <InlineEdit
                        value={achievement.type}
                        onChange={(value) => updateArrayItem('achievements', index, 'type', value)}
                        className="text-white text-xs"
                      />
                    </p>
                    <p className="text-sm font-bold text-white">
                      <InlineEdit
                        value={achievement.year > 0 ? achievement.year : '—'}
                        onChange={(value) => updateArrayItem('achievements', index, 'year', parseInt(value as string) || 0)}
                        className="text-white text-sm"
                      />
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-black leading-snug">
                      <InlineEdit
                        value={bil(isEnglish, achievement.title_en, achievement.title_mn)}
                        onChange={(value) => updateArrayItem('achievements', index, isEnglish ? 'title_en' : 'title_mn', value)}
                      />
                    </h3>
                  </div>
                </div>
              ))}
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
