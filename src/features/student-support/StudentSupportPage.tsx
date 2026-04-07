import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, BookOpen, Users, MessageCircle, Calendar, Clock } from 'lucide-react';

export function StudentSupportPage() {
  const { t, isEnglish } = useLanguage();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    {
      icon: <BookOpen size={28} />,
      title: t('Academic Advising', 'Сурлагын зөвлөгөө'),
      description: t('Personalized course planning and academic guidance for every student.', 'Сурагч бүрд хувийн сургалтын төлөвлөлт, сурлагын зөвлөгөө.'),
      color: 'text-digital-blue bg-digital-blue/10',
    },
    {
      icon: <Heart size={28} />,
      title: t('Counseling & Wellness', 'Сэтгэл зүйн зөвлөгөө'),
      description: t('Social-emotional learning support and mental health resources.', 'Нийгэм-сэтгэл хөдлөлийн суралцахуйн дэмжлэг, сэтгэцийн эрүүл мэндийн нөөц.'),
      color: 'text-cardinal-red bg-cardinal-red/10',
    },
    {
      icon: <Users size={28} />,
      title: t('College Counseling', 'Их сургуулийн зөвлөгөө'),
      description: t('Expert guidance for university admissions and application preparation.', 'Их сургуулийн элсэлт, өргөдөл бэлтгэхэд мэргэжлийн зөвлөгөө.'),
      color: 'text-sand bg-sand/20',
    },
    {
      icon: <MessageCircle size={28} />,
      title: t('Tutoring Center', 'Хичээлийн төв'),
      description: t('Peer and instructor-led academic help and writing support.', 'Сурагч болон багш удирдсан сурлагын тусламж, бичих чадварын дэмжлэг.'),
      color: 'text-green-600 bg-green-100',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-digital-blue to-cardinal-red" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {t('Student Support', 'Сурагчийн дэмжлэг')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('Support Services', 'Дэмжлэгийн үйлчилгээ')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl font-sans"
          >
            {t(
              'Comprehensive academic, emotional, and counseling services for every student.',
              'Сурагч бүрд зориулсан сурлага, сэтгэл зүй, зөвлөгөөний цогц үйлчилгээ.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-black mb-3">{service.title}</h3>
                <p className="text-gray-600 font-sans leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Counseling & Wellness Appointment Booking */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="mb-12">
              <h2 className="text-4xl font-serif font-bold text-black mb-4 flex items-center gap-3">
                <Heart className="text-cardinal-red" size={36} />
                {t('Book a Counseling Session', 'Зөвлөгөө авах үе сонгох')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t(
                  'Connect with our school counselor to discuss academic, social, or personal concerns in a safe and supportive environment.',
                  'Сургуулийн зөвлөлгчтэй уулзаж сурлага, нийгэм, хувийн асуудлуудын талаар нээлттэй орчинд ярилцана.'
                )}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <label className="block text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-cardinal-red" />
                    {t('Select Date', 'Өдөр сонгох')}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cardinal-red font-sans"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {isEnglish ? 'Available: Monday - Friday' : 'Боломжит: Даваа - Баасан'}
                  </p>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-lg font-bold text-black mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-cardinal-red" />
                    {t('Select Time', 'Цаг сонгох')}
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cardinal-red font-sans"
                  >
                    <option value="">{t('Choose a time slot', 'Цагийн үе сонгох')}</option>
                    <option value="09:00">09:00 AM - 09:30 AM</option>
                    <option value="09:30">09:30 AM - 10:00 AM</option>
                    <option value="10:00">10:00 AM - 10:30 AM</option>
                    <option value="10:30">10:30 AM - 11:00 AM</option>
                    <option value="11:00">11:00 AM - 11:30 AM</option>
                    <option value="13:00">01:00 PM - 01:30 PM</option>
                    <option value="13:30">01:30 PM - 02:00 PM</option>
                    <option value="14:00">02:00 PM - 02:30 PM</option>
                    <option value="14:30">02:30 PM - 03:00 PM</option>
                    <option value="15:00">03:00 PM - 03:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Counselor Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8 bg-white rounded-xl p-6 border-2 border-cardinal-red"
              >
                <h3 className="font-bold text-black mb-2">{t('Your Counselor', 'Таны зөвлөлгч')}</h3>
                <p className="text-gray-700 font-sans">{isEnglish ? 'Ms. Eleanor Thompson' : 'Элеонор Томпсон эмэгтэй'}</p>
                <p className="text-sm text-gray-600 font-sans mt-2">
                  {isEnglish
                    ? 'School Counselor & Mental Health Specialist'
                    : 'Сургуулийн зөвлөлгч & сэтгэцийн эрүүл мэндийн мэргэжилтэн'}
                </p>
              </motion.div>

              {/* Session Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-sans">{t('Duration', 'Үргэлжлэх хугацаа')}</p>
                  <p className="text-xl font-bold text-black mt-1">30 min</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-sans">{t('Location', 'Байршил')}</p>
                  <p className="text-xl font-bold text-black mt-1">{isEnglish ? 'Counseling Office' : 'Зөвлөгөө кабинет'}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 font-sans">{t('Cost', 'Үнэ')}</p>
                  <p className="text-xl font-bold text-black mt-1">{isEnglish ? 'Free' : 'Үнэгүй'}</p>
                </div>
              </motion.div>

              {/* Book Button */}
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                disabled={!selectedDate || !selectedTime}
                className={`w-full mt-8 py-4 rounded-lg font-bold text-lg transition-all ${
                  selectedDate && selectedTime
                    ? 'bg-cardinal-red text-white hover:bg-red-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t('Book Appointment', 'Уулзалт захиалах')}
              </motion.button>

              <p className="text-xs text-gray-500 text-center font-sans mt-4">
                {isEnglish
                  ? 'You will receive a confirmation email once your appointment is booked.'
                  : 'Уулзалт баталгаажуулахын дараа та баталгаажуулах электрон захидал хүлээж авах болно.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
