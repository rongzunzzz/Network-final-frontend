import styled from 'styled-components';
import { Input, Button } from 'antd';

import Post from './Post';
import Profile from './Profile';
import AddPostModal from '../components/AddPostModal';
import axios from "../api";

import { useState, useEffect } from 'react';
import { useMarket } from './hooks/useMarket';

const AllPostWrapper = styled.div` 
    height: 600px;
    width: 800px;
    overflow: auto;
    border: solid black 1px;

    margin-top: 30px;
`;

const FunctionBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const { Search } = Input;
const StyledSearchBar = styled(Search)`
    width: 400px;
    
    margin-right: 50px;
`;

const Market = () => {
    const { allPosts, addMarketPosts } = useMarket();

    const [addPostModalOpen, setAddPostModalOpen] = useState(false);

    const handleSearch = (value) => {
        console.log(`Search for: ${value}`);
    }

    const handleAddPost = () => {
        console.log("Add a post!");
        setAddPostModalOpen(true);
    }

    const displayPosts = () => {
        return allPosts.map((post, index) => { 
            return <Post key={index} 
                         title={post.postTitle} 
                         content={post.postContent} 
                         img={post.postImg} />  
        })
    }

    useEffect(() => {
        displayPosts();
    }, [allPosts])

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
                onCreate={  (title, content, img) => { 
                    // const { data: {  
                        
                    // }} = await axios.post('/post', {
                    //     title,
                    //     content,
                    //     img
                    // })
                    addMarketPosts(title, content, img);
                    setAddPostModalOpen(false);
                }}
                onCancel={() => {
                    setAddPostModalOpen(false);
                }} >
            </AddPostModal>
            
            <Profile />
            
            <AllPostWrapper>{displayPosts()}</AllPostWrapper>
        </>
    )
};

export default Market;
