import styled from "styled-components";
import { UserOutlined, DollarOutlined, DollarCircleTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";

import Item from "../components/Item";
import BidModal from "../components/BidModal";
import ShowBidModal from "../components/ShowBidModal";
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

    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PostTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    word-break: normal;
    word-wrap: break-word;

    flex: 1;
`;

const PostSeller = styled.div`
    font-size: 20px;
    margin-bottom: 8px;
    flex: 2;

    cursor: pointer;
`;

const PostPrice = styled.div`
    font-size: 16px;
    flex: 1;
    display: flex;
`;

const PostContent = styled.div`
    width: 300px;
    background-color: #d1dade;
    border-radius: 5px;
    word-break: normal;
    word-wrap: break-word;
    overflow: auto;

    padding: 5px;
    margin-bottom: 5px;

    flex: 6;
`;

const ItemBidWrapper = styled.div`
    height: 95%;
    width: 70%;

    flex: 4;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const StyledBidButton = styled(Button)`
    heigth: 40px;
    width: 60px;
    margin-left: 30%;
`;

const StyleViewBidButton = styled(Button)`
    heigth: 40px;
    width: 100px;
    margin-left: 3%;
`;

const BidPriceWrapper = styled.div`
    height: 95%;
    width: 95%;
    overflow: auto;
    background-color: #d1dade;
    border-radius: 4px;

    text-align: center;
`;

const Post = ({ seller, title, content, price, img }) => {

    const { myName, allPosts, addBidPrices } = useMarket();

    const [bidModalOpen, setBidModalOpen] = useState(false);
    const [viewBidModalOpen, setViewBidModalOpen] = useState(false);

    const handleBid = () => {
        setBidModalOpen(true);
    }

    const handleViewBid = () => {
        setViewBidModalOpen(true);
    }

    const displayBidPrices = () => {
        return allPosts.map((e) => {
            // console.log(e)
            return e.postTitle === title ? (
                e.bidPrices.length === 0 ? (
                    // <p>{`NO BIDS`}</p> 
                    <></>
                ) : (
                    <BidPriceWrapper>
                        {e.bidPrices.map((b, index) => {
                            const { whoBids, bPrice } = b
                            return <p key={index} style={{ fontSize: '30px' }} >{`${whoBids}: ${bPrice}`}</p>
                        })}
                    </BidPriceWrapper>
                )
            ) : (<></>)
        })
    }

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
                    <StyledBidButton
                        type="primary"
                        size={'middle'}
                        onClick={handleBid} >Bid
                    </StyledBidButton>
                    <StyleViewBidButton
                        type="primary"
                        size={'middle'}
                        onClick={handleViewBid} >View Bids
                    </StyleViewBidButton>
                </PostPrice>
                <PostContent>{`${content}`}</PostContent>
            </DescriptionWrapper>
            <ItemBidWrapper>
                <Item img={img} />

                {/* {displayBidPrices()} */}
            </ItemBidWrapper>

            <BidModal
                open={bidModalOpen}
                onCreate={(bPrice) => {
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
            <ShowBidModal
                open={viewBidModalOpen}
                onOk={(bPrice) => {
                    // const {
                    //     data: { message }
                    // } = await axios.post('/bid', { 
                    //     title, // because we filter posts by checking the title 
                    //     myName, // 這邊要傳 出價者名字（應該是myName）                    
                    //     bPrice, // add above name and this bid price to the bidPrices[] of this <Post>
                    // })
                    setViewBidModalOpen(false);
                }}
                onCancel={() => {
                    setViewBidModalOpen(false);
                }}
                displayBidPrices={displayBidPrices()} >
            </ShowBidModal>


        </PostWrapper>
    )
};

export default Post;
