import styled from 'styled-components';
import { Input, Button } from 'antd';

import Post from './Post';
import Profile from './Profile';
import AddPostModal from '../components/AddPostModal';
import SearchModal from '../components/SearchModal';
import axios from "../api";

import { useState, useEffect, useRef } from 'react';
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
    const { myName, allPosts, setAllPosts, addMarketPosts } = useMarket();

    const [addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (value) => {
        console.log(`Search for: ${value}`);

        // const {
        //     data: { posts } // an array of { seller, title, content, price, img, bidPrices[] } 
        // } = await axios.get('/search', {
        //     value, // 依據 title 這個 string(目前不是id)，去後端把 search 的 post 打包成一個陣列 posts[] 傳回來
        // })
        // setSearchResult(posts);

        setSearchModalOpen(true);
    }

    const handleAddPost = () => {
        console.log("Add a post!");
        setAddPostModalOpen(true);
    }

    // const getAllPosts = async () => {
    //     const {
    //         data: { posts } // an array of { seller, title, content, price, img, bidPrices[] }
    //     } = await axios.get('/posts/', {

    //     })

    //     setAllPosts(posts);
    // }

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

    useEffect(() => {
        // setTimeout(getAllPosts, '1500'); // 登入之後會要1.5秒後才顯示出來，之後進入無限query（1.5秒一次，很可怕，但總比沒設定好）
        displayPosts(allPosts);
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
                open={addPostModalOpen}
                onCreate={async (title, content, price, img) => {
                    // 這裡只單純存進 DB，在新增的當下只依靠前端 render 試試看，希望不要出事
                    // const {
                    //     data: { message } // 或許可以是一個新增成功的彈出訊息
                    // } = await axios.post('/posts/post', {
                    //     seller, // name of who posts the post
                    //     title,
                    //     content,
                    //     price, // recommended sold price
                    //     img, // file url
                    // })
                    // console.log(message)
                    addMarketPosts(myName, title, content, price, img);
                    setAddPostModalOpen(false);
                }}
                onCancel={() => {
                    setAddPostModalOpen(false);
                }} >
            </AddPostModal>

            {
                myProfileOpen ?
                    <Profile myName={myName} displayPosts={displayPosts} /> : <></>
            }

            <AllPostWrapper>{displayPosts(allPosts)}</AllPostWrapper>
        </>
    )
};

export default Market;
