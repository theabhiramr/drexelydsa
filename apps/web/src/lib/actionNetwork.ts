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

export async function getEvents() {
  return fetchFromWorker("/events");
}

export async function getEvent(id: string) {
  return fetchFromWorker(`/events/${id}`);
}

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
