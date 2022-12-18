import styled from "styled-components";
import { Modal } from "antd";

const MODAL_HEIGHT = 600;
const MODAL_WIDTH = 1000;

const MyPostsWrapper = styled.div`
    height: ${MODAL_HEIGHT}px;
    width: ${MODAL_WIDTH * 0.95}px;
    overflow: auto;
    background-color: #c5cbd4;
    border-radius: 8px;
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
            {displayMyPosts}
        </MyPostsWrapper>
        
    </Modal>
}

export default MyPostModal;
