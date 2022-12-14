import { createContext, useContext, useEffect, useState } from "react";

const MarketContext = createContext({
    signedIn: false,
})

const MarketProvider = (props) => {
    const [signedIn, setSignedIn] = useState(false);

    return (
        <MarketContext.Provider
            value={{
                signedIn, setSignedIn,
            }}
            {...props}
        />
    );
};

const useMarket = () => useContext(MarketContext);

export { MarketProvider, useMarket};
