import styled from 'styled-components'
import './App.css';

import SignIn from './containers/SignIn';
import Market from './containers/Market';

import { useMarket } from './containers/hooks/useMarket';
import Title from './components/Title';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

const signIn = true;
// const signIn = false;

const App = () => {
    const { signedIn } = useMarket();

    return ( <>
        <Title />
        {/* <Wrapper></Wrapper>     */}
        { signIn? <Market /> : <SignIn /> }
    </>)
};

export default App;
