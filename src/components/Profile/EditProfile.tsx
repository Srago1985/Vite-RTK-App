import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { updateUser } from '../../features/api/accountAPI';

interface EditProfileProps {
    close: () => void
}

const EditProfile = ({ close }: EditProfileProps) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();
    const handleClickSave = () => {
        // Here you would typically handle the save logic, such as sending a request to your backend API.
        dispatch(updateUser({ firstName, lastName }));
        close();
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