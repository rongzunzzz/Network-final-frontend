import styled from 'styled-components'
import { Input, Button } from 'antd';

import Post from "../components/Post";

import { useState } from 'react';

const AllPostWrapper = styled.div` 
    width: 800px;
    border: solid black 1px;

    margin-left: 475px;
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FunctionBarWrapper = styled.div`
    margin-left: 180px;

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
    const [bidModalOpen, setBidModalOpen] = useState(false); // 還是要放在 Post.js 
                                                             // 但可能會變 container

    const onSearch = (value) => {
        console.log(`Search for: ${value}`);
    }

    const onClick = () => {
        console.log("Add a post!")
    }

    return (
        <>
            <FunctionBarWrapper>
                <StyledSearchBar
                    placeholder="Searching for..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
                <Button 
                    type="primary" 
                    size={'large'}
                    onClick={onClick} >Add Post!</Button>
            </FunctionBarWrapper>
            
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
