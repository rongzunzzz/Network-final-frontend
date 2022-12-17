import { createContext, useContext, useEffect, useState } from "react";

const MarketContext = createContext({
    myName: "",
    signedIn: false,
    allPosts: [],

    setMyName: () => {},
    setSignedIn: () => {},
    setAllPosts: () => {},
    
    addMarketPosts: () => {},
    addBidPrices: () => {},
})

const makePost = (name, title, content, price, img) => ({ 
    postSeller: name, 
    postTitle: title, 
    postContent: content, 
    recommendedPrice: price,
    postImg: img, 
    bidPrices: [],
})

const MarketProvider = (props) => {
    const [myName, setMyName] = useState("MyName")
    const [signedIn, setSignedIn] = useState(false);
    const [allPosts, setAllPosts] = useState([]); // { seller, title, content, img, bidPrices[] }

    const addMarketPosts = (name, title, content, price, img) => {
        setAllPosts([...allPosts, makePost(name, title, content, price, img)])
    }

    const addBidPrices = (title, content, rPrice, img, bPrice) => { // we give unique titles for post!
        const newAllPosts = allPosts.map((e) => {
            if (e.postTitle === title) { 
                const newBidPrice = [...e.bidPrices, bPrice]
                
                return { 
                    postTitle: title, 
                    postContent: content,
                    recommendedPrice: rPrice,
                    postImg: img,
                    bidPrices: newBidPrice 
                };
            }
            return e;
        })
        setAllPosts(newAllPosts)
    }

    return (
        <MarketContext.Provider
            value={{
                myName, setMyName,
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
