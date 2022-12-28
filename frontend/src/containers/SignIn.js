import styled from "styled-components";

import LogIn from "../components/LogIn";
import RegisterModal from "../components/RegisterModal";
import axios from '../api';

import { useMarket } from "./hooks/useMarket";
import { useState } from "react";

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

    const handleRegister = async (account, name, phoneNum, password) => {
        const {
            data: { message }
        } = await axios.post('/profile/register', {
            account, 
            name, 
            phoneNum, 
            password,
        })
        popSuccessMsg("Register");
    }

    return (
        <>
            <Logo src={require('../img/logo.jpg')}  />
            <LogIn myName={myName} setMyName={setMyName} onLogin={handleLogin} />
            <RegisterModal
                open={registerModalOpen}
                onCreate={(account, name, phoneNum, password) => { 
                    handleRegister(account, name, phoneNum, password);
                    setRegisterModalOpen(false);
                }}
                onCancel={() => {
                    setRegisterModalOpen(false);
                }} >
            </RegisterModal>
        </>
    )
};

export default SignIn;
