export default interface JSONEvent {
  id: string;
  ical_uid: string;
  summary: string;
  location: string;
  rrule: string;
  rrule_text: string;
  start: string;
  end: string;
}
