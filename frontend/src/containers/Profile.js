import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal } from 'antd';

import Post from './Post';
import MyPostModal from '../components/MyPostModal';
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

    display: flex;
    flex-direction: column;
`;

const StyledPhoto = styled(Avatar)`
    position: absolute;
    top: 10px;
    left: 10px;
`;

const StyledName = styled.h5`
    position: absolute;
    top: 10px;
    left: 100px;
`;

const StyledButton = styled(Button)`
    width: 150px;

    position: absolute;
    bottom: 20px;
    left: 75px;
`;

const Profile = ({ myName, displayPosts }) => {

    const [myPosts, setMyPosts] = useState([]);
    const [myPostModalOpen, setMyPostModalOpen] = useState(false);

    const { allPosts } = useMarket(); // 僅用來測試 view my post

    const handleViewMyPosts =  () => {
        console.log("view my post")

        // const {
        //     data: { posts } // an array of { seller, title, content, price, img, bidPrices[] } 這些會組成一個一個的 <Post> 
        // } = await axios.get('/myposts', {
        //     myName, // 依據 "myName" 這個 string(目前不是id)，去後端把我的 post 打包成一個陣列 posts[] 傳回來
        // })
        // setMyPosts(posts);

        // displayMyPosts();

        setMyPostModalOpen(true);
    }

    return (
        
        <Wrapper>
            <StyledPhoto shape="square" 
                         size={80}
                         icon={<UserOutlined />} />
            <StyledName>{`${myName}`}</StyledName>
            <StyledButton 
                type="primary" 
                size={'large'}
                onClick={handleViewMyPosts} >View Your Posts!
            </StyledButton>
            <MyPostModal
                open={myPostModalOpen}
                onOk={() => {
                    setMyPostModalOpen(false);
                }}
                onCancel={() => {
                    setMyPostModalOpen(false);
                }}
                displayMyPosts={displayPosts(allPosts)} >  {/* 應是 myPosts，如果看到 allPosts 表示在測試 */}
            </MyPostModal>
        </Wrapper>
    );
};

export default Profile;
