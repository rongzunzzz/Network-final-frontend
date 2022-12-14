import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    h1 {
        margin: 0;
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 3em;
    }
`;
const Title = () => ( 
    <Wrapper><h1>OUR COOL TITLE</h1></Wrapper> 
);

export default Title;