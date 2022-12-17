import styled from "styled-components";
import { Modal } from "antd";

const MODAL_HEIGHT = 600;
const MODAL_WIDTH = 1000;

const MyPostsWrapper = styled.div`
    height: ${MODAL_HEIGHT}px;
    width: ${MODAL_WIDTH * 0.95}px;
    overflow: auto;
    background-color: #c5cbd4;
    border-radius: 10px;
`;

const SearchModal = ({ open, onOk, onCancel, displaySearchResult }) => {
    return <Modal
        title="Search Results"
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={MODAL_WIDTH} 
        bodyStyle={{height: MODAL_HEIGHT}}
    >
        <MyPostsWrapper>
            {displaySearchResult}
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
            <p>Search result...</p>
        </MyPostsWrapper>
        
    </Modal>
}

export default SearchModal;
