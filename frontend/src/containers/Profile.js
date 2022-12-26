import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from 'antd';

import MyPostModal from '../components/MyPostModal';
import BecomeSellerModal from '../components/BecomeSellerModal';
import axios from '../api';

import { useState } from 'react';
import { useMarket } from './hooks/useMarket';

const Wrapper = styled.div`
    height: 35%;
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

const ViewMyPostButton = styled(Button)`
    width: 45%;

    position: absolute;
    bottom: 5%;
    left: 2%;
`;

const BecomeSellerButton = styled(Button)`
    width: 45%;

    position: absolute;
    bottom: 5%;
    left: 53%;
`;

const Profile = ({ myName, myProfile, displayPosts }) => {

    const { setMyProfile } = useMarket();

    const [myPosts, setMyPosts] = useState([]);
    const [myPostModalOpen, setMyPostModalOpen] = useState(false);
    const [sellerInputModalOpen, setSellerInputModalOpen] = useState(false);

    const handleViewMyPosts = async () => {
        const {
            data: { posts } // an array of { seller, title, content, price, img, bidPrices[] } 這些會組成一個一個的 <Post> 
        } = await axios.get(`/posts/${myName}`, {
            myName // 依據 "myName" 這個 string(目前不是id)，去後端把我的 post 打包成一個陣列 posts[] 傳回來
        })
        setMyPosts(posts);
        setMyPostModalOpen(true);
    }

    const handleBecomeSeller = async () => { // 改掉「這個人」的 profile（裡的 role），傳回來重新 set
        const {
            data: { profile } // { phoneNum, account, password, role }
        } = await axios.post('/profile/becomeSeller', {
            myName, // set the user "seller", and never undo(the button will be disabled)
        })
        setMyProfile(profile); // 簡單來說，就只是把 role 從 normal 改成 seller 就好
    }

    const addSellerInfo = async (realName, address) => { // 把這些資料拿去 set SELLER table
        const {
            data: {  }
        } = await axios.post('/profile/addSellerInfo', {
            myName,
            myProfile, // { phoneNum, account, password, role } // role 後端應該用不到
            realName, 
            address,
        })
    }

    return (

        <Wrapper>
            <StyledPhoto shape="square"
                size={80}
                icon={<UserOutlined />} />
            <StyledName>{`${myName}`}</StyledName>
            <StyledAccount>{`@${myProfile.account}`}</StyledAccount>
            <StyledPhoneNumber>{`${myProfile.phoneNum}`}</StyledPhoneNumber>

            <ViewMyPostButton 
                type="primary"
                size={'large'}
                onClick={handleViewMyPosts} >View Your Posts!</ViewMyPostButton> 
            <BecomeSellerButton 
                type='primary'
                size={'large'}
                disabled={ myProfile.role === "seller" /* 按了就再也按不下去 */}
                onClick={() => {
                    handleBecomeSeller();
                    setSellerInputModalOpen(true);
                }} >Become Seller!</BecomeSellerButton>
            
            <MyPostModal
                open={myPostModalOpen}
                onOk={() => {
                    setMyPostModalOpen(false);
                }}
                onCancel={() => {
                    setMyPostModalOpen(false);
                }}
                displayMyPosts={displayPosts(myPosts)} >
            </MyPostModal>
            <BecomeSellerModal
                open={sellerInputModalOpen}
                onCreate={(realName, address) => { 
                    addSellerInfo(realName, address);
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
