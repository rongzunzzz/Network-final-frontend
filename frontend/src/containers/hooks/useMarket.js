import { createContext, useContext, useEffect, useState } from "react";

const MarketContext = createContext({
    signedIn: false,
    allPosts: [],
})

const MarketProvider = (props) => {
    const [signedIn, setSignedIn] = useState(false);
    const [allPosts, setAllPosts] = useState([]);

    return (
        <MarketContext.Provider
            value={{
                signedIn, setSignedIn, 
                allPosts,
            }}
            {...props}
        />
    );
};

const useMarket = () => useContext(MarketContext);

export { MarketProvider, useMarket};
