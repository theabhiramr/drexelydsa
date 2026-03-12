import EventsCalendar from "../components/Calendar";
export default function Events() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-black text-content mb-8">Events</h1>
      <EventsCalendar />
    </div>
  );
}
