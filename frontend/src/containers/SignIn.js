import styled from "styled-components";

import LogIn from "../components/LogIn";
import axios from '../api';

import { useMarket } from "./hooks/useMarket";

const Logo = styled.img`
    height: 50%;
    width: 60%;
    border-radius: 3%;
    margin-top: 200px;
`;

const SignIn = ({ myName }) => {

    const { setMyName, setSignedIn } = useMarket();

    const handleLogin = (name) => {
        if (name) {
            axios.get('/').then((data) => console.log(data))
            setSignedIn(true);
        }
    }

    return (
        <>
            <Logo src={require('../img/logo.jpg')}  />
            <LogIn myName={myName} setMyName={setMyName} onLogin={handleLogin} />
        </>
    )
};

export default SignIn;
