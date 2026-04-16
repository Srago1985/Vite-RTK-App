import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../features/api/accountAPI";

export const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useAppDispatch();
    const handleClickSignUp = () => {
        // Here you would typically handle the sign-up logic, such as sending a request to your backend API.
        dispatch(registerUser({ login, password, firstName, lastName }));
    }
  return (
    <div>
        <h2>Sign Up</h2>
        <label>
            Username:
            <input type="text" placeholder="Username" value={login} onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
            First name:
            <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
            Last name:
            <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>

        <button onClick={handleClickSignUp}>Sign Up</button>
        <button onClick={() => { setLogin(""); setPassword(""); setFirstName(''); setLastName(''); }}>Clear</button>
    </div>
  )
}