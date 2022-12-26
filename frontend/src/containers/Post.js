import styled from "styled-components";
import { UserOutlined, DollarOutlined, DollarCircleTwoTone } from "@ant-design/icons";
import { Button, Space, Input } from "antd";

import Item from "../components/Item";
import Comment from "../components/Comment";
import BidModal from "../components/BidModal";
import ShowBidModal from "../components/ShowBidModal";
import axios from "../api";

import { useEffect, useState } from "react";
import { useMarket } from "./hooks/useMarket";

const COMMENT_SECTION_HEIGHT = 45 // including the comments part and the input box
const PostWrapper = styled.div`
    height: 600px;
    width: 95%;
    background-color: #ebf0f2;
    border: solid white 1px;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 4px #ccc;

    margin: 10px 0 8px 20px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

const DescriptionWrapper = styled.div`
    height: ${100-COMMENT_SECTION_HEIGHT}%;
    width: 30%;
    // background-color: blue;
    
    padding-left: 10px;

    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PostTitle = styled.div`
    font-size: 24px; font-weight: bold;
    word-break: normal; word-wrap: break-word;

    flex: 1;
`;

const PostSeller = styled.div`
    font-size: 20px;
    flex: 2;
    cursor: pointer;
`;

const PostPrice = styled.div`
    font-size: 16px;
    flex: 1;
    // display: flex;
`;

const PostContent = styled.div`
    width: 95%;
    background-color: #d1dade;
    border-radius: 5px;
    word-break: normal; word-wrap: break-word;
    overflow: auto;

    padding: 5px;
    margin-bottom: 5px;
    margin-top: 5px;

    flex: 6;
`;

const ItemWrapper = styled.div`
    height: ${100-COMMENT_SECTION_HEIGHT}%;
    width: 70%;

    flex: 4;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const StyledBidButton = styled(Button)`
    heigth: 40px;
    width: 60px;
    margin-left: 25%;
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

const CommentsWrapper = styled.div`
    height: 20%;
    width: 90%;
    overflow: auto;
    // background-color: #c5cbd4;
    border: solid #d1dade 1px;
    border-radius: 4px;  
    padding: 10px;
`;

const { Search } = Input;
const StyledCommentInput = styled(Search)`
    width: 93%;
`;

const Post = ({ seller, title, content, price, img }) => {

    const { myName, allPosts, addBidPrices } = useMarket();

    const [bidModalOpen, setBidModalOpen] = useState(false);
    const [viewBidModalOpen, setViewBidModalOpen] = useState(false);
    const [viewBids, setViewBids] = useState([]); // [{whoBids: name, price: p}, {}, {}]
    const [comments, setComments] = useState([{sender: 'AA', content: 'aa'},
                                              {sender: 'BB', content: 'bb'},]); // [{sender: name, content: ct}]

    const handleBid = () => {
        setBidModalOpen(true);
    }

    const handleViewBid = async () => {
        console.log("view bid")
        const {
            data: { bids }
        } = await axios.get(`/bids/${title}}`, {
            title, 
        })
        console.log(bids)
        setViewBids(bids);
        setViewBidModalOpen(true);
    }

    const handleComment =  (content) => { // comment content, not post content
        // const {
        //     data: {}
        // } = await axios.post(`/comments/${title}`, {
        //     title, // this post
        //     myName, // who left the comment
        //     content,
        // })
        const newComment = { sender: myName, content: content }
        setComments(...comments, newComment); // 這行應該有bug或不應該在這
    }

    const displayBidPrices = (vb) => {
        return <BidPriceWrapper> 
                {vb.map((b, index) => {
                    const { whoBids, bPrice } = b
                    console.log(b)
                    return <p key={index} style={{ fontSize: '30px' }} >{`${whoBids}: ${bPrice}`}</p>
                })}
                </BidPriceWrapper>
    }

    const displayComments = () => {
        return comments.map((c, i) => {
            return <Comment key={i}
                            sender={c.sender}
                            content={c.content} />
        })
    }

    // useEffect(() => {
    //     displayComments();
    // }, [comments])

    // const displayBidPrices = () => {
    //     return allPosts.map((e) => {
    //         // console.log(e)
    //         return e.postTitle === title ? (
    //             e.bidPrices.length === 0 ? (
    //                 // <p>{`NO BIDS`}</p> 
    //                 <></>
    //             ) : (
    //                 <BidPriceWrapper>
    //                     {e.bidPrices.map((b, index) => {
    //                         const { whoBids, bPrice } = b
    //                         return <p key={index} style={{ fontSize: '30px' }} >{`${whoBids}: ${bPrice}`}</p>
    //                     })}
    //                 </BidPriceWrapper>
    //             )
    //         ) : (<></>)
    //     })
    // }

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
            <ItemWrapper>
                <Item img={img} />
            </ItemWrapper>
            <CommentsWrapper>{displayComments()}</CommentsWrapper>
            <StyledCommentInput
                    placeholder="Comment something..."
                    allowClear
                    enterButton="Comment"
                    size="large"
                    onSearch={handleComment} />
            

            <BidModal
                bidderName={myName}
                open={bidModalOpen}
                onCreate={ async (myName, bPrice) => { // bPrice是剛輸入的數字
                    const {
                        data: { message }
                    } = await axios.post('/bids/title', { 
                        myName, // 這邊要傳 出價者名字（應該是myName）                    
                        bPrice, // add above name and this bid price to the bidPrices[] of this <Post>
                        title, // because we filter posts by checking the title 
                    })
                    console.log(message)

                    addBidPrices(title, content, price, img, bPrice, myName)
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
                displayBidPrices={displayBidPrices(viewBids)} >
            </ShowBidModal>


        </PostWrapper>
    )
};

export default Post;
