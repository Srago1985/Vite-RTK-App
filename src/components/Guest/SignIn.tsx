import { useState } from "react";
import { useLogInUserMutation } from "../../features/api/accountAPI";
import { useAppDispatch } from "../../app/hooks";
import { createToken } from "../../utils/constants";
import { setToken } from "../../features/token/tokenSlice";

export const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [logInUser] = useLogInUserMutation();
    const dispatch = useAppDispatch();
    


    const handleClickSignIn = async () => {
        try {
            const result = await logInUser(createToken(login, password)).unwrap();
            dispatch(setToken(result.token));
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to sign in";
            alert(message);
        }
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