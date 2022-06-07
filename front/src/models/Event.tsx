export default interface Event {
  id: string;
  ical_uid: string;
  summary: string;
  location: string;
  start: Date;
  end: Date;
}
