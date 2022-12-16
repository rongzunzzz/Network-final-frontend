import styled from "styled-components";

import Item from "./Item";

const PostWrapper = styled.div`
    height: 200px;
    width: 700px;
    border: solid black 1px;

    margin: 5px 0 5px 50px;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const TitleDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Post = ({ title, content, img }) => {
    return (
        <PostWrapper>
            <TitleDescWrapper>
                <h3>{`Title: ${title}`}</h3>
                <p>{`Content: ${content}`}</p>
            </TitleDescWrapper>
            <Item img={img} />
        </PostWrapper>
    )
};

export default Post;
