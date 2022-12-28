import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";

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
    popSuccessMsg: () => { },
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

    const popSuccessMsg = (action) => {
        const msgContent = {
            content: `${action} successfully!`, 
            duration: 1.5
        }
        message.success(msgContent)
    }

    const addMarketPosts = (name, title, content, price, img) => {
        const newPost = makePost(name, title, content, price, img)
        setAllPosts([...allPosts, newPost])
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
                popSuccessMsg,
            }}
            {...props}
        />
    );
};

const useMarket = () => useContext(MarketContext);

export { MarketProvider, useMarket };
