export interface IProfile {
    displayName: string,
    bio: string,
    username: string,
    image: string,
    photos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean
}