export interface UserBase {
    firstName: string;
    lastName: string;
    login: string;
}

export interface UserRegister extends UserBase {
    password: string;
}

export type UserUpdate = Omit<UserBase, 'login'>;

export interface UserProfile extends UserBase {
    roles: string[];
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

