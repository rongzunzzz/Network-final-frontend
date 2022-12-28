import styled from 'styled-components';
import { Input, Button } from 'antd';

import Post from './Post';
import Profile from './Profile';
import AddPostModal from '../components/AddPostModal';
import SearchModal from '../components/ShowModals/SearchModal';
import axios from "../api";

import { useState } from 'react';
import { useMarket } from './hooks/useMarket';

const AllPostWrapper = styled.div` 
    height: 650px;
    width: 800px;
    overflow: auto;
    border: solid #d1dade 1px;
    border-radius: 6px;

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

const Market = ({ myProfileOpen }) => {
    const { myName, myProfile, allPosts, addMarketPosts, popSuccessMsg } = useMarket();

    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async(title) => {
        const {
            data: { posts } // an array of { seller, title, content, price, img, bidPrices[] } 
        } = await axios.get(`/posts/search/${title}`, {
            title, // 依據 title 這個 string(目前不是id)，去後端把 search 的 post 打包成一個陣列 posts[] 傳回來
        })
        setSearchResult(posts);
        setSearchModalOpen(true);
    }

    const handleAddPost = () => {
        setAddPostModalOpen(true);
    }

    const displayPosts = (displayedPosts) => {
        return displayedPosts.map((post, index) => {
            return <Post key={index}
                seller={post.postSeller} // myName 會回到沒改過的版本
                title={post.postTitle}
                content={post.postContent}
                price={post.recommendedPrice}
                img={post.postImg} />
        })
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
                <SearchModal
                    open={searchModalOpen}
                    onOk={() => {
                        setSearchModalOpen(false);
                    }}
                    onCancel={() => {
                        setSearchModalOpen(false);
                    }}
                    displaySearchResult={displayPosts(searchResult)} > {/*應是 searchResult allPosts 表示在測試*/}
                </SearchModal>
                <Button // 要有 { title, content, item[] }
                    type="primary"
                    size={'large'}
                    onClick={handleAddPost} >Add Post!
                </Button>
            </FunctionBarWrapper>
            <AddPostModal
                sellerName={myName}
                open={addPostModalOpen}
                onCreate={async (myName, title, content, price, img) => {
                    // 這裡只單純存進 DB，在新增的當下只依靠前端 render 試試看，希望不要出事
                    const {
                        data: { message } // 或許可以是一個新增成功的彈出訊息
                    } = await axios.post('/posts/post', {
                        myName, // name of who posts the post
                        title,
                        content,
                        price, // recommended sold price
                        img, // file url
                    })
                    console.log(message)
                    addMarketPosts(myName, title, content, price, img);
                    setAddPostModalOpen(false);
                    popSuccessMsg("Add post");
                }}
                onCancel={() => {
                    setAddPostModalOpen(false);
                }} >
            </AddPostModal>

            {
                myProfileOpen ?
                    <Profile myName={myName} 
                             MyProfile={myProfile}
                             displayPosts={displayPosts} /> : <></>
            }

            <AllPostWrapper>{displayPosts(allPosts)}</AllPostWrapper>
        </>
    )
};

export default Market;
