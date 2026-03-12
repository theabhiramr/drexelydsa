import { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEvents } from "../lib/actionNetwork";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function EventsCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    getEvents()
      .then((data) => {
        console.log("Events fetched:", data);
        setEvents(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectEvent = useCallback((event: any) => {
    setSelectedEvent(event);
  }, []);

  const handleView = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleNavigate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>Loading events...</div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          view={currentView}
          onView={handleView}
          date={currentDate}
          onNavigate={handleNavigate}
          popup
          timeslots={2}
          step={30}
          defaultView="month"
        />
      </div>

      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 8,
              maxWidth: 400,
              width: "90%",
              color: "black",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                marginBottom: 8,
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {selectedEvent.title}
            </h2>
            <p style={{ color: "#333", marginBottom: 8 }}>
              {selectedEvent.start
                ? format(selectedEvent.start, "EEEE, MMMM d, yyyy")
                : "TBD"}
            </p>
            <p style={{ color: "#333", marginBottom: 16 }}>
              {selectedEvent.start && format(selectedEvent.start, "h:mm a")}
              {selectedEvent.end && ` - ${format(selectedEvent.end, "h:mm a")}`}
            </p>
            {selectedEvent.resource?.location && (
              <p style={{ marginBottom: 8, color: "black" }}>
                <strong>Location:</strong> {selectedEvent.resource.location}
              </p>
            )}
            {selectedEvent.resource?.description && (
              <div 
                style={{ marginBottom: 16, color: "#333", fontSize: 14 }}
                dangerouslySetInnerHTML={{ __html: selectedEvent.resource.description }}
              />
            )}
            {selectedEvent.resource?.url && (
              <a
                href={selectedEvent.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#ec1f27",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                RSVP on Action Network
              </a>
            )}
            <button
              onClick={closeModal}
              style={{
                marginLeft: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
