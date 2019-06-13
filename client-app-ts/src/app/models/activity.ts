import { Guid } from "guid-typescript";

export default interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
  }

export interface ActivityToCreate extends Partial<Activity> {
  time?: Date;
}