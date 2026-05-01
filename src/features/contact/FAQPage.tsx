import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import faqData from '../../content/faq.json';

interface FAQItem {
  id: string;
  question_en: string;
  question_mn: string;
  answer_en: string;
  answer_mn: string;
  category: string;
}

const faqItems: FAQItem[] = faqData.faq;

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
