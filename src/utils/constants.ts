export const UPDATE_MODE_DEFAULT = 'UPDATE_MODE_DEFAULT'
export const UPDATE_MODE_UPDATE_PROFILE = 'UPDATE_MODE_UPDATE_PROFILE'
export const UPDATE_MODE_CHANGE_PASSWORD = 'UPDATE_MODE_CHANGE_PASSWORD'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const createToken = (userName: string, password: string) => `Basic ${btoa(`${userName}:${password}`)}`;