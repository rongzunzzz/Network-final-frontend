import styled from 'styled-components'

const Wrapper = styled.div`
    height: 10%;
    width: 100%;
    background-color: #ebf0f2;

    margin-bottom: 50px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    h1 {
        margin: 0;
        font-size: 3em;
    }
`;

const TitleTextBlock = styled.div`
    margin-left: 3%;
`;

const Title = () => ( 
    <Wrapper>
        <TitleTextBlock>
            <h2 style={{color: '#7f8a8f'}}>NTU E-AUCTION</h2>
        </TitleTextBlock>
    </Wrapper> 
);

export default Title;