import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { BASE_URL, createToken } from "../../utils/constants";
import type { UserProfile, UserRegister, UserUpdate }  from "../../utils/types";

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: UserRegister) => {
        const response = await fetch(`${BASE_URL}/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (response.status === 409) {
            throw new Error(`User with login ${userData.login} already exists`);
        }
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        const user = await response.json();
        const token = createToken(userData.login, userData.password);
        return { token, user };
    }
);

export const logInUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${BASE_URL}/account/login`, {
            method: 'POST',
            headers: {
                'Authorization': token,
            },
        });
        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }
        if (!response.ok) {
            throw new Error('Failed to login user');
        }
        const user = await response.json();
        return { token, user };
    }
);

export const updateUser = createAsyncThunk<UserProfile, UserUpdate, { state: RootState }>(
    'user/update',
    async(user: UserUpdate, { getState }) => {
        const response = await fetch(`${BASE_URL}/account/user/${getState().user.login}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().token
            },
            body: JSON.stringify(user),
        });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return await response.json();
        
    }
);

export const changePassword = createAsyncThunk<string, string, { state: RootState }>(
    'user/password',
    async(newPassword: string, { getState }) => {
        const response = await fetch(`${BASE_URL}/account/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().token
            },
            body: JSON.stringify({ password: newPassword }),
        });
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        if (!response.ok) {
            throw new Error('Failed to change password');
        }
        const login = getState().user.login;
        return createToken(login, newPassword);
    }
);