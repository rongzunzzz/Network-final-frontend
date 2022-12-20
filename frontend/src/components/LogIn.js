import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";


const LogIn = ({ myName, setMyName, onLogin }) => { 
    return (
    <Input.Search
        size="large"
        style={{ width: '60%', margin: 50, marginTop: 10 }}
        prefix={<UserOutlined />}
        placeholder="Enter your name"
        value={myName} 
        onChange={(e) => setMyName(e.target.value)}
        enterButton="Sign In"
        onSearch={(name) => onLogin(name)}
    /> );
}

export default LogIn;