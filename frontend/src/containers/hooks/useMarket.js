import { createContext, useContext, useEffect, useState } from "react";

const MarketContext = createContext({
    signedIn: false,
    allPosts: [],

    setSignedIn: () => {},
    setAllPosts: () => {},
    
    addMarketPosts: () => {},
    addBidPrices: () => {},
})

const makePost = (title, content, img) => ({ 
    postTitle: title, postContent: content, postImg: img, bidPrices: [],
})

const MarketProvider = (props) => {
    const [signedIn, setSignedIn] = useState(false);
    const [allPosts, setAllPosts] = useState([]); // { title, content, img, bidPrices[] }

    const addMarketPosts = (title, content, img) => {
        setAllPosts([...allPosts, makePost(title, content, img)])
    }

    const addBidPrices = (title, content, img, price) => { // we give unique titles for post!
        const newAllPosts = allPosts.map((e) => {
            if (e.postTitle === title) { 
                const newBidPrice = [...e.bidPrices, price]
                
                return { postTitle: title, 
                         postContent: content,
                         postImg: img,
                         bidPrices: newBidPrice};
            }
            return e;
        })
        setAllPosts(newAllPosts)
    }

    return (
        <MarketContext.Provider
            value={{
                signedIn, setSignedIn, 
                allPosts, setAllPosts, addMarketPosts,
                addBidPrices,
            }}
            {...props}
        />
    );
};

const useMarket = () => useContext(MarketContext);

export { MarketProvider, useMarket};
