import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from 'antd';

import axios from '../api';

const Wrapper = styled.div`
    height: 250px;
    width: 300px;
    background-color: #c5cbd4;

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

const Profile = () => {

    const handleViewMyPost = () => {
        console.log("view my post")
        // jump to "my post page"
    }

    return (
        <Wrapper>
            <StyledPhoto shape="square" 
                         size={80}
                         icon={<UserOutlined />} />
            <StyledName>MY NAME</StyledName>
            <StyledButton 
                type="primary" 
                size={'large'}
                onClick={handleViewMyPost} >View Your Posts!
            </StyledButton>
        </Wrapper>
    );
};

export default Profile;
