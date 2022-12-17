import styled from "styled-components";
import { Modal } from "antd";

import Post from "../containers/Post";

const MODAL_HEIGHT = 600;
const MODAL_WIDTH = 1000;

const MyPostsWrapper = styled.div`
    height: ${MODAL_HEIGHT}px;
    width: ${MODAL_WIDTH * 0.95}px;
    overflow: auto;
    background-color: #c5cbd4;
    border-radius: 10px;
`;

const MyPostModal = ({ open, onOk, onCancel, displayMyPosts }) => {

    return <Modal
        title="My Posts"
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={MODAL_WIDTH} 
        bodyStyle={{height: MODAL_HEIGHT}}
    >
        <MyPostsWrapper>
            {displayMyPosts()}
            {/* <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p> */}
        </MyPostsWrapper>
        
    </Modal>
}

export default MyPostModal;
