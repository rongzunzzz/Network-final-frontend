import Item from "./Item";

const Post = ({ title, content, img }) => {
    return (
        <div>
            <h4>{`Title: ${title}`}</h4>
            <p>{`Content: ${content}`}</p>
            <Item img={img} />
            <hr/>
            <br/>
        </div>
    )
};

export default Post;
