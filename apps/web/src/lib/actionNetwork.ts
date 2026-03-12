import type { Event } from "react-big-calendar";

interface ANEvent {
  identifiers: string[];
  title: string;
  start_date: string;
  end_date?: string;
  location?: {
    venue?: string;
    address_lines?: string[];
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  };
  browser_url: string;
  description?: string;
}

interface ANResponse {
  total_pages: number;
  per_page: number;
  _embedded?: {
    "osdi:events": ANEvent[];
  };
}

const WORKER_URL = import.meta.env.VITE_WORKER_URL;

export async function fetchFromWorker(endpoint: string, options?: RequestInit) {
  const url = `${WORKER_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      `Worker request failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

export async function getEvents(): Promise<Event[]> {
  const response = await fetchFromWorker("/events");

  const data: ANResponse = response;
  const events = data._embedded?.["osdi:events"] || [];

  return events.map((event) => ({
    id: event.identifiers?.[0] || "",
    title: event.title,
    start: new Date(event.start_date),
    end: event.end_date ? new Date(event.end_date) : new Date(event.start_date),
    allDay: false,
    resource: {
      url: event.browser_url,
      location: event.location?.venue || "TBD",
      description: event.description,
    },
  }));
}

// Future-proofing
export async function getAttendees(eventId: string) {
  return fetchFromWorker(`/events/${eventId}/attendees`);
}

export async function getAttendee(attendeeId: string) {
  return fetchFromWorker(`/attendees/${attendeeId}`);
}

export async function getActions() {
  return fetchFromWorker("/actions");
}

export async function getAction(id: string) {
  return fetchFromWorker(`/actions/${id}`);
}

export async function getSignups(actionId: string) {
  return fetchFromWorker(`/actions/${actionId}/signups`);
}

export async function getSignup(signupId: string) {
  return fetchFromWorker(`/signups/${signupId}`);
}
