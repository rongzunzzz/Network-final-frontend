import styled from 'styled-components'

import SignIn from './containers/SignIn';
import Market from './containers/Market';

import { useMarket } from './containers/hooks/useMarket';
import Title from './components/Title';

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

    return ( <>
        <Title />
        <Wrapper>    
            { signedIn? <Market /> : <SignIn myName={myName} /> }
        </Wrapper>    
    </>)
};

export default App;
