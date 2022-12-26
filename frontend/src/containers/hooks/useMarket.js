import { createContext, useContext, useEffect, useState } from "react";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const MarketContext = createContext({
    myName: "",
    myProfile: {},
    signedIn: false,
    allPosts: [],

    setMyName: () => { },
    setMyProfile: () => { },
    setSignedIn: () => { },
    setAllPosts: () => { },

    addMarketPosts: () => { },
    addBidPrices: () => { },
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
    const [myProfile, setMyProfile] = useState({ phoneNum: "0800092000", 
                                                 account: "NTUIM",
                                                 password: "0000",
                                                 role: "normal" }); 
    const [signedIn, setSignedIn] = useState(false);
    const [allPosts, setAllPosts] = useState([]); // { seller, title, content, price, img, bidPrices[] }

    const addMarketPosts = (name, title, content, price, img) => {
        const newPost = makePost(name, title, content, price, img)
        setAllPosts([...allPosts, newPost])
    }

    const addBidPrices = (title, content, rPrice, img, bPrice, whoBids) => { // we give unique titles for post!
        console.log(allPosts)
        const newAllPosts = allPosts.map((e) => {
            console.log(e)
            if (e.postTitle === title) {
                // const theBid = { whoBids: whoBids, bPrice: bPrice }
                console.log(`bid for ${title}`)
                // console.log(theBid)
                // console.log(typeof(e.bidPrices)) // undefined?
                // const newBidPrice = [...e.bidPrices, theBid]

                return {
                    postTitle: title,
                    postContent: content,
                    recommendedPrice: rPrice,
                    postImg: img,
                    // bidPrices: newBidPrice
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
                myProfile, setMyProfile,
                signedIn, setSignedIn,
                allPosts, setAllPosts, addMarketPosts,
                addBidPrices,
            }}
            {...props}
        />
    );
};

const useMarket = () => useContext(MarketContext);

export { MarketProvider, useMarket };
