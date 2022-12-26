import styled from "styled-components";

import LogIn from "../components/LogIn";
import axios from '../api';

import { useMarket } from "./hooks/useMarket";

const Logo = styled.img`
    height: 50%;
    width: 60%;
    border-radius: 3%;
    margin-top: 200px;
`;

const SignIn = ({ myName }) => {

    const { setMyName, setMyProfile, setSignedIn, setAllPosts } = useMarket();

    // 去看看這個名字有沒有存在在 DB USER table，有就拿到資料登入，沒就新增完在登入
    const getMyProfile = async (myName) => { 
        const {
            data: { profile } // { account, phoneNum, password, role }
        } = await axios.get('/profile/', {
            myName, 
        })
        setMyProfile(profile);
    }

    const getAllPosts = async () => {
        const {
            data: { posts } // an array of { seller, title, content, price, img, bidPrices[] }
        } = await axios.get('/posts/', {

        })
        setAllPosts(posts);
    }

    const handleLogin = (name) => {
        if (name) {
            axios.get('/').then((data) => console.log(data))

            getMyProfile(name);
            getAllPosts();
            setSignedIn(true);
        }
    }

    return (
        <>
            <Logo src={require('../img/logo.jpg')}  />
            <LogIn myName={myName} setMyName={setMyName} onLogin={handleLogin} />
        </>
    )
};

export default SignIn;
