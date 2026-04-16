import { useState } from "react";
import { logInUser } from "../../features/api/accountAPI";
import { useAppDispatch } from "../../app/hooks";
import { createToken } from "../../utils/constants";

export const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    


    const handleClickSignIn = () => {
        // Here you would typically handle the sign-in logic, such as sending a request to your backend API.
        dispatch(logInUser(createToken(login, password)));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleClickSignIn();
        }
    };

  return (
    <div>
        <h2>Sign In</h2>
        <label>Username: 
            <input type="text" placeholder="Username" value={login} onChange={(e) => setLogin(e.target.value)} onKeyDown={handleKeyDown} />
        </label>
        <label>Password: 
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
        </label>

        <button onClick ={handleClickSignIn}>Sign In</button>
        <button onClick={() => { setLogin(""); setPassword(""); }}>Clear</button>
    </div>
    )
}