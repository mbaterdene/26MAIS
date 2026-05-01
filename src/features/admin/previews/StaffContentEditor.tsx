import { useMemo, useState, useEffect } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { InlineEdit } from '../../../components/shared/InlineEdit';
import { ImageUpload } from '../ImageUpload';

interface StaffMember {
  id: number;
  full_name: string;
  position: string;
  type: 'teacher' | 'general_staff';
  category: string;
  subject: string | null;
  photo: string;
}

interface StaffContentEditorProps {
  content: StaffMember[] | any;
  onUpdate: (path: string, value: any) => void;
}

export function StaffContentEditor({ content, onUpdate }: StaffContentEditorProps) {
  const { t } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(true);
  const [localStaffList, setLocalStaffList] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync with parent content
  useEffect(() => {
    if (Array.isArray(content)) {
      setLocalStaffList(content as StaffMember[]);
    }
  }, [content]);

  // Ensure content is always an array
  const staffList = useMemo(() => {
    return Array.isArray(localStaffList) ? localStaffList : [];
  }, [localStaffList]);

  // Filter staff based on search
  const filteredStaffList = useMemo(() => {
    if (!searchTerm.trim()) return staffList;
    
    const searchText = searchTerm.toLowerCase();
    return staffList.filter(staff =>
      staff.full_name.toLowerCase().includes(searchText) ||
      staff.position.toLowerCase().includes(searchText) ||
      staff.category.toLowerCase().includes(searchText) ||
      (staff.subject && staff.subject.toLowerCase().includes(searchText))
    );
  }, [staffList, searchTerm]);

  const handleAddStaff = () => {
    const newStaff: StaffMember = {
      id: Math.max(...staffList.map(s => s.id), 0) + 1,
      full_name: 'New Staff Member',
      position: 'Position',
      type: 'teacher',
      category: 'general',
      subject: 'Subject',
      photo: 'https://via.placeholder.com/150?text=Staff',
    };
    const newList = [newStaff, ...staffList];  // Prepend instead of append
    setLocalStaffList(newList);
    
    // Track change for the new item with all its fields
    onUpdate(`[0].full_name`, newStaff.full_name);
  };

  const handleDeleteStaff = (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const newList = staffList.filter(s => s.id !== id);
      setLocalStaffList(newList);
      
      // Track deletion by updating with the filtered list
      // Notify parent by updating the first item (to trigger change)
      if (newList.length > 0) {
        onUpdate('[0].full_name', newList[0].full_name);
      }
    }
  };

  const handleUpdateStaffField = (staffId: number, field: keyof StaffMember, value: any) => {
    const staffIndex = staffList.findIndex(s => s.id === staffId);
    if (staffIndex === -1) return;
    
    // Update local state immediately for UI responsiveness
    const newList = staffList.map(s =>
      s.id === staffId ? { ...s, [field]: value } : s
    );
    setLocalStaffList(newList);
    
    // Use array index notation for proper path tracking
    const path = `[${staffIndex}].${field}`;
    onUpdate(path, value);
  };

  const categoryOptions = ['national', 'international', 'management', 'general'];
  const categoryLabels: Record<string, { en: string; mn: string }> = {
    national: { en: 'National', mn: 'Үндэсний' },
    international: { en: 'International', mn: 'Олон улсын' },
    management: { en: 'Management', mn: 'Менежмент' },
    general: { en: 'General', mn: 'Ерөнхий' },
  };

  const typeOptions: Array<{ value: 'teacher' | 'general_staff'; label: { en: string; mn: string } }> = [
    { value: 'teacher', label: { en: 'Teacher', mn: 'Багш' } },
    { value: 'general_staff', label: { en: 'General Staff', mn: 'Өргөн цар хүрээтэй ажилтан' } },
  ];

  return (
    <div className="w-full space-y-6">
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

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h1 className="text-4xl font-serif font-bold text-black mb-2">
          {isEnglish ? 'Staff Management' : 'Багш нарын удирдлага'}
        </h1>
        <p className="text-gray-600">
          {isEnglish 
            ? 'Add, edit, and manage staff members. All changes will be saved to the system.'
            : 'Багш нарыг нэмэх, засах, удирдах. Бүх өөрчлөлтүүд системд хадгалагдана.'}
        </p>
      </div>

      {/* Search & Controls */}
      <div className="bg-white p-6 border-2 border-black rounded-lg space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={isEnglish ? 'Search staff...' : 'Багш нарыг хайх...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddStaff}
          className="w-full py-2 border-2 border-cardinal-red text-cardinal-red font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors rounded"
        >
          <Plus size={18} />
          {isEnglish ? 'Add New Staff Member' : 'Шинэ ажилтан нэмэх'}
        </button>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        {filteredStaffList.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">
              {searchTerm ? (isEnglish ? 'No matching staff members' : 'Ямар ч багш олдсонгүй') : (isEnglish ? 'No staff members yet' : 'Багш нар байхгүй байна')}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddStaff}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                {isEnglish ? 'Add First Staff Member' : 'Эхний багшийг нэмэх'}
              </button>
            )}
          </div>
        ) : (
          <>
            {filteredStaffList.map((staff) => (
              <div
                key={staff.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors shadow-sm"
              >
                {/* Staff Header with Delete Button */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      {isEnglish ? 'Full Name' : 'Бүтэн нэр'}
                    </p>
                    <div className="text-lg font-semibold mb-3">
                      <InlineEdit
                        value={staff.full_name}
                        onChange={(value) => handleUpdateStaffField(staff.id, 'full_name', value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteStaff(staff.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title={isEnglish ? 'Delete staff member' : 'Багшийг устгах'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Staff Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Position */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      {isEnglish ? 'Position' : 'Албан тушаал'}
                    </p>
                    <InlineEdit
                      value={staff.position}
                      onChange={(value) => handleUpdateStaffField(staff.id, 'position', value)}
                      className="w-full"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      {isEnglish ? 'Type' : 'Төрөл'}
                    </p>
                    <select
                      value={staff.type}
                      onChange={(e) => handleUpdateStaffField(staff.id, 'type', e.target.value as 'teacher' | 'general_staff')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {typeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {isEnglish ? opt.label.en : opt.label.mn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      {isEnglish ? 'Subject' : 'Хичээлийн сэдэв'}
                    </p>
                    <InlineEdit
                      value={staff.subject || ''}
                      onChange={(value) => handleUpdateStaffField(staff.id, 'subject', value || null)}
                      className="w-full"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      {isEnglish ? 'Category' : 'Ангилал'}
                    </p>
                    <select
                      value={staff.category}
                      onChange={(e) => handleUpdateStaffField(staff.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>
                          {isEnglish ? categoryLabels[cat].en : categoryLabels[cat].mn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Photo */}
                <div>
                  <ImageUpload
                    value={staff.photo}
                    onChange={(value) => handleUpdateStaffField(staff.id, 'photo', value)}
                    folder="staff"
                    label={isEnglish ? 'Staff Photo' : 'Багшийн зураг'}
                    isOptional={false}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
