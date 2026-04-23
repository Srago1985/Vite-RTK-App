import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useRegisterUserMutation } from "../../features/api/accountAPI";
import { setToken } from "../../features/token/tokenSlice";

export const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerUser] = useRegisterUserMutation();
    const dispatch = useAppDispatch();
    const handleClickSignUp = async () => {
        try {
            const result = await registerUser({ login, password, firstName, lastName }).unwrap();
            dispatch(setToken(result.token));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to sign up";
            alert(message);
        }
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