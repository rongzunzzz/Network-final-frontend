import styled from 'styled-components'
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';

import { useState } from 'react';

const Wrapper = styled.div`
    height: 10%;
    width: 100%;
    background-color: #ebf0f2;

    margin-bottom: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h1 {
        margin: 0;
        font-size: 3em;
    }
`;

const TitleTextBlock = styled.div`
    margin-left: 3%;
`;

const StyledPhoto = styled.div`
    background-color: #ebf0f2;
    border-radius: 50%;
    margin-right: 2%;
    cursor: pointer;
`;

const Title = ({ signedIn, setMyProfileOpen }) => {
    
    // const [myProfileOpen, setMyProfileOpen] = useState(false);
    
    const handleClick = () => {
        setMyProfileOpen(curr => !curr);
    }

    return <Wrapper>
        <TitleTextBlock>
            <h2 style={{color: '#7f8a8f'}}>NTU E-AUCTION</h2>
        </TitleTextBlock>
        {
            signedIn ? 
            <StyledPhoto onClick={handleClick}>
                <Avatar shape="circle" size={50} icon={<UserOutlined />} />
                {/* <Profile 
                    open={myProfileOpen}
                    onOk={() => {
                        setMyProfileOpen(false);
                    }}
                    onCancel={() => {
                        setMyProfileOpen(false);
                    }} /> */}
            </StyledPhoto> : <></>
        }
        
    </Wrapper> 
};

export default Title;