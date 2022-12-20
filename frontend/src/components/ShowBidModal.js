import styled from "styled-components";
import { Modal } from "antd";

const MODAL_HEIGHT = 300;
const MODAL_WIDTH = 500;

const ViewBidWrapper = styled.div`
    height: ${MODAL_HEIGHT}px;
    width: ${MODAL_WIDTH * 0.9}px;
    overflow: auto;
    background-color: #c5cbd4;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ShowBidModal = ({ open, onOk, onCancel, displayBidPrices }) => {

    return <Modal
        title="All Bids"
        centered
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={MODAL_WIDTH}
        bodyStyle={{ height: MODAL_HEIGHT }}
    >
        <ViewBidWrapper>
            {displayBidPrices}
        </ViewBidWrapper>

    </Modal>
}

export default ShowBidModal;
