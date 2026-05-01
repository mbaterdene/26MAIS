import { useMemo, useState, useEffect } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { InlineEdit } from '../../../components/shared/InlineEdit';

interface Subject {
  id: number;
  name_en: string;
  name_mn: string;
  code: string;
  level: 'AS/A' | 'IGCSE' | 'National';
  program: 'international' | 'national';
  url?: string;
}

interface AcademicsContentEditorProps {
  content: any;
  onUpdate: (path: string, value: any) => void;
}

export function AcademicsContentEditor({ content, onUpdate }: AcademicsContentEditorProps) {
  const { isEnglish } = useLanguage();
  const [localSubjects, setLocalSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync with parent content
  useEffect(() => {
    if (content && content.international && content.national) {
      const intlSubjects = Array.isArray(content.international) ? content.international : [];
      const natSubjects = Array.isArray(content.national) ? content.national : [];
      setLocalSubjects([
        ...intlSubjects.filter((s: any) => s && s.program === 'international'),
        ...natSubjects.filter((s: any) => s && s.program === 'national'),
      ]);
    }
  }, [content]);

  // Ensure content is always an array
  const subjectsList = useMemo(() => {
    return Array.isArray(localSubjects) ? localSubjects.filter(s => s && s.program) : [];
  }, [localSubjects]);

  // Filter subjects based on search
  const filteredSubjects = useMemo(() => {
    if (!searchTerm.trim()) return subjectsList;
    
    const searchText = searchTerm.toLowerCase();
    return subjectsList.filter(subject =>
      subject.name_en.toLowerCase().includes(searchText) ||
      subject.name_mn.toLowerCase().includes(searchText) ||
      (subject.code && subject.code.toLowerCase().includes(searchText)) ||
      (subject.level && subject.level.toLowerCase().includes(searchText))
    );
  }, [subjectsList, searchTerm]);

  const internationalSubjects = filteredSubjects.filter(s => s && s.program === 'international');
  const nationalSubjects = filteredSubjects.filter(s => s && s.program === 'national');

  const handleAddSubject = (program: 'international' | 'national') => {
    const validSubjects = subjectsList.filter(s => s && s.id);
    const newId = validSubjects.length > 0 ? Math.max(...validSubjects.map(s => s.id)) + 1 : 1;
    const newSubject: Subject = {
      id: newId,
      name_en: 'New Subject',
      name_mn: 'Шинэ хичээл',
      code: 'XXXX',
      level: program === 'international' ? 'AS/A' : 'National',
      program: program,
      url: program === 'international' ? '' : undefined,
    };
    const newList = [newSubject, ...subjectsList.filter(s => s)]; // Add new subject at top
    setLocalSubjects(newList);
    
    // Notify parent about all fields of the new subject
    const intl = newList.filter(s => s && s.program === 'international');
    const nat = newList.filter(s => s && s.program === 'national');
    onUpdate('international', intl);
    onUpdate('national', nat);
  };

  const handleDeleteSubject = (id: number) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      const newList = subjectsList.filter(s => s.id !== id);
      setLocalSubjects(newList);
      
      // Rebuild the nested structure for proper tracking
      const intl = newList.filter(s => s.program === 'international');
      const nat = newList.filter(s => s.program === 'national');
      
      // Notify parent by updating the entire structure
      onUpdate('international', intl);
      onUpdate('national', nat);
    }
  };

  const handleUpdateSubjectField = (subjectId: number, field: keyof Subject, value: any) => {
    const subjectIndex = subjectsList.findIndex(s => s.id === subjectId);
    if (subjectIndex === -1) return;
    
    // Update local state immediately for UI responsiveness
    const newList = subjectsList.map(s =>
      s.id === subjectId ? { ...s, [field]: value } : s
    );
    setLocalSubjects(newList);
    
    // Rebuild nested structure and update the appropriate section
    const intl = newList.filter(s => s.program === 'international');
    const nat = newList.filter(s => s.program === 'national');
    onUpdate('international', intl);
    onUpdate('national', nat);
  };

  const LevelBadge = ({ level }: { level: string }) => {
    const colors: Record<string, string> = {
      'AS/A': 'bg-blue-100 text-blue-800',
      'IGCSE': 'bg-purple-100 text-purple-800',
      'National': 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-bold rounded ${colors[level] || 'bg-gray-100 text-gray-800'}`}>
        {level}
      </span>
    );
  };

  const renderSubjectCard = (subject: Subject) => {
    if (!subject || !subject.program) return null;
    
    return (
    <div
      key={subject.id}
      className="bg-white border-2 border-black p-5 hover:shadow-lg transition-all"
    >
      {/* Header with Delete Button */}
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase text-gray-500 mb-1">
            {isEnglish ? 'Subject Name (EN)' : 'Хичээлийн нэр (EN)'}
          </p>
          <InlineEdit
            value={subject.name_en}
            onChange={(value) => handleUpdateSubjectField(subject.id, 'name_en', value)}
            className="text-sm font-black"
          />
        </div>
        <button
          onClick={() => handleDeleteSubject(subject.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          title={isEnglish ? 'Delete subject' : 'Хичээлийг устгах'}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Mongolian Name */}
      <div className="mb-3">
        <p className="text-xs font-bold uppercase text-gray-500 mb-1">
          {isEnglish ? 'Subject Name (MN)' : 'Хичээлийн нэр (MN)'}
        </p>
        <InlineEdit
          value={subject.name_mn}
          onChange={(value) => handleUpdateSubjectField(subject.id, 'name_mn', value)}
          className="text-sm font-semibold"
        />
      </div>

      {/* Code and URL Grid */}
      <div className="mb-3 space-y-3">
        {subject.program === 'international' && (
          <div>
            <p className="text-xs font-bold uppercase text-gray-500 mb-1">
              {isEnglish ? 'Code' : 'Код'}
            </p>
            <InlineEdit
              value={subject.code}
              onChange={(value) => handleUpdateSubjectField(subject.id, 'code', value)}
              className="text-sm font-mono"
            />
          </div>
        )}
        {subject.program === 'international' && (
          <div>
            <p className="text-xs font-bold uppercase text-gray-500 mb-1">
              {isEnglish ? 'URL' : 'URL'}
            </p>
            <div className="overflow-x-auto">
              <InlineEdit
                value={subject.url || ''}
                onChange={(value) => handleUpdateSubjectField(subject.id, 'url', value || '')}
                className="text-sm break-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Level Dropdown - Only for International */}
      {subject.program === 'international' && (
        <div className="mb-3">
          <p className="text-xs font-bold uppercase text-gray-500 mb-1">
            {isEnglish ? 'Level' : 'Түвшин'}
          </p>
          <select
            value={subject.level}
            onChange={(e) => handleUpdateSubjectField(subject.id, 'level', e.target.value as any)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AS/A">AS/A</option>
            <option value="IGCSE">IGCSE</option>
          </select>
        </div>
      )}

      {/* Badge */}
      <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
        <LevelBadge level={subject.level} />
        <span className="text-xs text-gray-500 font-semibold">
          {subject.program === 'international' ? 'International' : 'National'}
        </span>
      </div>
    </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h1 className="text-4xl font-serif font-bold text-black mb-2">
          {isEnglish ? 'Academics - Subjects' : 'Боловсрол - Хичээлүүд'}
        </h1>
        <p className="text-gray-600">
          {isEnglish
            ? 'Manage subjects for international and national programmes. Edit names, codes, URLs, and levels.'
            : 'Олон улсын болон үндэсний хөтөлбөрийн хичээлүүдийг удирдах. Нэр, код, URL, түвшиний сүүдэр өөрчилнө үү.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={isEnglish ? 'Search subjects...' : 'Хичээлүүдийг хайх...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
        />
      </div>

      {/* International Programme */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-black">
            {isEnglish ? 'International Programme' : 'Олон улсын хөтөлбөр'}
          </h2>
          <button
            onClick={() => handleAddSubject('international')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            <Plus size={16} />
            {isEnglish ? 'Add Subject' : 'Хичээл нэмэх'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {internationalSubjects.length === 0 ? (
            <div className="col-span-full py-8 text-center bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">
                {isEnglish ? 'No international subjects yet' : 'Олон улсын хичээл байхгүй байна'}
              </p>
            </div>
          ) : (
            internationalSubjects.map(renderSubjectCard)
          )}
        </div>
      </div>

      {/* National Programme */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-black">
            {isEnglish ? 'National Programme' : 'Үндэсний хөтөлбөр'}
          </h2>
          <button
            onClick={() => handleAddSubject('national')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
          >
            <Plus size={16} />
            {isEnglish ? 'Add Subject' : 'Хичээл нэмэх'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nationalSubjects.length === 0 ? (
            <div className="col-span-full py-8 text-center bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">
                {isEnglish ? 'No national subjects yet' : 'Үндэсний хичээл байхгүй байна'}
              </p>
            </div>
          ) : (
            nationalSubjects.map(renderSubjectCard)
          )}
        </div>
      </div>
    </div>
  );
}
