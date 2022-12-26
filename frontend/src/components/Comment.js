import styled from "styled-components";

const StyledMessage = styled.div`
    border: solid white 1px;
    border-radius: 2px;
    margin: 4px;
    margin-bottom: 6px;
`;

const StyledSender = styled.div`
    width: 30px;
    font-size: 18px; font-weight: bold;
    text-align: center;
    margin-right: 20px;
`;

const StyledContent = styled.div`
    margin-left: 2px;
`;

const Comments = ({ sender, content }) => {

    return <StyledMessage>
        <StyledSender>{`${sender} `}</StyledSender><StyledContent>{content}</StyledContent>
    </StyledMessage>
}

export default Comments;
