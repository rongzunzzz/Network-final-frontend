import { createContext, useContext, useEffect, useState } from "react";

const MarketContext = createContext({
    signedIn: false,
    allPosts: [],

    setSignedIn: () => {},
    setAllPosts: () => {},
    
    addMarketPosts: () => {},
})

const makePost = (title, content, img) => ({ 
    postTitle: title, postContent: content, postImg: img 
})

const MarketProvider = (props) => {
    const [signedIn, setSignedIn] = useState(false);
    const [allPosts, setAllPosts] = useState([]);

    const addMarketPosts = (title, content, img) => {
        setAllPosts([...allPosts, makePost(title, content, img)])
    }

    return (
        <MarketContext.Provider
            value={{
                signedIn, setSignedIn, 
                allPosts, setAllPosts, addMarketPosts,
            }}
            {...props}
        />
    );
};

const useMarket = () => useContext(MarketContext);

export { MarketProvider, useMarket};
