export default interface Event {
  id: string;
  ical_uid: string;
  summary: string;
  location: string;
  rrule: string;
  rrule_text: string;
  start: Date;
  end: Date;
}
