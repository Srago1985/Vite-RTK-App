import { useAppSelector } from "../../app/hooks"
import { useGetCurrentUserQuery } from "../../features/api/accountAPI"

const ProfileData = () => {
    const token = useAppSelector((state) => state.token);
    const { data: user, isLoading, isError } = useGetCurrentUserQuery(undefined, {
        skip: !token,
    });

    if (isLoading) {
        return <div>Loading profile...</div>;
    }

    if (isError || !user) {
        return <div>Failed to load profile data.</div>;
    }

    return (
        <div>
            <h2>Profile Data</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Login: {user.login}</p>
            <ul>
                {user.roles.map((role: string, index: number) => (
                    <li key={index}>
                        <p>Role: {role}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileData