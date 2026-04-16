import { useAppSelector } from "../../app/hooks"

const ProfileData = () => {
    const user = useAppSelector(state => state.user);
    return (
        <div>
            <h2>Profile Data</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map((role, index) => (
                    <li key={index}>
                        <p>Role: {role}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileData