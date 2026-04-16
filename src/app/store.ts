import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import tokenReducer, { initialState as initialTokenState } from '../features/token/tokenSlice';

const loadPreloadedState = () => {
    try {
        const token = localStorage.getItem('token') ?? initialTokenState;

        return {
            token,
        };
    } catch {
        return undefined;
    }
};

export  const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
    },
    preloadedState: loadPreloadedState(),
});

store.subscribe(() => {
    try {
        const { token } = store.getState();

        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }

        localStorage.removeItem('user');
    } catch {
        // Ignore storage write errors.
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;