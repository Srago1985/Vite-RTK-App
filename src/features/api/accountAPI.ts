import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, createToken } from "../../utils/constants";
import type { ChangePasswordPayload, UserProfile, UserRegister, UserUpdate } from "../../utils/types";

interface AuthResult {
    token: string;
    user: UserProfile;
}

interface UpdateUserRequest {
    login: string;
    user: UserUpdate;
}

interface ChangePasswordRequest {
    login: string;
    payload: ChangePasswordPayload;
}

export const accountAPI = createApi({
    reducerPath: "accountAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as { token?: string };

            if (state.token) {
                headers.set("Authorization", state.token);
            }

            return headers;
        },
    }),
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserProfile, void>({
            query: () => ({
                url: "/account/login",
                method: "POST",
            }),
            providesTags: ["Profile"],
        }),
        registerUser: builder.mutation<AuthResult, UserRegister>({
            query: (userData) => ({
                url: "/account/register",
                method: "POST",
                body: userData,
            }),
            transformResponse: (response: UserProfile, _meta, userData) => {
                return {
                    token: createToken(userData.login, userData.password),
                    user: response,
                };
            },
        }),
        logInUser: builder.mutation<AuthResult, string>({
            query: (token) => ({
                url: "/account/login",
                method: "POST",
                headers: {
                    Authorization: token,
                },
            }),
            transformResponse: (response: UserProfile, _meta, token) => {
                return {
                    token,
                    user: response,
                };
            },
            invalidatesTags: ["Profile"],
        }),
        updateUser: builder.mutation<UserProfile, UpdateUserRequest>({
            query: ({ login, user }) => ({
                url: `/account/user/${login}`,
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ["Profile"],
        }),
        changePassword: builder.mutation<string, ChangePasswordRequest>({
            query: ({ payload }) => ({
                url: "/account/password",
                method: "PATCH",
                headers: {
                    "X-Password": payload.oldPassword,
                },
                body: {
                    password: payload.newPassword,
                },
            }),
            transformResponse: (_response: unknown, _meta, request) => {
                return createToken(request.login, request.payload.newPassword);
            },
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useRegisterUserMutation,
    useLogInUserMutation,
    useUpdateUserMutation,
    useChangePasswordMutation,
} = accountAPI;