export interface IUserForLogin {
    email: string,
    password: string
}

export interface IUserForRegister extends IUserForLogin {
    displayName: string,
    username: string
}

export interface IUser {
    displayName: string,
    token: string,
    username: string,
    image: string | null
}