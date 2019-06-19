import Activity, { Attendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // jan is 0
    const day = date.getDate();
    const dateString = year + '-' + month + '-' + day;

    return new Date(dateString + ' ' + timeString);
}

export const setActivityProps = (activity: Activity, user: IUser) => {
    activity.date = new Date(activity.date);
    if (user) {
        activity.isGoing = activity.attendees.some(
            a => a.username === user.username
        )
        activity.isHost = activity.attendees.some(
            a => a.username === user.username && a.isHost === true
        )
    }
    activity.attendees.forEach(attendee => {
        attendee.dateJoined = new Date(attendee.dateJoined);
    });
    activity.host = activity.attendees.find(a => a.isHost === true);
    return activity;
}

export const createAttendee = (user: IUser): Attendee => {
    return {
        dateJoined: new Date(),
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
}