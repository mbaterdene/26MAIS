import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, BookOpen, Users, MessageCircle } from 'lucide-react';

export function StudentSupportPage() {
  const { t } = useLanguage();

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
    </div>
  );
}
