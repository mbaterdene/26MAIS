import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function AdmissionsPage() {
  const { isEnglish } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero - Admissions Closed Status */}
      <section className="relative bg-cardinal-red text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-white to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <div className="h-1 w-16 bg-white/40 mx-auto mb-6" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight"
          >
            {isEnglish ? 'The 2026-27 Application is Now Closed' : '2026-27 оны элсэлт хаагдлаа'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-lg text-white/90 max-w-2xl mx-auto font-sans mb-8"
          >
            {isEnglish
              ? 'We received an overwhelming response this year. Registration for 2027-28 will open in June 2027.'
              : 'Энэ жил маш их хүн хүсэлтийн гүйцэтгэл илгээсэн. 2027-28 оны бүртгэл 2027 оны 6-р сарын үед нээгдэх болно.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 w-16 bg-white/40 mx-auto"
          />
        </div>
      </section>

      {/* Information Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Timeline */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-bold text-black mb-8">{isEnglish ? 'Our Process' : 'Бидний үйл явц'}</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cardinal-red text-white font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{isEnglish ? 'Open Registration' : 'Бүртгэлийг нээх'}</h3>
                    <p className="text-gray-600">{isEnglish ? 'Registration opens every June for the next academic year' : 'Бүртгэл жил бүрийн 6-р сарын үед дараа жилийн хичээлийн жилээс нээгддэг'}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-digital-blue text-white font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{isEnglish ? 'Entrance Examination' : 'Орох шалгалт'}</h3>
                    <p className="text-gray-600">{isEnglish ? 'Comprehensive exam testing academic knowledge and problem-solving abilities' : 'Сурлагын мэдлэг болон асуудал шийдвэрлэх чадварыг сорих цогц шалгалт'}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sand text-black font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{isEnglish ? 'Results & Interview' : 'Үр дүн ба ярилцлага'}</h3>
                    <p className="text-gray-600">{isEnglish ? 'Top performers are invited for interviews to assess fit with our community' : 'Хамгийн сайн гүйцэтгэгчдийг манай сургуулийн нийгэм дээр таарах эсэхийг үнэлэхийн тулд ярилцлагад урьдаг'}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white font-bold">4</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">{isEnglish ? 'Admission Decision' : 'Элсэлтийн шийдвэр'}</h3>
                    <p className="text-gray-600">{isEnglish ? '96 students selected to join MAIS for the academic year' : 'MAIS-д оролцохоор 96 сурагчдыг сонгож авдаг'}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Key Facts */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="bg-gradient-to-br from-cardinal-red/10 to-cardinal-red/5 rounded-2xl p-8 border border-cardinal-red/20">
                <h3 className="text-4xl font-bold text-cardinal-red mb-2">96</h3>
                <p className="text-gray-700">{isEnglish ? 'Students admitted annually' : 'Жил бүр элсүүлэхдэг сурагчид'}</p>
              </div>
              <div className="bg-gradient-to-br from-digital-blue/10 to-digital-blue/5 rounded-2xl p-8 border border-digital-blue/20">
                <h3 className="text-4xl font-bold text-digital-blue mb-2">Grade 9-12</h3>
                <p className="text-gray-700">{isEnglish ? 'Entry levels available' : 'Орох боломжтой ангид'}</p>
              </div>
              <div className="bg-gradient-to-br from-sand/20 to-sand/10 rounded-2xl p-8 border border-sand/30">
                <h3 className="text-4xl font-bold text-sand mb-2">Selective</h3>
                <p className="text-gray-700">{isEnglish ? 'Based on merit and fit' : 'Ур чадвар болон таарамжийн үндсэн дээр'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Exam */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-3xl font-serif font-bold text-black mb-6">{isEnglish ? 'About Our Entrance Examination' : 'Манай орох шалгалтын талаар'}</h2>
            <div className="text-gray-700 font-sans leading-relaxed space-y-4">
              <p>{isEnglish 
                ? 'The entrance examination is designed to identify students with strong academic foundations and the potential to thrive in our rigorous, international curriculum. The exam assesses knowledge across key subjects and evaluates problem-solving abilities.'
                : 'Орох шалгалт нь манай боловсролын цогц, олон улсын хөтөлбөрийн хүрээнд амжилтанд хүрэх боломжтой сайн академик суурьтай сурагчдыг эрэмбэлэхийн тулд зохион бүтээгдсэн. Шалгалт нь гол хичээлүүдийн мэдлэг болон асуудал шийдвэрлэх чадварыг үнэлдэг.'}</p>
              <p>{isEnglish 
                ? 'All candidates who pass the entrance examination are invited to participate in interviews. The interview process helps us understand each student\'s values, interests, and how well they align with our school community.'
                : 'Орох шалгалтыг үлгэрмэцэй өнгөрөөсөн бүх нэр дэвшигчдийг ярилцлагад оролцохыг урьдаг. Ярилцлагын үйл явц нь бид сурагч бүрийн үнэ цэнэ, сонирхол болон манай сургуулийн нийгэмтэй хэр сайн адилшуулж байгааг ойлгоход туслалцаа үзүүлдэг.'}</p>
              <p className="font-bold text-cardinal-red">{isEnglish 
                ? 'Note: The 2026-27 application period has closed. Please return in June 2027 for the next application cycle.'
                : 'Анхаарна уу: 2026-27 оны элсэлтийн хугацаа хаагдлаа. Дараа элсэлтийн мөчлөг 2027 оны 6-р сарын үед буцаж ирээрэй.'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-3xl font-serif font-bold text-black mb-12 text-center"
          >
            {isEnglish ? 'Frequently Asked Questions' : 'Олон асуудаг асуултууд'}
          </motion.h2>
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="border-l-4 border-cardinal-red bg-gray-50 rounded-lg p-6"
            >
              <h3 className="font-bold text-black mb-2">{isEnglish ? 'When does registration open?' : 'Бүртгэл хэзээ нээгддэг вэ?'}</h3>
              <p className="text-gray-700">{isEnglish 
                ? 'Registration opens in June each year for the following academic year. The next registration window will open in June 2027.'
                : 'Бүртгэл жил бүрийн 6-р сарын үед дараа жилийн хичээлийн жилээр нээгддэг. Дараа бүртгэлийн цэцэ 2027 оны 6-р сарын үед нээгдэх болно.'}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border-l-4 border-digital-blue bg-gray-50 rounded-lg p-6"
            >
              <h3 className="font-bold text-black mb-2">{isEnglish ? 'What grades can apply?' : 'Ямар ангид элсэх боломжтой вэ?'}</h3>
              <p className="text-gray-700">{isEnglish 
                ? 'Students in grades 9, 10, 11, and 12 can apply. Each grade level has limited spots available.'
                : '9, 10, 11, 12 ангийн сурагчид элсэх боломжтой. Ангид бүр хязгаарлагдмал байр байдаг.'}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-l-4 border-sand bg-gray-50 rounded-lg p-6"
            >
              <h3 className="font-bold text-black mb-2">{isEnglish ? 'What is the exam format?' : 'Шалгалтын хэлбэр юу вэ?'}</h3>
              <p className="text-gray-700">{isEnglish 
                ? 'The entrance exam includes questions on Mathematics, English, Mongolian, Science, and reasoning. The exam duration is approximately 3 hours.'
                : 'Орох шалгалтанд Математик, Англи хэл, Монгол хэл, Шинжлэх ухаан болон үндэслэл дүгнэлтүүдийн асуултууд багтдаг. Шалгалтын үргэлжлэх хугацаа ойролцоогоор 3 цаг байдаг.'}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
