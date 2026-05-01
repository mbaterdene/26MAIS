import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import contactData from '../../content/contact.json';

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export function ContactPage() {
  const { isEnglish } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'general',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const getLabel = (item: typeof contactData.inquiry_types[0]) => {
    return isEnglish ? item.label_en : item.label_mn;
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            {isEnglish ? contactData.header.title_en : contactData.header.title_mn}
          </h1>
          <p className="text-xl text-gray-600">
            {isEnglish ? contactData.header.subtitle_en : contactData.header.subtitle_mn}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                  {isEnglish ? 'Address' : 'Хаяг'}
                </h3>
                <p className="text-gray-600">
                  {contactData.contact_info.address_line1}<br />
                  {contactData.contact_info.address_line2}<br />
                  {contactData.contact_info.address_line3}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                  {isEnglish ? 'Phone' : 'Утас'}
                </h3>
                <p className="text-gray-600">
                  <a href={`tel:${contactData.contact_info.phone_link}`} className="hover:text-cardinal-red transition-colors">
                    {contactData.contact_info.phone}
                  </a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                  {isEnglish ? 'Email' : 'Имэйл'}
                </h3>
                <p className="text-gray-600">
                  <a href={`mailto:${contactData.contact_info.email}`} className="hover:text-cardinal-red transition-colors">
                    {contactData.contact_info.email}
                  </a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-bold uppercase tracking-widest text-black mb-2">
                  {isEnglish ? 'Office Hours' : 'Оффисын цаг'}
                </h3>
                <p className="text-gray-600">
                  {isEnglish ? contactData.contact_info.office_hours_en : contactData.contact_info.office_hours_mn}
                  <br />
                  {isEnglish ? contactData.contact_info.weekend_hours_en : contactData.contact_info.weekend_hours_mn}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                  {isEnglish ? 'Name' : 'Нэр'} <span className="text-cardinal-red">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                  placeholder={isEnglish ? contactData.form_placeholders.name_en : contactData.form_placeholders.name_mn}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                  {isEnglish ? 'Email Address' : 'Имэйл хаяг'} <span className="text-cardinal-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                  placeholder={isEnglish ? contactData.form_placeholders.email_en : contactData.form_placeholders.email_mn}
                />
              </div>

              {/* Type of Inquiry */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                  {isEnglish ? 'Type of Inquiry' : 'Асуултын төрөл'} <span className="text-cardinal-red">*</span>
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-cardinal-red/50 bg-white"
                >
                  {contactData.inquiry_types.map(type => (
                    <option key={type.value} value={type.value}>
                      {getLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                  {isEnglish ? 'Subject' : 'Сэдэв'} <span className="text-cardinal-red">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                  placeholder={isEnglish ? contactData.form_placeholders.subject_en : contactData.form_placeholders.subject_mn}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-600 mb-2">
                  {isEnglish ? 'Message' : 'Мессеж'} <span className="text-cardinal-red">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                  placeholder={isEnglish ? contactData.form_placeholders.message_en : contactData.form_placeholders.message_mn}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-cardinal-red text-white font-bold uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? (isEnglish ? 'Sending...' : 'Илгээж байна...')
                  : (isEnglish ? 'Send Message' : 'Мессеж илгээх')}
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-green-50 border-2 border-green-500 rounded text-green-700 font-bold text-center"
                >
                  {isEnglish
                    ? '✓ Message sent successfully! We will get back to you soon.'
                    : '✓ Мессеж амжилттай илгээгдлээ! Бид удалгүй холбоо барах болно.'}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
