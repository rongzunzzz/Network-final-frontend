import styled from "styled-components";
import { Button } from "antd";

import Item from "../components/Item";
import BidModal from "../components/BidModal";
import axios from "../api";

import { useState } from "react";
import { useMarket } from "./hooks/useMarket";

const PostWrapper = styled.div`
    height: 200px;
    width: 750px;
    border: solid black 1px;
    border-radius: 4px;

    margin: 5px 0 5px 25px;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const TitleDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const BidPriceWrapper = styled.div`
    height: 150px;
    width: 100px;
    overflow: auto;
    background-color: #c5cbd4;

    text-align: center;

    // display: flex;
    // flex-direction: column;
    // justify-content: space-around;
    // align-items: center;
    // flex-wrap: wrap;
`;

const Post = ({ seller, title, content, price, img }) => {

    const { allPosts, addBidPrices } = useMarket();

    const [bidModalOpen, setBidModalOpen] = useState(false); 

    const handleBid = () => { 
        setBidModalOpen(true);
    }

    const displayBidPrices = () => {
        return allPosts.map((e) => {
            return e.postTitle === title ? (
                e.bidPrices.length === 0 ? (
                    // <p>{`NO BIDS`}</p> 
                    <></>
                ) : (
                    <BidPriceWrapper> 
                    { e.bidPrices.map( (p, index) => ( 
                        <p key={index}>{`${p}`}</p> 
                    ) ) }
                    </BidPriceWrapper>
                ) 
            ) : (<></>)
        })
    }

    return (
        <PostWrapper>
            <TitleDescWrapper>
                <h3>{`Title: ${title}`}</h3>
                <h4>{`Seller: ${seller}`}</h4>
                <p>{`Content: ${content}`}</p>
                <p>{`Recommended price: ${price}`}</p>
            </TitleDescWrapper>
            <Item img={img} />
            <Button 
                type="primary" 
                size={'large'}
                onClick={handleBid} >Bid
            </Button>
            
            {displayBidPrices()}
            
            <BidModal 
                open={bidModalOpen}
                onCreate={  (bPrice) => { 
                    // const {
                    //     data: {  }
                    // } = await axios.post('/bid', { 
                    //     title,
                    //     content,
                    //     price, // recommended sold price
                    //     img, // file url
                    //     bPrice, // add this bid price to the bidPrices[] of this <Post>
                    // })

                    addBidPrices(title, content, price, img, bPrice)
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
