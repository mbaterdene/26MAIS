import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface FAQItem {
  id: string;
  question_en: string;
  question_mn: string;
  answer_en: string;
  answer_mn: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'admissions-1',
    question_en: 'What is the admission process?',
    question_mn: 'Элсэлтийн үйл явц юу вэ?',
    answer_en: 'The admission process involves submitting an application, attending an entrance examination, and participating in an interview. Our admissions team will guide you through each step.',
    answer_mn: 'Элсэлтийн үйл явц нь өргөдөл гаргах, орох шалгалтанд хүрэлцэх, сэтгүүлэгтэй уулзах зэргээс бүрдэнэ. Бидний элсэлтийн баг танд алхам бүрт туслах болно.',
    category: 'Admissions',
  },
  {
    id: 'admissions-2',
    question_en: 'What are the tuition fees?',
    question_mn: 'Сургуулийн төлбөр хэд вэ?',
    answer_en: 'Tuition fees vary depending on the grade level and program. Please contact our admissions office for detailed pricing information.',
    answer_mn: 'Сургуулийн төлбөр анги болон хөтөлбөргүүдээс хамаарч ялгаатай байдаг. Дэлгэрэнгүй үнийн мэдээлэлийг авахын тулд элсэлтийн ажилтантай холбоо барина уу.',
    category: 'Admissions',
  },
  {
    id: 'academics-1',
    question_en: 'What programs does the school offer?',
    question_mn: 'Сургууль ямар хөтөлбөр санал болгож байна вэ?',
    answer_en: 'We offer Cambridge IGCSE, Cambridge A-Level, and Mongolian national curriculum programs. Each program is designed to meet international and national standards.',
    answer_mn: 'Бид Cambridge IGCSE, Cambridge A-Level болон Монголын үндэсний боловсролын хөтөлбөрүүдийг санал болгож байна. Тус бүр нь олон улсын болон үндэсний стандартыг хангахаар зохиосон байдаг.',
    category: 'Academics',
  },
  {
    id: 'academics-2',
    question_en: 'What is the class size?',
    question_mn: 'Ангийн хэмжээ хэд байна?',
    answer_en: 'Our average class size is 15-20 students, allowing for personalized attention and meaningful interactions between students and teachers.',
    answer_mn: 'Бидний дундаж ангийн хэмжээ 15-20 сурагч бөгөөд энэ нь ачаалагдсан анхаарал өгөх боломж олгодог.',
    category: 'Academics',
  },
  {
    id: 'student-life-1',
    question_en: 'What extracurricular activities are available?',
    question_mn: 'Ямар сурах бичгийн гадуур үйл ажиллагаа байдаг вэ?',
    answer_en: 'We offer over 30 clubs and activities including sports, arts, community service, and leadership programs. Students can explore their interests and develop new skills.',
    answer_mn: 'Бид спорт, урлаг, нийгмийн үйлчилгээ, удирдлагын хөтөлбөрүүдийг оруулаад 30 гаруй клуб болон үйл ажиллагаа санал болгож байна.',
    category: 'Student Life',
  },
  {
    id: 'student-life-2',
    question_en: 'Do you offer boarding facilities?',
    question_mn: 'Та орон сууцны байр хөлслүүлдэг үү?',
    answer_en: 'No, we are a day school. However, we provide transportation services for students throughout Ulaanbaatar.',
    answer_mn: 'Үгүй, бид өдрийн сургууль юм. Гэхдээ бид Улаанбаатар даяар оюутнуудад тээвэрлэлтийн үйлчилгээ үзүүлдэг.',
    category: 'Student Life',
  },
  {
    id: 'support-1',
    question_en: 'What student support services are available?',
    question_mn: 'Ямар сурагчдын дэмжлэгийн үйлчилгээ байдаг вэ?',
    answer_en: 'We provide counseling services, academic support, college preparation, and mental health resources to ensure student well-being.',
    answer_mn: 'Бид сурагчдын сайн сайхныг хангахын тулд зөвлөгөө, академик дэмжлэг, их сургуулийн бэлтгэл, сэтгэцийн эрүүл мэндийн нөөцийг үзүүлдэг.',
    category: 'Support',
  },
  {
    id: 'support-2',
    question_en: 'How do you support international students?',
    question_mn: 'Та олон улсын оюутнуудыг хэрхэн дэмжих вэ?',
    answer_en: 'We provide language support, cultural integration programs, and specialized guidance for international students transitioning to life at our school.',
    answer_mn: 'Бид хэл хөгжүүлэх дэмжлэг, соёлын нэгтгэлийн хөтөлбөрүүд, олон улсын оюутнуудыг сургуулийн амьдралд шилжүүлэх тусгайлсан зөвлөмж өгдөг.',
    category: 'Support',
  },
];

export function FAQPage() {
  const { isEnglish } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = Array.from(new Set(faqItems.map(item => item.category)));

  return (
    <div className="min-h-screen bg-white pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our school, admissions, academics, and more.</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6 pb-4 border-b-2 border-cardinal-red">{category}</h2>
            <div className="space-y-4">
              {faqItems
                .filter(item => item.category === category)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    className="border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <motion.button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-colors text-left"
                    >
                      <h3 className="text-lg font-bold text-black">
                        {isEnglish ? item.question_en : item.question_mn}
                      </h3>
                      <motion.div
                        animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={24} className="text-cardinal-red flex-shrink-0 ml-4" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedId === item.id ? 'auto' : 0,
                        opacity: expandedId === item.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t-2 border-black bg-gray-50"
                    >
                      <p className="px-6 py-4 text-gray-700 leading-relaxed">
                        {isEnglish ? item.answer_en : item.answer_mn}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="mt-16 p-8 bg-black text-white rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Didn't find your answer?</h3>
          <p className="text-gray-300 mb-6">Feel free to reach out to us directly through our contact page.</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-cardinal-red text-white font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
