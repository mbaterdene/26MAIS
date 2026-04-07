import { InlineEdit } from '../../../components/shared/InlineEdit';

interface AlumniContentPreviewProps {
  content: {
    statistics?: {
      total_alumni?: number;
      total_countries?: number;
      total_universities?: number;
      total_scholarship?: number;
    };
  };
  onUpdate: (path: string, value: any) => void;
}

export function AlumniContentPreview({ content, onUpdate }: AlumniContentPreviewProps) {
  const stats = content.statistics || {};

  return (
    <div className="space-y-12 bg-white p-8 rounded-lg border border-gray-200">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-12 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-gray-600 mb-4">Graduates</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8">Our Alumni</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Celebrating the achievements of graduates worldwide
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="bg-blue-50 rounded-lg p-6 text-center border-l-4 border-blue-600">
          <p className="text-gray-600 text-xs font-bold uppercase mb-2">Total Alumni</p>
          <p className="text-3xl font-bold text-blue-600">
            <InlineEdit
              value={stats.total_alumni || 0}
              onChange={(value) => onUpdate('statistics.total_alumni', parseInt(value))}
              className="text-3xl"
            />
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 text-center border-l-4 border-purple-600">
          <p className="text-gray-600 text-xs font-bold uppercase mb-2">Countries</p>
          <p className="text-3xl font-bold text-purple-600">
            <InlineEdit
              value={stats.total_countries || 0}
              onChange={(value) => onUpdate('statistics.total_countries', parseInt(value))}
              className="text-3xl"
            />
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 text-center border-l-4 border-green-600">
          <p className="text-gray-600 text-xs font-bold uppercase mb-2">Universities</p>
          <p className="text-3xl font-bold text-green-600">
            <InlineEdit
              value={stats.total_universities || 0}
              onChange={(value) => onUpdate('statistics.total_universities', parseInt(value))}
              className="text-3xl"
            />
          </p>
        </div>

        <div className="bg-amber-50 rounded-lg p-6 text-center border-l-4 border-amber-600">
          <p className="text-gray-600 text-xs font-bold uppercase mb-2">Scholarships</p>
          <p className="text-2xl font-bold text-amber-600">
            {(stats.total_scholarship || 0).toLocaleString()}
          </p>
          <input
            type="number"
            value={stats.total_scholarship || 0}
            onChange={(e) => onUpdate('statistics.total_scholarship', parseInt(e.target.value))}
            className="w-full mt-2 px-2 py-1 text-sm border rounded"
          />
        </div>
      </div>
    </div>
  );
}
