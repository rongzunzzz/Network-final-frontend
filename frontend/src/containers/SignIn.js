import LogIn from "../components/LogIn";
import axios from '../api';

import { useMarket } from "./hooks/useMarket";

const SignIn = ({ myName }) => {

    const { setMyName, setSignedIn } = useMarket();

    const handleLogin = (name) => {
        if (name) {
            axios.get('/').then((data) => console.log(data))
            setSignedIn(true);
        }
    }

    return (
        <LogIn myName={myName} setMyName={setMyName} onLogin={handleLogin} />
    )
};

export default SignIn;
