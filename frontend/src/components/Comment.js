import styled from "styled-components";

const StyledMessage = styled.div`
    margin: 2px;
`;

const StyledSender = styled.p`
    font-size: 18px; font-weight: bold;
    margin-right: 20px;
    display: inline;
`;

const StyledContent = styled.p`
    display: inline;
`;

const Comments = ({ sender, content }) => {

    return <StyledMessage>
        <StyledSender>{`${sender} `}</StyledSender><StyledContent>{content}</StyledContent>
    </StyledMessage>
}

export default Comments;
