import styled from "styled-components";
import { Button } from "antd";

import Item from "../components/Item";
import BidModal from "../components/BidModal";

import { useState } from "react";
import { useMarket } from "./hooks/useMarket";

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

const BidPriceWrapper = styled.div`
    height: 100px;
    width: 100px;
    background-color: #c5cbd4;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

const Post = ({ title, content, img }) => {

    const { allPosts, addBidPrices } = useMarket();

    const [bidModalOpen, setBidModalOpen] = useState(false); 

    const handleBid = () => { 
        setBidModalOpen(true);
    }

    const displayBidPrices = () => {
        return allPosts.map((e) => {
            return e.postTitle === title ?  
                e.bidPrices.map((p) => { 
                    return <p>{`${p}`}</p>
                }) : <p>{`NO BIDS`}</p> 
        })
    }

    return (
        <PostWrapper>
            <TitleDescWrapper>
                <h3>{`Title: ${title}`}</h3>
                <p>{`Content: ${content}`}</p>
            </TitleDescWrapper>
            <Item img={img} />
            <Button 
                type="primary" 
                size={'large'}
                onClick={handleBid} >Bid
            </Button>
            <BidPriceWrapper>{displayBidPrices()}</BidPriceWrapper>
            <BidModal 
                open={bidModalOpen}
                onCreate={(price) => { 
                    addBidPrices(title, content, img, price)
                    setBidModalOpen(false);
                }}
                onCancel={() => {
                    setBidModalOpen(false);
                }} >
            </BidModal>
        </PostWrapper>
    )
};

export default Post;
