import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from 'antd';

import Post from './Post';
import MyPostModal from '../components/MyPostModal';
import axios from '../api';

import { useState } from 'react';

const Wrapper = styled.div`
    height: 250px;
    width: 300px;
    background-color: #c5cbd4;
    border-radius: 8px;

    position: absolute;
    right: 20px;
    top: 60px;

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

const Profile = ({ myName }) => {

    const [myPosts, setMyPosts] = useState([]);
    const [myPostModalOpen, setMyPostModalOpen] = useState(false);

    const displayMyPosts = () => { // 還要用個 modal 或個 wrapper 包起來顯示
        return myPosts.map((post, index) => { 
            return <Post key={index} 
                         seller={myName}
                         title={post.postTitle} 
                         content={post.postContent} 
                         price={post.recommendedPrice}
                         img={post.postImg} />  
        })
    }

    const handleViewMyPosts =  () => {
        console.log("view my post")

        setMyPostModalOpen(true);
        
        // const {
        //     data: { posts } // an array of { seller, title, content, price, img } 這些會組成一個一個的 <Post> 
        // } = await axios.get('/myposts', {
        //     myName,
        // })
        // setMyPosts(posts);

        // displayMyPosts();
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
                }} >
            </MyPostModal>
        </Wrapper>
    );
};

export default Profile;
