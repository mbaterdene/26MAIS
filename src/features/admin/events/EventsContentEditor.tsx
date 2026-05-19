import { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { InlineEdit } from '../../components/shared/InlineEdit';

interface Event {
  id: number;
  title_en: string;
  title_mn: string;
  description_en: string;
  description_mn: string;
  event_type: string;
  event_type_display: string;
  event_date: string;
  event_end?: string;
  location: string;
  image: string;
}

interface EventsContentEditorProps {
  content: Event[];
  onUpdate: (path: string, value: any) => void;
}

const EVENT_TYPES = [
  { value: 'academic', display: 'Academic' },
  { value: 'sport', display: 'Sport' },
  { value: 'celebration', display: 'Celebration' },
  { value: 'other', display: 'Counseling' },
];

export function EventsContentEditor({ content, onUpdate }: EventsContentEditorProps) {
  const { t } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(true);
  const [localEventList, setLocalEventList] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (Array.isArray(content)) {
      setLocalEventList(content);
    }
  }, [content]);

  const eventList = useMemo(() => {
    return Array.isArray(localEventList) ? localEventList : [];
  }, [localEventList]);

  // Filter events based on search term
  const filteredEvents = useMemo(() => {
    return eventList.filter(event => {
      const searchText = searchTerm.toLowerCase();
      const titleToSearch = isEnglish ? event.title_en : event.title_mn;
      const descToSearch = isEnglish ? event.description_en : event.description_mn;
      return (
        titleToSearch.toLowerCase().includes(searchText) ||
        descToSearch.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText)
      );
    });
  }, [eventList, searchTerm, isEnglish]);

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Math.max(...eventList.map(e => e.id), 0) + 1,
      title_en: 'New Event',
      title_mn: 'Шинэ үйл явдал',
      description_en: 'Event description',
      description_mn: 'Үйл явдлын тайлбар',
      event_type: 'other',
      event_type_display: 'Counseling',
      event_date: new Date().toISOString(),
      location: 'Location',
      image: 'https://via.placeholder.com/800x600?text=Event',
    };
    const newList = [newEvent, ...eventList];
    setLocalEventList(newList);
    onUpdate('', newList);
  };

  const handleRemoveEvent = (index: number) => {
    const newList = filteredEvents.filter((_, i) => i !== index);
    setLocalEventList(newList);
    onUpdate('', newList);
  };

  const handleUpdateEvent = (event: Event, field: string, value: any) => {
    const newList = localEventList.map(e => 
      e.id === event.id 
        ? { ...e, [field]: value }
        : e
    );
    setLocalEventList(newList);
    onUpdate(`[${eventList.findIndex(e => e.id === event.id)}].${field}`, value);
  };

  return (
    <div className="w-full">
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

      {/* Search & Controls */}
      <div className="bg-white p-8 border-b-2 border-black space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('Search events...', 'Үйл явдлал хайх...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddEvent}
          className="w-full py-2 border-2 border-cardinal-red text-cardinal-red font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors rounded"
        >
          <Plus size={18} />
          {t('Add New Event', 'Шинэ үйл явдал нэмэх')}
        </button>
      </div>

      {/* Events List */}
      <div className="bg-white p-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t('No events found', 'Үйл явдал олдсонгүй')}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Events */}
            {(() => {
              const upcomingEvents = filteredEvents.filter(e => new Date(e.event_date) >= new Date());
              return upcomingEvents.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4 pb-2 border-b-2 border-cardinal-red">
                    {t('Upcoming Events', 'Ирээдүйн үйл явдалууд')}
                  </h3>
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border-2 border-black p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-black">
                              {isEnglish ? event.title_en : event.title_mn}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(event.event_date).toLocaleString(isEnglish ? 'en-US' : 'mn-MN')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveEvent(eventList.findIndex(e => e.id === event.id))}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {/* Title */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {isEnglish ? 'Title (English)' : 'Гарчиг (Монгол)'}
                            </p>
                            <InlineEdit
                              value={isEnglish ? event.title_en : event.title_mn}
                              onChange={(value) => handleUpdateEvent(event, isEnglish ? 'title_en' : 'title_mn', value)}
                              className="block w-full"
                            />
                          </div>

                          {/* Description */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {isEnglish ? 'Description (English)' : 'Тайлбар (Монгол)'}
                            </p>
                            <InlineEdit
                              value={isEnglish ? event.description_en : event.description_mn}
                              onChange={(value) => handleUpdateEvent(event, isEnglish ? 'description_en' : 'description_mn', value)}
                              multiline
                              className="block w-full"
                            />
                          </div>

                          {/* Event Type */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Event Type', 'Үйл явдлын төрөл')}
                            </p>
                            <select
                              value={event.event_type}
                              onChange={(e) => {
                                const selectedType = EVENT_TYPES.find(t => t.value === e.target.value);
                                handleUpdateEvent(event, 'event_type', e.target.value);
                                if (selectedType) {
                                  handleUpdateEvent(event, 'event_type_display', selectedType.display);
                                }
                              }}
                              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                            >
                              {EVENT_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                  {type.display}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Location */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Location', 'Байршил')}
                            </p>
                            <InlineEdit
                              value={event.location}
                              onChange={(value) => handleUpdateEvent(event, 'location', value)}
                              className="block w-full"
                            />
                          </div>

                          {/* Start Date */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Start Date & Time', 'Эхлэх огноо & цаг')}
                            </p>
                            <input
                              type="datetime-local"
                              value={event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : ''}
                              onChange={(e) => {
                                handleUpdateEvent(event, 'event_date', new Date(e.target.value).toISOString());
                              }}
                              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                            />
                          </div>

                          {/* End Date */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('End Date & Time', 'Дуусах огноо & цаг')}
                            </p>
                            <input
                              type="datetime-local"
                              value={event.event_end ? new Date(event.event_end).toISOString().slice(0, 16) : ''}
                              onChange={(e) => {
                                handleUpdateEvent(event, 'event_end', new Date(e.target.value).toISOString());
                              }}
                              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                            />
                          </div>

                          {/* Image URL */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Image URL', 'Зургийн URL')}
                            </p>
                            <InlineEdit
                              value={event.image}
                              onChange={(value) => handleUpdateEvent(event, 'image', value)}
                              multiline
                              className="block w-full"
                            />
                            {event.image && (
                              <img src={event.image} alt={event.title_en} className="mt-3 max-w-xs rounded border border-gray-300" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Past Events */}
            {(() => {
              const pastEvents = filteredEvents.filter(e => new Date(e.event_date) < new Date());
              return pastEvents.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-600 mb-4 pb-2 border-b-2 border-gray-300">
                    {t('Past Events', 'Өнгөрсөн үйл явдалууд')}
                  </h3>
                  <div className="space-y-6 opacity-75">
                    {pastEvents.map((event) => (
                      <div key={event.id} className="border-2 border-gray-300 p-6 bg-gray-50">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-600">
                              {isEnglish ? event.title_en : event.title_mn}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(event.event_date).toLocaleString(isEnglish ? 'en-US' : 'mn-MN')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveEvent(eventList.findIndex(e => e.id === event.id))}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {/* Title */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {isEnglish ? 'Title (English)' : 'Гарчиг (Монгол)'}
                            </p>
                            <InlineEdit
                              value={isEnglish ? event.title_en : event.title_mn}
                              onChange={(value) => handleUpdateEvent(event, isEnglish ? 'title_en' : 'title_mn', value)}
                              className="block w-full"
                            />
                          </div>

                          {/* Description */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {isEnglish ? 'Description (English)' : 'Тайлбар (Монгол)'}
                            </p>
                            <InlineEdit
                              value={isEnglish ? event.description_en : event.description_mn}
                              onChange={(value) => handleUpdateEvent(event, isEnglish ? 'description_en' : 'description_mn', value)}
                              multiline
                              className="block w-full"
                            />
                          </div>

                          {/* Event Type */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Event Type', 'Үйл явдлын төрөл')}
                            </p>
                            <select
                              value={event.event_type}
                              onChange={(e) => {
                                const selectedType = EVENT_TYPES.find(t => t.value === e.target.value);
                                handleUpdateEvent(event, 'event_type', e.target.value);
                                if (selectedType) {
                                  handleUpdateEvent(event, 'event_type_display', selectedType.display);
                                }
                              }}
                              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                            >
                              {EVENT_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                  {type.display}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Location */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Location', 'Байршил')}
                            </p>
                            <InlineEdit
                              value={event.location}
                              onChange={(value) => handleUpdateEvent(event, 'location', value)}
                              className="block w-full"
                            />
                          </div>

                          {/* Start Date */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Start Date & Time', 'Эхлэх огноо & цаг')}
                            </p>
                            <input
                              type="datetime-local"
                              value={event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : ''}
                              onChange={(e) => {
                                handleUpdateEvent(event, 'event_date', new Date(e.target.value).toISOString());
                              }}
                              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                            />
                          </div>

                          {/* End Date */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('End Date & Time', 'Дуусах огноо & цаг')}
                            </p>
                            <input
                              type="datetime-local"
                              value={event.event_end ? new Date(event.event_end).toISOString().slice(0, 16) : ''}
                              onChange={(e) => {
                                handleUpdateEvent(event, 'event_end', new Date(e.target.value).toISOString());
                              }}
                              className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
                            />
                          </div>

                          {/* Image URL */}
                          <div>
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2">
                              {t('Image URL', 'Зургийн URL')}
                            </p>
                            <InlineEdit
                              value={event.image}
                              onChange={(value) => handleUpdateEvent(event, 'image', value)}
                              multiline
                              className="block w-full"
                            />
                            {event.image && (
                              <img src={event.image} alt={event.title_en} className="mt-3 max-w-xs rounded border border-gray-300" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
