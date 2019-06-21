export interface IProfile {
    displayName: string,
    bio: string,
    username: string,
    image: string,
    following: boolean,
    followersCount: number,
    followingCount: number,
    photos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean
}