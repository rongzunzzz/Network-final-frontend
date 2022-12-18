import LogIn from "../components/LogIn";

import { useMarket } from "./hooks/useMarket";

const SignIn = ({ myName }) => {

    const { setMyName, setSignedIn } = useMarket();

    const handleLogin = (name) => {
        if (name) {
            setSignedIn(true);
        }
    }

    return (
        <LogIn myName={myName} setMyName={setMyName} onLogin={handleLogin} />
    )
};

export default SignIn;
