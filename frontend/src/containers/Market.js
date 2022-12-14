import styled from 'styled-components';
import { Input, Button } from 'antd';

import Post from "../components/Post";
import Profile from './Profile';
import AddPostModal from '../components/AddPostModal';
import axios from "../api";

import { useState } from 'react';
import { useMarket } from './hooks/useMarket';

const AllPostWrapper = styled.div` 
    width: 800px;
    border: solid black 1px;

    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FunctionBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileWrapper = styled.div`
    height: 250px;
    width: 300px;
    background-color: grey;

    position: absolute;
    right: 20px;
    top: 60px;

    display: flex;
    flex-direction: column;
`;

const { Search } = Input;
const StyledSearchBar = styled(Search)`
    width: 400px;
    
    margin-right: 50px;
`;

const Market = () => {
    const { allPosts, setAllPosts } = useMarket();

    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [bidModalOpen, setBidModalOpen] = useState(false); // 還是要放在 Post.js，但可能會變 container

    const handleSearch = (value) => {
        console.log(`Search for: ${value}`);
    }

    const handleAddPost = () => {
        console.log("Add a post!");
        setAddPostModalOpen(true);
    }

    return (
        <>
            <FunctionBarWrapper>
                <StyledSearchBar
                    placeholder="Searching for..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                />
                <Button // 要有 { title, content, item[] }
                    type="primary" 
                    size={'large'}
                    onClick={handleAddPost} >Add Post!
                </Button>
            </FunctionBarWrapper>
            <AddPostModal 
                open={addPostModalOpen}
                onCancel={() => {
                    setAddPostModalOpen(false);
                }} >
            </AddPostModal>
            
            <Profile />
            
            <AllPostWrapper>
                <h3>這裡只是暫時匡起來，之後應該會去找 scrollable 模板</h3>
                <Post />
                <Post />
                <Post />
            </AllPostWrapper>
        </>
    )
};

export default Market;
