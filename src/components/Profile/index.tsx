import ProfileData from './ProfileData'
import UpdateProfile from './UpdateProfile'
import { useAppDispatch } from '../../app/hooks'
import { clearToken } from '../../features/token/tokenSlice.tsx';
import { accountAPI } from '../../features/api/accountAPI';


const Profile = () => {
    const dispatch = useAppDispatch();
    const handleClickLogout = () => {
        dispatch(clearToken());
        dispatch(accountAPI.util.resetApiState());
    }
    return (
        <div>
            <h1>Profile</h1>
            <ProfileData/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateProfile />
        </div>
    )
}

export default Profile