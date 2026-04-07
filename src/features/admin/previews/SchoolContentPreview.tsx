import { InlineEdit } from '../../../components/shared/InlineEdit';

interface SchoolContentPreviewProps {
  content: {
    vision_en?: string;
    vision_mn?: string;
    mission_en?: string;
    mission_mn?: string;
    general_info_en?: string;
    general_info_mn?: string;
    total_students?: number;
    total_teachers?: number;
  };
  onUpdate: (path: string, value: any) => void;
  isEnglish?: boolean;
}

export function SchoolContentPreview({ content, onUpdate, isEnglish = true }: SchoolContentPreviewProps) {
  return (
    <div className="space-y-12 bg-white p-8 rounded-lg border border-gray-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-gray-600 mb-4">About MAIS</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8">School Information</h1>

        {/* Vision */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Vision Statement</p>
          <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
            <InlineEdit
              value={isEnglish ? (content.vision_en || '') : (content.vision_mn || '')}
              onChange={(value) => onUpdate(isEnglish ? 'vision_en' : 'vision_mn', value)}
              multiline
              className="block w-full"
            />
          </p>
        </div>

        {/* Mission */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Mission Statement</p>
          <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
            <InlineEdit
              value={isEnglish ? (content.mission_en || '') : (content.mission_mn || '')}
              onChange={(value) => onUpdate(isEnglish ? 'mission_en' : 'mission_mn', value)}
              multiline
              className="block w-full"
            />
          </p>
        </div>
      </div>

      {/* General Info */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-black mb-6">About Mongol Aspiration School</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          <InlineEdit
            value={isEnglish ? (content.general_info_en || '') : (content.general_info_mn || '')}
            onChange={(value) => onUpdate(isEnglish ? 'general_info_en' : 'general_info_mn', value)}
            multiline
            className="block w-full"
          />
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="bg-blue-50 rounded-lg p-8 text-center border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-bold uppercase mb-2">Total Students</p>
          <p className="text-4xl font-bold text-blue-600">
            <InlineEdit
              value={content.total_students || 0}
              onChange={(value) => onUpdate('total_students', parseInt(value))}
              className="text-4xl"
            />
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-8 text-center border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-bold uppercase mb-2">Total Teachers</p>
          <p className="text-4xl font-bold text-purple-600">
            <InlineEdit
              value={content.total_teachers || 0}
              onChange={(value) => onUpdate('total_teachers', parseInt(value))}
              className="text-4xl"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
