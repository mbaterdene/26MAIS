import { useMemo, useState, useEffect } from 'react';
import { Trash2, Plus, X, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { InlineEdit } from '../../components/shared/InlineEdit';

interface FAQItem {
  id: string;
  question_en: string;
  question_mn: string;
  answer_en: string;
  answer_mn: string;
  category: string;
}

interface FAQContentEditorProps {
  content: FAQItem[] | any;
  onUpdate: (path: string, value: any) => void;
}

export function FAQContentEditor({ content, onUpdate }: FAQContentEditorProps) {
  const { isEnglish } = useLanguage();
  const [localFaqList, setLocalFaqList] = useState<FAQItem[]>([]);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync with parent content
  useEffect(() => {
    if (content && Array.isArray(content)) {
      setLocalFaqList(content.filter((item: any) => item && item.id));
    }
  }, [content]);

  // Get unique categories sorted
  const categories = useMemo(() => {
    const cats = Array.from(new Set(localFaqList.map(f => f?.category).filter(Boolean)));
    return cats.sort();
  }, [localFaqList]);

  // Filter FAQs based on search
  const filteredFaqList = useMemo(() => {
    if (!searchTerm.trim()) return localFaqList;
    
    const searchText = searchTerm.toLowerCase();
    return localFaqList.filter(faq => 
      faq && (
        faq.question_en.toLowerCase().includes(searchText) ||
        faq.question_mn.toLowerCase().includes(searchText) ||
        faq.answer_en.toLowerCase().includes(searchText) ||
        faq.answer_mn.toLowerCase().includes(searchText) ||
        faq.category.toLowerCase().includes(searchText)
      )
    );
  }, [localFaqList, searchTerm]);

  const handleAddFAQ = () => {
    const timestamp = Date.now();
    const defaultCategory = categories.length > 0 ? categories[0] : 'General';
    const newFaq: FAQItem = {
      id: `new-${timestamp}`,
      question_en: 'New Question',
      question_mn: 'Шинэ асуулт',
      answer_en: 'Answer goes here',
      answer_mn: 'Хариулт энд байрлана',
      category: defaultCategory,
    };
    const newList = [newFaq, ...localFaqList];
    setLocalFaqList(newList);
    onUpdate('[0].question_en', newFaq.question_en);
  };

  const handleDeleteFAQ = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ item?')) {
      const newList = localFaqList.filter(f => f && f.id !== id);
      setLocalFaqList(newList);
      if (newList.length > 0) {
        onUpdate('[0].question_en', newList[0].question_en);
      }
    }
  };

  const handleUpdateFAQField = (faqId: string, field: keyof FAQItem, value: any) => {
    const faqIndex = localFaqList.findIndex(f => f && f.id === faqId);
    if (faqIndex === -1) return;

    const newList = localFaqList.map(f =>
      f && f.id === faqId ? { ...f, [field]: value } : f
    );
    setLocalFaqList(newList);

    const path = `[${faqIndex}].${field}`;
    onUpdate(path, value);
  };

  const handleAddCategory = () => {
    if (newCategoryInput.trim() && !categories.includes(newCategoryInput.trim())) {
      const trimmedCategory = newCategoryInput.trim();
      setNewCategoryInput('');
      setShowNewCategoryInput(false);
      
      // Add a new FAQ item with the new category
      const timestamp = Date.now();
      const newFaq: FAQItem = {
        id: `new-${timestamp}`,
        question_en: 'New Question',
        question_mn: 'Шинэ асуулт',
        answer_en: 'Answer goes here',
        answer_mn: 'Хариулт энд байрлана',
        category: trimmedCategory,
      };
      const newList = [newFaq, ...localFaqList];
      setLocalFaqList(newList);
      onUpdate('[0].question_en', newFaq.question_en);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h1 className="text-4xl font-serif font-bold text-black mb-2">
          {isEnglish ? 'FAQ Management' : 'ЧХА Удирдлага'}
        </h1>
        <p className="text-gray-600">
          {isEnglish
            ? 'Add, edit, and manage frequently asked questions. Organize by category.'
            : 'ЧХА-г нэмэх, засах, удирдах. Ангилалаар ангилан цэгцэлэх.'}
        </p>
      </div>

      {/* Search & Controls */}
      <div className="bg-white p-6 border-2 border-black rounded-lg space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={isEnglish ? 'Search FAQs...' : 'ЧХА хайх...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddFAQ}
          className="w-full py-2 border-2 border-cardinal-red text-cardinal-red font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors rounded"
        >
          <Plus size={18} />
          {isEnglish ? 'Add New FAQ' : 'Шинэ ЧХА нэмэх'}
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqList.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">
              {searchTerm ? (isEnglish ? 'No matching FAQs' : 'Ямар ч ЧХА олдсонгүй') : (isEnglish ? 'No FAQ items yet' : 'ЧХА зүйлс байхгүй байна')}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddFAQ}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                {isEnglish ? 'Add First FAQ' : 'Эхний ЧХА-г нэмэх'}
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Group by category */}
            {categories.map((category) => {
              const categoryFaqs = filteredFaqList.filter(faq => faq && faq.category === category);
              if (categoryFaqs.length === 0) return null;
              
              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-bold text-black border-b-2 border-cardinal-red pb-2">
                    {category}
                  </h3>
                  <div className="space-y-4 ml-4">
                    {categoryFaqs.map((faq) =>
                      faq && (
                        <div
                          key={faq.id}
                          className="bg-white border-2 border-black rounded-lg p-6 hover:border-blue-300 transition-colors shadow-sm"
                        >
                          {/* FAQ Header with Delete Button */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                                {isEnglish ? 'Question (English)' : 'Асуулт (Англи)'}
                              </p>
                              <div className="text-lg font-semibold mb-3">
                                <InlineEdit
                                  value={faq.question_en}
                                  onChange={(value) =>
                                    handleUpdateFAQField(faq.id, 'question_en', value)
                                  }
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              title={isEnglish ? 'Delete FAQ item' : 'ЧХА зүйлсийг устгах'}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {/* Question Mongolian */}
                          <div className="mb-4">
                            <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                              {isEnglish ? 'Question (Mongolian)' : 'Асуулт (Монгол)'}
                            </p>
                            <InlineEdit
                              value={faq.question_mn}
                              onChange={(value) =>
                                handleUpdateFAQField(faq.id, 'question_mn', value)
                              }
                              className="w-full"
                            />
                          </div>

                          {/* Answer English */}
                          <div className="mb-4">
                            <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                              {isEnglish ? 'Answer (English)' : 'Хариулт (Англи)'}
                            </p>
                            <InlineEdit
                              value={faq.answer_en}
                              onChange={(value) =>
                                handleUpdateFAQField(faq.id, 'answer_en', value)
                              }
                              multiline={true}
                              className="w-full"
                            />
                          </div>

                          {/* Answer Mongolian */}
                          <div className="mb-4">
                            <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                              {isEnglish ? 'Answer (Mongolian)' : 'Хариулт (Монгол)'}
                            </p>
                            <InlineEdit
                              value={faq.answer_mn}
                              onChange={(value) =>
                                handleUpdateFAQField(faq.id, 'answer_mn', value)
                              }
                              multiline={true}
                              className="w-full"
                            />
                          </div>

                          {/* Category */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                              {isEnglish ? 'Category' : 'Ангилал'}
                            </p>
                            <select
                              value={faq.category}
                              onChange={(e) =>
                                handleUpdateFAQField(faq.id, 'category', e.target.value)
                              }
                              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {/* Always include the current category, then other categories */}
                              <option value={faq.category}>{faq.category}</option>
                              {categories
                                .filter(cat => cat !== faq.category)
                                .map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add Category Section */}
            <div className="mt-6 pt-4 border-t-2 border-gray-200">
              {showNewCategoryInput ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCategory();
                      }
                    }}
                    placeholder={isEnglish ? 'Enter category name' : 'Ангилалын нэр оруулна уу'}
                    className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    {isEnglish ? 'Add' : 'Нэмэх'}
                  </button>
                  <button
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setNewCategoryInput('');
                    }}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewCategoryInput(true)}
                  className="w-full py-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition-colors font-semibold"
                >
                  <Plus size={18} className="inline mr-2" />
                  {isEnglish ? 'Add New Category' : 'Шинэ ангилал нэмэх'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
