import styled from "styled-components";
import { Button } from "antd";

import Item from "../components/Item";
import BidModal from "../components/BidModal";
import axios from "../api";

import { useState } from "react";
import { useMarket } from "./hooks/useMarket";

const PostWrapper = styled.div`
    height: 200px;
    width: 95%;
    background-color: #ebf0f2;
    border: solid white 1px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 4px #ccc;

    margin: 5px 0 5px 25px;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const BidPriceWrapper = styled.div`
    height: 150px;
    width: 120px;
    overflow: auto;
    background-color: #c5cbd4;
    border-radius: 4px;

    text-align: center;
`;

const Post = ({ seller, title, content, price, img }) => {

    const { myName, allPosts, addBidPrices } = useMarket();

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
                    { e.bidPrices.map( (b, index) => { 
                        const { whoBids, bPrice } = b
                        return <p key={index}>{`${whoBids}: ${bPrice}`}</p> 
                    }) }
                    </BidPriceWrapper>
                ) 
            ) : (<></>)
        })
    }

    return (
        <PostWrapper>
            <DescriptionWrapper>
                <h3>{`Title: ${title}`}</h3>
                <h4>{`Seller: ${seller}`}</h4>
                <p>{`Content: ${content}`}</p>
                <p>{`Recommended price: ${price}`}</p>
            </DescriptionWrapper>
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
                    //     data: { message }
                    // } = await axios.post('/bid', { 
                    //     title, // because we filter posts by checking the title 
                    //     myName, // 這邊要傳 出價者名字（應該是myName）                    
                    //     bPrice, // add above name and this bid price to the bidPrices[] of this <Post>
                    // })

                    addBidPrices(title, content, price, img, bPrice, myName)
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
