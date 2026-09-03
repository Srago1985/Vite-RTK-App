import { useState } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useChangePasswordMutation, useGetCurrentUserQuery } from '../../features/api/accountAPI.ts';
import { setToken } from '../../features/token/tokenSlice.tsx';

interface ChangePasswordProps {
    close: () => void
}

const ChangePassword = ({ close }: ChangePasswordProps) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = useAppSelector((state) => state.token);
    const { data: user } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    });
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();

    const getChangePasswordErrorMessage = (error: unknown) => {
        if (!error || typeof error !== 'object' || !('status' in error)) {
            return 'Failed to change password';
        }

        const queryError = error as FetchBaseQueryError;

        if (queryError.status === 401) {
            return 'Current password is incorrect.';
        }

        if (queryError.status === 400) {
            return 'Invalid new password.';
        }

        if (queryError.status === 'FETCH_ERROR') {
            return 'Network or CORS error while changing password.';
        }

        return 'Failed to change password';
    };

    const handleClickSave = async () => {
        if (!user) {
            return;
        }

        if (!currentPassword.trim()) {
            alert('Please enter your current password.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }

        try {
            const token = await changePassword({
                login: user.login,
                payload: { oldPassword: currentPassword, newPassword },
            }).unwrap();
            dispatch(setToken(token));
            close();
        } catch (error) {
            alert(getChangePasswordErrorMessage(error));
        }
    }
 
    const handleClickClear = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }
  return (
    <div>ChangePassword
        <label>
            Current password:
            <input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </label>
        <label>
            New password:
            <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label>
            Confirm new password:
            <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <button onClick={handleClickSave}>Save and close</button>
        <button onClick={close}>Close without saving</button>
        <button onClick={handleClickClear}>Clear</button>

    </div>
  )
}


export default ChangePassword