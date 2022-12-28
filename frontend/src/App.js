import styled from 'styled-components'

import SignIn from './containers/SignIn';
import Market from './containers/Market';
import LoginPage from './components/Login_Google';
import { auth } from './config/firebase';
import { useState } from 'react';
import { useMarket } from './containers/hooks/useMarket';
import Title from './components/Title';
import Item from './components/Item';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 500px;
    margin: auto;
`;

const App = () => {
    
    const { myName, signedIn } = useMarket();
    const [myProfileOpen, setMyProfileOpen] = useState();

    return ( <>
        <Title signedIn={signedIn} setMyProfileOpen={setMyProfileOpen}/>
        <Wrapper>    
            { signedIn? <Market myProfileOpen={myProfileOpen} /> : <SignIn myName={myName} /> }
        </Wrapper>
        {/* <Wrapper> */}
            {/* { signedIn? <LoginPage/> : <SignIn myName={myName}/>} */}
        {/* </Wrapper> */}
    </>)
};

export default App;
