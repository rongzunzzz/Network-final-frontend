import styled from 'styled-components';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from 'antd';

const Wrapper = styled.div`
    height: 250px;
    width: 300px;
    background-color: grey;

    position: absolute;
    right: 20px;
    top: 60px;

    display: flex;
    flex-direction: column;
`;

const PhotoNameWrapper = styled.div`
    display: flex;
`;

const StyledButton = styled(Button)`
    width: 150px;
`;

const Profile = () => {

    const handleViewMyPost = () => {
        console.log("view my post")
        // jump to "my post page"
    }

    return (
        <Wrapper>
            <PhotoNameWrapper>
                <Avatar shape="square" 
                        size={80}
                        icon={<UserOutlined />} />
                <p>MY NAME</p>
            </PhotoNameWrapper>
            <StyledButton 
                type="primary" 
                size={'large'}
                onClick={handleViewMyPost} >View Your Posts!
            </StyledButton>
        </Wrapper>
    );
};

export default Profile;
