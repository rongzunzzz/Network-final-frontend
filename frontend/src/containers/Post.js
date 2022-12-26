import styled from "styled-components";
import { UserOutlined, DollarCircleTwoTone } from "@ant-design/icons";
import { Button, Space, Input } from "antd";

import Item from "../components/Item";
import Comment from "../components/Comment";
import PostFunctionModal from "./PostFunctionModal";
import axios from "../api";

import { useEffect, useState } from "react";
import { useMarket } from "./hooks/useMarket";

const COMMENT_SECTION_HEIGHT = 45 // including the comments part and the input box
const PostWrapper = styled.div`
    height: 600px;
    width: 95%;
    background-color: #ebf0f2;
    border: solid white 1px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 4px #ccc;

    margin: 10px 0 8px 20px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

const DescriptionWrapper = styled.div`
    height: ${100-COMMENT_SECTION_HEIGHT}%;
    width: 30%;
    // background-color: blue;
    
    padding-left: 10px;

    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PostTitle = styled.div`
    font-size: 24px; font-weight: bold;
    word-break: normal; word-wrap: break-word;

    flex: 1;
`;

const PostSeller = styled.div`
    font-size: 20px;
    flex: 2;
    cursor: pointer;
`;

const PostPrice = styled.div`
    font-size: 16px;
    flex: 1;
    // display: flex;
`;

const PostContent = styled.div`
    width: 95%;
    background-color: #d1dade;
    border-radius: 5px;
    word-break: normal; word-wrap: break-word;
    overflow: auto;

    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;

    flex: 6;
`;

const ItemWrapper = styled.div`
    height: ${100-COMMENT_SECTION_HEIGHT}%;
    width: 70%;
    // margin-bottom: 10%;

    flex: 4;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const CommentsWrapper = styled.div`
    width: 90%;
    height: 30%;
    // background-color: grey;
    display: flex;
    flex-direction: column;
    justify-content:space-between; 
`;

const CommentSection = styled.div`
    height: 80%;
    width: 90%;
    overflow: auto;
    // background-color: #c5cbd4;
    border: solid #d1dade 1px;
    border-radius: 4px;  
    padding: 10px;
    margin: 1px;
`;

const { Search } = Input;
const StyledCommentInput = styled(Search)`
    width: 94%;
`;

const Post = ({ seller, title, content, price, img }) => {

    const { myName } = useMarket();

    const [functionModalOpen, setFunctionModalOpen] = useState(false);
    const [comments, setComments] = useState([{sender: 'AA', content: 'aa'},
                                              {sender: 'BB', content: 'bb'},
                                              {sender: 'CC', content: 'cc'},
                                              {sender: 'DD', content: 'dd'},
                                              {sender: 'EE', content: 'ee'},
                                              {sender: 'FF', content: 'ff'},
                                              {sender: 'GG', content: 'gg'},]); // [{sender: name, content: ct}]

    const handleFunctions = () => {
        setFunctionModalOpen(true);
    }

    const handleComment =  (content) => { // comment content, not post content
        // const {
        //     data: {}
        // } = await axios.post(`/comments/${title}`, {
        //     title, // this post
        //     myName, // who left the comment
        //     content,
        // })
        const newComment = { sender: myName, content: content }
        setComments(...comments, newComment); // 這行應該有bug或不應該在這
    }

    const cmts = [{sender: 'AA', content: 'aa'},
                  {sender: 'BB', content: 'bb'},
                  {sender: 'CC', content: 'cc'},
                  {sender: 'DD', content: 'dd'},
                  {sender: 'XX', content: 'xxx'},
                  {sender: 'YY', content: 'yyyyy'},
                  {sender: 'ZZ', content: 'zzzzzzz'},]

    const displayComments = (cm) => {
        return cm.map((c, i) => {
            return <Comment key={i}
                            sender={c.sender}
                            content={c.content} />
        })
    }

    // useEffect(() => {
    //     displayComments();
    // }, [comments]) // 這個開註解會有問題

    return (
        <PostWrapper>
            <DescriptionWrapper>
                <PostTitle>{`${title}`}</PostTitle>
                <PostSeller>
                    <Space><UserOutlined style={{ color: "#4c9fcf", fontSize: '18px' }} /></Space>{` ${seller}`}
                </PostSeller>
                <PostPrice>
                    <Space><DollarCircleTwoTone twoToneColor="#f0ce11"
                        style={{ fontSize: '16px' }} /></Space>{` ${price}`}
                    <Button 
                        type="primary"
                        size={'middle'}
                        style={{ marginLeft: '40%' }}
                        onClick={handleFunctions} >Functions
                    </Button>
                </PostPrice>
                <PostContent>{`${content}`}</PostContent>
            </DescriptionWrapper>
            <ItemWrapper>
                <Item img={img} />
            </ItemWrapper>
            <CommentsWrapper>
                <CommentSection>{displayComments(comments)}</CommentSection>
                <StyledCommentInput
                        placeholder="Comment something..."
                        allowClear
                        enterButton="Comment"
                        size="large"
                        onSearch={handleComment} />
            </CommentsWrapper>
            
            <PostFunctionModal 
                open={functionModalOpen}
                onOk={() => {
                    setFunctionModalOpen(false);
                }}
                onCancel={() => {
                    setFunctionModalOpen(false);
                }}
                title={title} >
            </PostFunctionModal>
        </PostWrapper>
    )
};

export default Post;
