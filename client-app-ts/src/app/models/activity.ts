import { Guid } from "guid-typescript";

export default interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    host?: Attendee;
    attendees: Attendee[];
    comments: IComment[];
  }

export interface ActivityToCreate extends Partial<Activity> {
  time?: Date;
}

export interface Attendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  dateJoined: Date
}

export interface IComment {
  id: number;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
}