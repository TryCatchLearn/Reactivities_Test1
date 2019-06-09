import { Guid } from "guid-typescript";

export default interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
  }