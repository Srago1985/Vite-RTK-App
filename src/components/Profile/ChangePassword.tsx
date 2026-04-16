import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { changePassword } from '../../features/api/accountAPI';

interface ChangePasswordProps {
    close: () => void
}

const ChangePassword = ({ close }: ChangePasswordProps) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const handleClickSave = () => {
        if (newPassword === confirmPassword) {
        // Here you would typically handle the save logic, such as sending a request to your backend API.
            dispatch(changePassword(newPassword));
            close();
        } else {
            alert('New password and confirm password do not match.');
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