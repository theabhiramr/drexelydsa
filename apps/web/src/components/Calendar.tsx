import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, EventInteractionArgs } from "react-big-calendar";
import type { Event as CalendarEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/addons/popup/styles.css";
import { getEvents } from "../lib/actionNetwork";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CustomEvent extends CalendarEvent {
  resource?: {
    url: string;
    location: string;
    description?: string;
  };
}

export default function EventsCalendar() {
  const [events, setEvents] = useState<CustomEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "#ec1f27",
      borderRadius: "4px",
      opacity: 0.9,
      color: "white",
      border: "none",
      display: "block",
      cursor: "pointer",
    },
  });

  const handleSelectEvent = (event: CustomEvent) => {
    setSelectedEvent(event);
  };

  const EventComponent = ({ event }: { event: CustomEvent }) => (
    <span className="text-xs">
      <strong>{event.title}</strong>
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-content">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* Calendar */}
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent,
          }}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          popup
          selectable
          onSelectEvent={handleSelectEvent}
          className="rbc-calendar"
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-content mb-2">
              {selectedEvent.title}
            </h2>
            <div className="text-gray-600 mb-4">
              <p className="font-semibold">
                {format(selectedEvent.start, "EEEE, MMMM d, yyyy")}
              </p>
              <p>
                {format(selectedEvent.start, "h:mm a")} -{" "}
                {format(selectedEvent.end, "h:mm a")}
              </p>
            </div>
            {selectedEvent.resource?.location && (
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Location:</p>
                <p className="text-gray-600">{selectedEvent.resource.location}</p>
              </div>
            )}
            {selectedEvent.resource?.description && (
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Description:</p>
                <p
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: selectedEvent.resource.description,
                  }}
                />
              </div>
            )}
            {selectedEvent.resource?.url && (
              <a
                href={selectedEvent.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition-colors"
              >
                RSVP on Action Network
              </a>
            )}
            <button
              onClick={() => setSelectedEvent(null)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
