import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";  

const Guest = () => {
    const [isSignIn, setIsSignIn] = useState(false);
    return (
        <div>
            {isSignIn ? <SignIn /> : <SignUp />}
            <button onClick={() => setIsSignIn(!isSignIn)}>
                {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
            </button>
        </div>
    );
}

export default Guest;