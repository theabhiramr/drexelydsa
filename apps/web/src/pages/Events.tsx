import EventsCalendar from "../components/Calendar";
export default function Events() {
  return (
    <div className="bg-background px-16 md:px-24 lg:px-32 py-8 md:py-12">
      <h1 className="text-4xl font-black text-content mb-6 md:mb-8">Events</h1>
      <EventsCalendar />
    </div>
  );
}
