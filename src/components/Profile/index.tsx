import ProfileData from './ProfileData'
import UpdateProfile from './UpdateProfile'
import { useAppDispatch } from '../../app/hooks'
import { clearToken } from '../../features/token/tokenSlice';
import { clearUser } from '../../features/user/userSlice';


const Profile = () => {
    const dispatch = useAppDispatch();
    const handleClickLogout = () => {
        dispatch(clearToken());
        dispatch(clearUser());
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