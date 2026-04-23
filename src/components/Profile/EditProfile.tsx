import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../../features/api/accountAPI';

interface EditProfileProps {
    close: () => void
}

const EditProfile = ({ close }: EditProfileProps) => {
    const token = useAppSelector((state) => state.token);
    const { data: user } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        if (!user) {
            return;
        }

        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, [user]);

    const handleClickSave = async () => {
        if (!user) {
            return;
        }

        try {
            const updatedUser = await updateUser({
                login: user.login,
                user: { firstName, lastName },
            }).unwrap();
            setFirstName(updatedUser.firstName);
            setLastName(updatedUser.lastName);
            close();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update profile';
            alert(message);
        }
    }
    
    const handleClickClear = () => {
        setFirstName('');
        setLastName('');
    }
  return (
    <div>
        <label>
            First name:
            <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
            Last name:
            <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <button onClick={() => {handleClickSave()}}>Save and Close</button>
        <button onClick={close}>Close without Saving</button>
        <button onClick={() => {handleClickClear()}}>Clear</button>
    </div>
  )
}

export default EditProfile