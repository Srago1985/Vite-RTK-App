import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { accountAPI, useGetCurrentUserQuery } from '../features/api/accountAPI'
import { clearToken } from '../features/token/tokenSlice'

const AuthBootstrap = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.token)
    const { isError } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    })

    useEffect(() => {
        if (!token || !isError) {
            return
        }

        dispatch(clearToken())
        dispatch(accountAPI.util.resetApiState())
    }, [dispatch, isError, token])

    return null
}

export default AuthBootstrap