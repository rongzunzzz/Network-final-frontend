import styled from "styled-components";

const ImgWrapper = styled.div`
    height: 150px;
    width: 160px;
`;

const StyledImg = styled.img`
    height: 100%;
    width: 100%;
`;

const Item = ({ img }) => {
    return (
        <ImgWrapper>
            <StyledImg src={img} />
        </ImgWrapper>
    )
};

export default Item;
