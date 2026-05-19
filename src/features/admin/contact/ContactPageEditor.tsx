import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

import { InlineEdit } from '../../components/shared/InlineEdit';
import { Trash2, Plus } from 'lucide-react';

interface ContactData {
  inquiry_types: Array<{
    value: string;
    label_en: string;
    label_mn: string;
  }>;
  form_placeholders: {
    name_en: string;
    name_mn: string;
    email_en: string;
    email_mn: string;
    subject_en: string;
    subject_mn: string;
    message_en: string;
    message_mn: string;
  };
  contact_info: {
    address_line1: string;
    address_line2: string;
    address_line3: string;
    phone: string;
    phone_link: string;
    email: string;
    office_hours_en: string;
    office_hours_mn: string;
    weekend_hours_en: string;
    weekend_hours_mn: string;
  };
  header: {
    title_en: string;
    title_mn: string;
    subtitle_en: string;
    subtitle_mn: string;
  };
}

interface ContactPageEditorProps {
  content: ContactData;
  onUpdate: (path: string, value: any) => void;
}

export function ContactPageEditor({ content, onUpdate }: ContactPageEditorProps) {
  const { t } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(true);
  const [newInquiryType, setNewInquiryType] = useState('');
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);

  if (!content || !content.header || !content.contact_info || !content.form_placeholders || !content.inquiry_types) {
    return <div className="p-8 text-center text-red-600">Error: Contact data not properly loaded</div>;
  }

  const handleAddInquiryType = () => {
    if (newInquiryType.trim()) {
      const newType = {
        value: newInquiryType.toLowerCase().replace(/\s+/g, '-'),
        label_en: '',
        label_mn: '',
      };
      const updatedTypes = [...content.inquiry_types, newType];
      onUpdate('inquiry_types', updatedTypes);
      setNewInquiryType('');
      setShowNewTypeInput(false);
    }
  };

  const handleRemoveInquiryType = (index: number) => {
    const updatedTypes = content.inquiry_types.filter((_, i) => i !== index);
    onUpdate('inquiry_types', updatedTypes);
  };

  const handleUpdateInquiryType = (index: number, field: 'label_en' | 'label_mn', value: string) => {
    const updatedTypes = [...content.inquiry_types];
    updatedTypes[index] = {
      ...updatedTypes[index],
      [field]: value,
    };
    onUpdate('inquiry_types', updatedTypes);
  };

  const getLabel = (item: typeof content.inquiry_types[0]) => {
    return isEnglish ? item.label_en : item.label_mn;
  };

  return (
    <div className="w-full">
      {/* ── Language Toggle ────────────────────── */}
      <div className="sticky top-24 z-40 bg-white border-b-2 border-black px-4 sm:px-6 lg:px-8 py-3 flex justify-end gap-2">
        <button
          onClick={() => setIsEnglish(true)}
          className={`px-4 py-2 font-bold uppercase text-sm ${
            isEnglish
              ? 'bg-cardinal-red text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          {t('English', 'Англи')}
        </button>
        <button
          onClick={() => setIsEnglish(false)}
          className={`px-4 py-2 font-bold uppercase text-sm ${
            !isEnglish
              ? 'bg-cardinal-red text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          {t('Mongolian', 'Монгол')}
        </button>
      </div>

      {/* ── Contact Page Preview ──────────────────── */}
      <div className="min-h-screen bg-white pt-8 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
              <InlineEdit
                value={isEnglish ? content.header.title_en : content.header.title_mn}
                onChange={(value) => onUpdate(isEnglish ? 'header.title_en' : 'header.title_mn', value)}
              />
            </h1>
            <p className="text-xl text-gray-600">
              <InlineEdit
                value={isEnglish ? content.header.subtitle_en : content.header.subtitle_mn}
                onChange={(value) => onUpdate(isEnglish ? 'header.subtitle_en' : 'header.subtitle_mn', value)}
                multiline
                className="block w-full"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Address */}
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                    {t('Address', 'Хаяг')}
                  </h3>
                  <p className="text-gray-600">
                    <InlineEdit
                      value={content.contact_info.address_line1}
                      onChange={(value) => onUpdate('contact_info.address_line1', value)}
                      className="block mb-1"
                    />
                    <br />
                    <InlineEdit
                      value={content.contact_info.address_line2}
                      onChange={(value) => onUpdate('contact_info.address_line2', value)}
                      className="block mb-1"
                    />
                    <br />
                    <InlineEdit
                      value={content.contact_info.address_line3}
                      onChange={(value) => onUpdate('contact_info.address_line3', value)}
                    />
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                    {t('Phone', 'Утас')}
                  </h3>
                  <p className="text-gray-600">
                    <InlineEdit
                      value={content.contact_info.phone}
                      onChange={(value) => onUpdate('contact_info.phone', value)}
                    />
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                    {t('Email', 'Имэйл')}
                  </h3>
                  <p className="text-gray-600">
                    <InlineEdit
                      value={content.contact_info.email}
                      onChange={(value) => onUpdate('contact_info.email', value)}
                    />
                  </p>
                </div>

                {/* Office Hours */}
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                    {t('Office Hours', 'Оффисын цаг')}
                  </h3>
                  <p className="text-gray-600">
                    <InlineEdit
                      value={isEnglish ? content.contact_info.office_hours_en : content.contact_info.office_hours_mn}
                      onChange={(value) => onUpdate(isEnglish ? 'contact_info.office_hours_en' : 'contact_info.office_hours_mn', value)}
                      className="block mb-1"
                    />
                    <br />
                    <InlineEdit
                      value={isEnglish ? content.contact_info.weekend_hours_en : content.contact_info.weekend_hours_mn}
                      onChange={(value) => onUpdate(isEnglish ? 'contact_info.weekend_hours_en' : 'contact_info.weekend_hours_mn', value)}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form Preview */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                    {t('Name', 'Нэр')} <span className="text-cardinal-red">*</span>
                  </label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-gray-100"
                    placeholder={isEnglish ? content.form_placeholders.name_en : content.form_placeholders.name_mn}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('Placeholder:', 'Зөвлөмж:')} 
                    <InlineEdit
                      value={isEnglish ? content.form_placeholders.name_en : content.form_placeholders.name_mn}
                      onChange={(value) => onUpdate(isEnglish ? 'form_placeholders.name_en' : 'form_placeholders.name_mn', value)}
                      className="inline ml-1"
                    />
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                    {t('Email Address', 'Имэйл хаяг')} <span className="text-cardinal-red">*</span>
                  </label>
                  <input
                    type="email"
                    disabled
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-gray-100"
                    placeholder={isEnglish ? content.form_placeholders.email_en : content.form_placeholders.email_mn}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('Placeholder:', 'Зөвлөмж:')} 
                    <InlineEdit
                      value={isEnglish ? content.form_placeholders.email_en : content.form_placeholders.email_mn}
                      onChange={(value) => onUpdate(isEnglish ? 'form_placeholders.email_en' : 'form_placeholders.email_mn', value)}
                      className="inline ml-1"
                    />
                  </p>
                </div>

                {/* Type of Inquiry */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                    {t('Type of Inquiry', 'Асуултын төрөл')} <span className="text-cardinal-red">*</span>
                  </label>
                  <select
                    disabled
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-gray-100"
                  >
                    {content.inquiry_types.map(type => (
                      <option key={type.value} value={type.value}>
                        {getLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                    {t('Subject', 'Сэдэв')} <span className="text-cardinal-red">*</span>
                  </label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-gray-100"
                    placeholder={isEnglish ? content.form_placeholders.subject_en : content.form_placeholders.subject_mn}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('Placeholder:', 'Зөвлөмж:')} 
                    <InlineEdit
                      value={isEnglish ? content.form_placeholders.subject_en : content.form_placeholders.subject_mn}
                      onChange={(value) => onUpdate(isEnglish ? 'form_placeholders.subject_en' : 'form_placeholders.subject_mn', value)}
                      className="inline ml-1"
                    />
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                    {t('Message', 'Мессеж')} <span className="text-cardinal-red">*</span>
                  </label>
                  <textarea
                    disabled
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none bg-gray-100"
                    placeholder={isEnglish ? content.form_placeholders.message_en : content.form_placeholders.message_mn}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t('Placeholder:', 'Зөвлөмж:')} 
                    <InlineEdit
                      value={isEnglish ? content.form_placeholders.message_en : content.form_placeholders.message_mn}
                      onChange={(value) => onUpdate(isEnglish ? 'form_placeholders.message_en' : 'form_placeholders.message_mn', value)}
                      multiline
                      className="block w-full"
                    />
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  disabled
                  className="w-full px-6 py-4 bg-cardinal-red text-white font-bold uppercase tracking-widest opacity-50"
                >
                  {t('Send Message', 'Мессеж илгээх')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Inquiry Types Management ────────────── */}
      <div className="bg-gray-50 border-t-2 border-black px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-black">
            {t('Types of Inquiry', 'Асуултын төрлүүд')}
          </h2>

          <div className="space-y-6 mb-6">
            {content.inquiry_types.map((type, index) => (
              <div key={index} className="border-2 border-black p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                      {t('Value', 'Утга')}: {type.value}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveInquiryType(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                      {t('Label (English)', 'Нэрлэл (Англи)')}
                    </p>
                    <InlineEdit
                      value={type.label_en}
                      onChange={(value) => handleUpdateInquiryType(index, 'label_en', value)}
                      className="block w-full"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                      {t('Label (Mongolian)', 'Нэрлэл (Монгол)')}
                    </p>
                    <InlineEdit
                      value={type.label_mn}
                      onChange={(value) => handleUpdateInquiryType(index, 'label_mn', value)}
                      className="block w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Inquiry Type */}
          {showNewTypeInput ? (
            <div className="border-2 border-black p-6 bg-gray-50">
              <p className="text-xs font-bold uppercase text-gray-500 mb-3">
                {t('New Inquiry Type Value', 'Шинэ асуултын төрлийн утга')}
              </p>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newInquiryType}
                  onChange={(e) => setNewInquiryType(e.target.value)}
                  placeholder={t('e.g., counseling', 'жнь зөвлөгөө')}
                  className="flex-1 px-3 py-2 border-2 border-black rounded"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddInquiryType();
                    if (e.key === 'Escape') setShowNewTypeInput(false);
                  }}
                />
                <button
                  onClick={handleAddInquiryType}
                  className="px-4 py-2 bg-cardinal-red text-white font-bold rounded hover:bg-red-700 transition-colors"
                >
                  {t('Add', 'Нэмэх')}
                </button>
                <button
                  onClick={() => setShowNewTypeInput(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded hover:bg-gray-400 transition-colors"
                >
                  {t('Cancel', 'Цуцлах')}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewTypeInput(true)}
              className="w-full py-3 border-2 border-dashed border-black text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Plus size={20} />
              {t('Add New Inquiry Type', 'Шинэ асуултын төрөл нэмэх')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
