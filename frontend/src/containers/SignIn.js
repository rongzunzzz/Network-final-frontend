import styled from "styled-components";

import LogIn from "../components/LogIn";
import RegisterModal from "../components/RegisterModal";
import axios from '../api';
import { Modal, Button } from "antd";
import { useMarket } from "./hooks/useMarket";
import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provide } from "../config/firebase.js";

const StyledButton = styled(Button)`
    height: 60px;
    width: 150px;
    font-size: 15px; font-weight: bold;
    margin: 15px;
`;

const Logo = styled.img`
    height: 50%;
    width: 60%;
    border-radius: 3%;
    margin-top: 200px;
`;

const SignIn = ({ myName }) => {

    const { setMyName, setMyProfile, setSignedIn, setAllPosts, popSuccessMsg } = useMarket();
    const [registerModalOpen, setRegisterModalOpen] = useState(false);

    // 去看看這個名字有沒有存在在 DB USER table，有就拿到資料登入，沒就新增完在登入
    const getMyProfile = async (myName) => { 
        const {
            data: {
                profile, // { account, phone_num, password, role }
                message, // 'success', 'fail'
            }
        } = await axios.get(`/profile/${myName}`, {
            myName, 
        })
        setMyProfile(profile);

        // const message = 'success'
        switch (message) {
            case 'success':
                setSignedIn(true);
                popSuccessMsg("Log in");
                break;
            case 'fail':
                setSignedIn(false);
                setRegisterModalOpen(true);
                break;
            default: break;
        }
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
        }
    }

    const handleRegister = async (phoneNum) => {
        const {
            data: { message }
        } = await axios.post('/profile/register', {
            account: auth.currentUser.displayName,
            name : auth.currentUser.displayName,
            phoneNum, 
            password: "google",
        })
        popSuccessMsg("Register");
        console.log(auth.currentUser.displayName);
        console.log(phoneNum)
        handleLogin(auth.currentUser.displayName);
    }

    const handleLoginGoogle = async () => {
        const provider = provide;
        const Auth = auth
        signInWithPopup(Auth, provider)
        .then(async result => {
            const user = result.user;
            console.log(user);
            console.log(user.displayName)
            setMyName(user.displayName)
            handleLogin(user.displayName)
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <Logo src={require('../img/logo.jpg')}  />
            {/* <LogIn myName={myName} setMyName={setMyName} onLogin={handleLogin} /> */}
            <RegisterModal
                open={registerModalOpen}
                onCreate={(phoneNum) => { 
                    handleRegister(phoneNum);
                    setRegisterModalOpen(false);
                }}
                onCancel={() => {
                    setRegisterModalOpen(false);
                }} >
            </RegisterModal>
            <StyledButton onClick={handleLoginGoogle}>使用Google登入</StyledButton>
        </>
    )
};

export default SignIn;
