import { createContext, useContext, useEffect, useState } from "react";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

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
    bidPrices: [], // { whoBids: name, bPrice: price }
})

const MarketProvider = (props) => {
    const [myName, setMyName] = useState(savedMe || ""); // current user name
    const [signedIn, setSignedIn] = useState(false);
    const [allPosts, setAllPosts] = useState([]); // { seller, title, content, img, bidPrices[] }

    const addMarketPosts = (name, title, content, price, img) => {
        setAllPosts([...allPosts, makePost(name, title, content, price, img)])
    }

    const addBidPrices = (title, content, rPrice, img, bPrice, whoBids) => { // we give unique titles for post!
        const newAllPosts = allPosts.map((e) => {
            if (e.postTitle === title) { 
                const theBid = { whoBids: whoBids, bPrice: bPrice }
                const newBidPrice = [...e.bidPrices, theBid]
                
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

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, myName);
        }
    }, [signedIn])

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
