import styled from "styled-components";
import { Modal, Button } from "antd";

import BidModal from "../components/BidModal";
import ShowBidModal from "../components/ShowBidModal";
import RateModal from "../components/RateModal";
import ShowRateModal from "../components/ShowRateModal";
import axios from "../api";

import { useState } from "react";
import { useMarket } from "./hooks/useMarket";

const MODAL_HEIGHT = 400
const MODAL_WIDTH = 450

const ModalStyle = {
    height: MODAL_HEIGHT,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
}

const ShowWrapper = styled.div`
    height: 95%;
    width: 95%;
    overflow: auto;
    background-color: #d1dade;
    border-radius: 4px;

    text-align: center;
`;

const StyledButton = styled(Button)`
    height: 60px;
    width: 150px;
    font-size: 15px; font-weight: bold;
    margin: 15px;
`;

const PostFunctionModal = ({ open, onCancel, onOk, title }) => {

    const { myName } = useMarket();
    const [bidModalOpen, setBidModalOpen] = useState(false);
    const [viewBidModalOpen, setViewBidModalOpen] = useState(false);
    const [viewBids, setViewBids] = useState([]); // [{whoBids: name, price: p}, {}, {}]
    const [rateModalOpen, setRateModalOpen] = useState(false);
    const [viewRateModalOpen, setViewRateModalOpen] = useState(false);
    const [viewRates, setViewRates] = useState([]); // [{whoRates: name, rate: r}, {}, {}]
    const [viewTrackModalOpen, setViewTrackModalOpen] = useState(false);
    const [viewTracks, setViewTracks] = useState([]); // [name1, name2, ...]

    const handleBid = () => {
        setBidModalOpen(true);
    }

    const handleViewBid = async () => {
        const {
            data: { bids }
        } = await axios.get(`/bids/${title}}`, {
            title, 
        })
        setViewBids(bids);
        setViewBidModalOpen(true);
    }

    const displayBids = (vb) => {
        return <ShowWrapper> 
                {vb.map((b, index) => {
                    const { whoBids, bPrice } = b
                    return <p key={index} style={{ fontSize: '30px' }} >{`${whoBids}: ${bPrice}`}</p>
                })}
                </ShowWrapper>
    }

    const handleRate = () => {
        setRateModalOpen(true);
    }

    const handleViewRate = async () => {
        const {
            data: { rates } 
        } = await axios.get(`/rates/${title}}`, {
            title, 
        })
        setViewRates(rates);
        setViewRateModalOpen(true);
    }

    const displayRates = (rt) => {
        return <ShowWrapper> 
                {rt.map((r, index) => {
                    const { whoRates, rate } = r
                    return <p key={index} style={{ fontSize: '30px' }} >{`${whoRates}: ${rate}`}</p>
                })}
                </ShowWrapper>
    }

    const handleTrack = async () => {
        const {
            data: { message }
        } = await axios.post('/tracks/title', {
            myName,
            title,
        })
    }

    const handleViewTrack = async () => {
        const {
            data: { tracks }
        } = await axios.get(`/tracks${title}`, {
            title,
        })
        setViewTracks(tracks);
        setViewTrackModalOpen(true);
    }

    const displayTracks = (tk) => {
        return <ShowWrapper> 
                {tk.map((t, index) => {
                    return <p key={index} style={{ fontSize: '30px' }} >{`${t}`}</p>
                })}
                </ShowWrapper>
    }

    return (
        <Modal 
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            width={MODAL_WIDTH}
            bodyStyle={ModalStyle} >

            <StyledButton
                type="primary"
                size={'middle'}
                onClick={handleBid} >Bid
            </StyledButton>
            <StyledButton
                type="primary"
                size={'middle'}
                onClick={handleViewBid} >View Bids
            </StyledButton>
            <StyledButton
                type="primary"
                size={'middle'}
                onClick={handleRate} >Rate
            </StyledButton>
            <StyledButton
                type="primary"
                size={'middle'}
                onClick={handleViewRate} >View Rates
            </StyledButton>
            <StyledButton
                type="primary"
                size={'middle'}
                onClick={handleTrack} >Track this
            </StyledButton>
            <StyledButton
                type="primary"
                size={'middle'}
                onClick={handleViewTrack} >View Tracks
            </StyledButton>
            
            <BidModal
                bidderName={myName}
                open={bidModalOpen}
                onCreate={ async (myName, bPrice) => { // bPrice是剛輸入的數字
                    const {
                        data: { message }
                    } = await axios.post('/bids/title', { 
                        myName, // 這邊要傳 出價者名字                   
                        bPrice,
                        title, // because we filter posts by checking the title 
                    }) 
                    setBidModalOpen(false);
                }}
                onCancel={() => {
                    setBidModalOpen(false);
                }} >
            </BidModal>
            <ShowBidModal
                open={viewBidModalOpen}
                onOk={() => {
                    setViewBidModalOpen(false);
                }}
                onCancel={() => {
                    setViewBidModalOpen(false);
                }}
                displayBidPrices={displayBids(viewBids)} >
            </ShowBidModal>
            <RateModal
                raterName={myName}
                open={rateModalOpen}
                onCreate={ async (raterName, rate) => { // rate是剛輸入的數字
                    const {
                        data: { message }
                    } = await axios.post('/rates/title', { 
                        raterName, // 這邊要傳評價者名字                  
                        rate, 
                        title, // because we filter posts by checking the title 
                    }) 
                    setRateModalOpen(false);
                }}
                onCancel={() => {
                    setRateModalOpen(false);
                }} >
            </RateModal>
            <ShowRateModal
                open={viewRateModalOpen}
                onOk={() => {
                    setViewRateModalOpen(false);
                }}
                onCancel={() => {
                    setViewRateModalOpen(false);
                }}
                displayRates={displayRates(viewRates)} >
            </ShowRateModal>
            <ShowRateModal
                open={viewTrackModalOpen}
                onOk={() => {
                    setViewTrackModalOpen(false);
                }}
                onCancel={() => {
                    setViewTrackModalOpen(false);
                }}
                displayRates={displayTracks(viewTracks)} >
            </ShowRateModal>
        </Modal>
    )
}

export default PostFunctionModal;
