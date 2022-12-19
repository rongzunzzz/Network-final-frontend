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

    margin: 10px 0 8px 20px;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const DescriptionWrapper = styled.div`
    height: 95%;
    width: 30%;
    
    padding-left: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PostTitle = styled.div`
    font-size: 24px;
    font-weight: bold;

    margin-bottom: 7px;

    flex: 1;
`;

const PostSeller = styled.div`
    flex: 2;
`;

const PostContent = styled.div`
    background-color: white;
    word-break: normal;
    word-wrap: break-word;
    overflow: auto;

    margin-bottom: 5px;

    flex: 3;
`;

const PostPrice = styled.div`
    flex: 1;
`;

const ItemBidWrapper = styled.div`
    height: 95%;
    width: 70%;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const StyledButton = styled(Button)`
    width: 100px;
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
                <PostTitle>{`${title}`}</PostTitle>
                <PostSeller>{`${seller}`}</PostSeller>
                <PostContent>{`Content: ${content}`}</PostContent>
                <PostPrice>{`Price: ${price}`}</PostPrice>
            </DescriptionWrapper>
            <ItemBidWrapper>
                <Item img={img} />
                <StyledButton 
                    type="primary" 
                    size={'large'}
                    onClick={handleBid} >Bid
                </StyledButton>
                
                {displayBidPrices()}
            </ItemBidWrapper>

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
