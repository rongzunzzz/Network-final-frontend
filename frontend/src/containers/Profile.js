import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from 'antd';

import ShowMyPostsModal from '../components/ShowModals/ShowMyPostsModal';
import ShowMyTrackModal from '../components/ShowModals/ShowMyTrackModal';
import BecomeSellerModal from '../components/BecomeSellerModal';
import axios from '../api';

import { useState } from 'react';
import { useMarket } from './hooks/useMarket';

const Wrapper = styled.div`
    height: 500px;
    width: 20%;
    background-color: #ebf0f2;
    border-radius: 8px;

    position: absolute;
    right: 2%;
    top: 10%;
`;

const StyledPhoto = styled(Avatar)`
    position: absolute;
    top: 4%;
    left: 4%;
`;

const StyledName = styled.h5`
    font-size: 28px;
    position: absolute;
    top: 15%;
    left: 4%;
`;

const StyledAccount = styled.h5`
    position: absolute;
    top: 35%;
    left: 4%;
`;

const StyledPhoneNumber = styled.h5`
    position: absolute;
    top: 45%;
    left: 4%;
`;

const BUTTON_MARGIN = 4
const ViewMyPostButton = styled(Button)`
    width: ${100-2*BUTTON_MARGIN}%;

    position: absolute;
    bottom: 2%;
    left: ${BUTTON_MARGIN}%;
`;

const ViewMyTrackButton = styled(Button)`
    width: ${100-2*BUTTON_MARGIN}%;

    position: absolute;
    bottom: 11%;
    left: ${BUTTON_MARGIN}%;
`;

const BecomeSellerButton = styled(Button)`
    width: ${100-2*BUTTON_MARGIN}%;

    position: absolute;
    bottom: 20%;
    left: ${BUTTON_MARGIN}%;
`;

const Profile = ({ myName, MyProfile, displayPosts }) => {

    const { myProfile, setMyProfile } = useMarket();

    const [myPosts, setMyPosts] = useState([]);
    const [myPostModalOpen, setMyPostModalOpen] = useState(false);
    const [myTracks, setMyTracks] = useState([]);
    const [myTrackModalOpen, setMyTrackModalOpen] = useState(false);
    const [sellerInputModalOpen, setSellerInputModalOpen] = useState(false);

    const handleViewMyPosts = async () => {
        const {
            data: { posts } // an array of { seller, title, content, price, img, bidPrices[] } 這些會組成一個一個的 <Post> 
        } = await axios.get(`/posts/${myName}`, {
            myName, // 依據 "myName" 這個 string(目前不是id)，去後端把我的 post 打包成一個陣列 posts[] 傳回來
        })
        setMyPosts(posts);
        setMyPostModalOpen(true);
    }

    const handleViewMyTrack = async () => {
        const {
            data: { tracks }
        } = await axios.get(`/tracks/${myName}`, {
            myName,
        })
        setMyTracks(tracks);
        setMyTrackModalOpen(true);
    }

    // 改掉「這個人」的 profile（裡的 role），傳回來重新 set
    const handleBecomeSeller = async (realName, address) => { 
        const {
            data: { profile } // { phoneNum, account, password, role }
        } = await axios.post('/profile/becomeSeller', {
            myName, // set the user "seller", and never undo(the button will be disabled)
            MyProfile, // { phoneNum, account, password, role } // role 後端應該用不到
            realName, 
            address,
        })
        setMyProfile(profile); // 把 role 從 normal 改成 seller，並加入額外資訊
    }

    return (

        <Wrapper>
            <StyledPhoto shape="square"
                size={80}
                icon={<UserOutlined />} />
            <StyledName>{`${myName}`}</StyledName>
            <StyledAccount>{`@${myProfile.account}`}</StyledAccount>
            <StyledPhoneNumber>{`${myProfile.phone_num}`}</StyledPhoneNumber>

            <BecomeSellerButton 
                type='primary'
                size={'large'}
                disabled={ myProfile.role === "seller" /* 按了就再也按不下去 */}
                onClick={() => { 
                    setSellerInputModalOpen(true);
                }} >Become Seller!</BecomeSellerButton>
            <ViewMyTrackButton 
                type="primary"
                size={'large'}
                onClick={handleViewMyTrack} >View Your Track!</ViewMyTrackButton> 
            <ViewMyPostButton 
                type="primary"
                size={'large'}
                onClick={handleViewMyPosts} >View Your Posts!</ViewMyPostButton> 
            
            
            <ShowMyPostsModal
                open={myPostModalOpen}
                onOk={() => {
                    setMyPostModalOpen(false);
                }}
                onCancel={() => {
                    setMyPostModalOpen(false);
                }}
                displayMyPosts={displayPosts(myPosts)} >
            </ShowMyPostsModal>
            <ShowMyTrackModal
                open={myTrackModalOpen}
                onOk={() => {
                    setMyTrackModalOpen(false);
                }}
                onCancel={() => {
                    setMyTrackModalOpen(false);
                }}
                displayMyTrack={displayPosts(myTracks)} >
            </ShowMyTrackModal>
            <BecomeSellerModal
                open={sellerInputModalOpen}
                onCreate={(realName, address) => { 
                    handleBecomeSeller(realName, address);
                    setSellerInputModalOpen(false);
                }}
                onCancel={() => {
                    setSellerInputModalOpen(false);
                }} >
            </BecomeSellerModal>

        </Wrapper>
    );
};

export default Profile;
