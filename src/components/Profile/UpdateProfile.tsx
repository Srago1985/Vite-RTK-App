import { useState } from "react"
import EditProfile from "./EditProfile"
import ChangePassword from "./ChangePassword"
import { UPDATE_MODE_DEFAULT, UPDATE_MODE_UPDATE_PROFILE, UPDATE_MODE_CHANGE_PASSWORD } from "../../utils/constants"


const UpdateProfile = () => {
    const [updateMode, setUpdateMode] = useState(UPDATE_MODE_DEFAULT)
    const close = () => {setUpdateMode(UPDATE_MODE_DEFAULT)}
    
    switch (updateMode) {
        case UPDATE_MODE_UPDATE_PROFILE:
            return (
                <EditProfile close={close}/>
            )
        case UPDATE_MODE_CHANGE_PASSWORD:
            return (
                <ChangePassword close={close}/>
            )
        default:
            return (
                <div>
                    <button onClick={() => setUpdateMode(UPDATE_MODE_UPDATE_PROFILE)}>Update Profile</button>
                    <button onClick={() => setUpdateMode(UPDATE_MODE_CHANGE_PASSWORD)}>Change Password</button>
                </div>
            )
    }
}
export default UpdateProfile