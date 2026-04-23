import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import tokenReducer, { initialState as initialTokenState } from '../features/token/tokenSlice';
import { accountAPI } from '../features/api/accountAPI';

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
        token: tokenReducer,
        [accountAPI.reducerPath]: accountAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountAPI.middleware),
    preloadedState: loadPreloadedState(),
});

setupListeners(store.dispatch);

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