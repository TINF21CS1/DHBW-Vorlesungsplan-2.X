export default interface Event {
    start: Date;
    end: Date;
    title: string;
    location: string;
    speaker: string;
    ignored?: boolean;
}