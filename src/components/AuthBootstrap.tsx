import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logInUser } from '../features/api/accountAPI'
import { clearToken } from '../features/token/tokenSlice'
import { clearUser } from '../features/user/userSlice'

const AuthBootstrap = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.token)
    const userLogin = useAppSelector((state) => state.user.login)

    useEffect(() => {
        if (!token || userLogin) {
            return
        }

        dispatch(logInUser(token)).unwrap().catch(() => {
            dispatch(clearToken())
            dispatch(clearUser())
        })
    }, [dispatch, token, userLogin])

    return null
}

export default AuthBootstrap