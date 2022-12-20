import styled from "styled-components";

const ImgWrapper = styled.div`
    height: 150px;
    width: 160px;
    background-color: #c5cbd4;
    border-radius: 2px;

    display:flex;
    justify-content: center;
    align-items: center;
`;

const StyledImg = styled.img`
    height: 95%;
    width: 95%;
    border-radius: 2px;
`;

const Item = ({ img }) => {
    return (
        <ImgWrapper>
            <StyledImg src={img} alt={"NO IMG"} />
        </ImgWrapper>
    )
};

export default Item;
