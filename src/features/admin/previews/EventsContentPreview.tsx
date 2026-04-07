import { InlineEdit } from '../../../components/shared/InlineEdit';

interface EventsContentPreviewProps {
  content: any[];
  onUpdate: (path: string, value: any) => void;
  isEnglish?: boolean;
}

export function EventsContentPreview({ content, onUpdate, isEnglish = true }: EventsContentPreviewProps) {
  return (
    <div className="space-y-8 bg-white p-8 rounded-lg border border-gray-200">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-12 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-gray-600 mb-4">School Calendar</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">Events</h1>
        <p className="text-xl text-gray-700">Important dates and school activities</p>
      </div>

      {/* Events List */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {content && Array.isArray(content) && content.length > 0 ? (
          content.map((event, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    <InlineEdit
                      value={isEnglish ? event.title_en : event.title_mn}
                      onChange={(value) => onUpdate(`[${index}].${isEnglish ? 'title_en' : 'title_mn'}`, value)}
                      className="block"
                    />
                  </h3>
                  <p className="text-sm text-gray-600">{event.event_date && new Date(event.event_date).toLocaleDateString()}</p>
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                  {event.event_type_display}
                </span>
              </div>
              <p className="text-gray-700 mb-2">
                <InlineEdit
                  value={isEnglish ? event.description_en : event.description_mn}
                  onChange={(value) => onUpdate(`[${index}].${isEnglish ? 'description_en' : 'description_mn'}`, value)}
                  multiline
                  className="block w-full"
                />
              </p>
              <p className="text-sm text-gray-600">📍 {event.location}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No events scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
